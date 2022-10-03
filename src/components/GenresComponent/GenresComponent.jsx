import React from "react";
import GenresClasses from './Genres.module.scss';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function Genres({ genres }) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Genres</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="female"
      >
        <ul className={GenresClasses.ul}>
          {genres.map((genre, i) => (
            <li key={i}>
              <FormControlLabel {...register("genre")} value={genre} control={<Radio />} label={genre} />
            </li>
          ))}
        </ul>
      </RadioGroup>
    </FormControl>
  )
}

export default Genres;