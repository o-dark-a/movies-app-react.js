import React from "react";
import InputField from "../../components/UI/InputField/InputField";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function Search() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Search by name</FormLabel>
      <InputField label='Enter movie title' type='text' {...register("Search")} />
    </FormControl>
  )
}

export default Search;