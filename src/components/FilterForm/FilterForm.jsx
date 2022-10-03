import React, { useEffect, useCallback, useState } from "react";
import Box from '@mui/material/Box';
import filtersClasses from './FilterForm.module.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchMovies } from "../../thunk/movies";
import { setOptions } from "../../actions/moviesActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, fetchLanguages, fetchFiltredMovies } from "../../thunk/movies";

function FilterForm() {
  const { allGenres, allLanguages, currentPage, filterOptions } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');

  const handleChangeGenre = (event) => {
    setGenre(event.target.value);
  };

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleResetFilters = () => {
    setLanguage('');
    setGenre('');
    dispatch(setOptions({
      query: '',
      language: '',
      with_genres: ''
    }));
    dispatch(fetchMovies(currentPage))
  };

  const handleFilterChange = useCallback((e) => {
    const { dataset: { value }, _value, attributes: { dataoptiontype: { value: option } } } = e.target;

    switch (option) {
      case 'with_genres':
      case 'language':
        dispatch(setOptions({ [option]: value }));
        break;
      default:
        dispatch(setOptions({ [option]: _value }));
    }

  }, [filterOptions]);

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchLanguages());
  }, []);

  useEffect(() => {
    if (!(filterOptions.query === '' && filterOptions.language === '' && filterOptions.with_genres === '')) {
      dispatch(fetchFiltredMovies(filterOptions, currentPage));
    }
  }, [filterOptions]);

  return (
    <div className={filtersClasses.filterWrap}>
      <Typography variant="subtitle2" sx={{ marginRight: '15px' }}>
        Sorting by
      </Typography>
      <Box sx={{ minWidth: 150, marginRight: '5px' }}>
        <FormControl fullWidth>
          <InputLabel id="genres-select-label">Genres</InputLabel>
          <Select
            labelId="genres-select-label"
            value={genre}
            label="Genre"
            onChange={handleChangeGenre}
          >
            {allGenres.map((genre, i) => (
              <MenuItem dataoptiontype='with_genres' onClick={handleFilterChange} type="button" value={genre.id} key={i}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="language-select-label">Languages</InputLabel>
          <Select
            labelId="language-select-label"
            value={language}
            label="language"
            onChange={handleChangeLanguage}
          >
            {allLanguages.map((language, i) => (
              <MenuItem dataoptiontype='language' onClick={handleFilterChange} type="button" value={language.iso_639_1} key={i}>
                {language.english_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <IconButton onClick={handleResetFilters} aria-label="delete" color="error" size="small">
        <DeleteIcon /> reset filters
      </IconButton>
    </div>
  )
}

export default FilterForm;
