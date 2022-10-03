import React from "react";
import LanguagesClasses from './Languages.module.scss';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Languages({ languages }) {
  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>Languages</Typography>
      <ul className={LanguagesClasses.ul}>
        {languages.map((language, i) => (
          <li key={i}>
            <Stack spacing={2} direction="row">
              <Button variant="outlined">{language.english_name}</Button>
            </Stack>
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default Languages;