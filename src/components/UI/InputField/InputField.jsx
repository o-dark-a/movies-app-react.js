import React, { forwardRef } from "react";
import TextField from '@mui/material/TextField';

const InputField = forwardRef((props, ref) => (
  <TextField {...props} ref={ref} label={props.label} variant="outlined" />
))

export default InputField;