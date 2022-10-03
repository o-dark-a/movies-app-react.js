import React, { useState } from "react";
import loginPageClasses from './LoginPage.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputField from "../../components/UI/InputField/InputField";
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { userLogin } from "../../actions/moviesActions";

function LoginPage() {
  const { userData } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginErr, setLoginErr] = useState('');

  const schema = yup.object().shape({
    userName: yup.string().required('The field is required').matches(userData.userName ? userData.userName : null, 'This user was not found'),
    password: yup.string().required('The field is required').matches(userData.password ? userData.password : null, 'Invalid password')
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    if (userData.userName === data.userName && userData.password === data.password) {
      dispatch(userLogin());
      navigate('/');
    } else if (userData.userName !== data.userName) {
      return setLoginErr('This user was not found');
    } else {
      return setLoginErr('Invalid password');
    }
  };

  return (
    <Container maxWidth="sm">
      <form className={loginPageClasses.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <Typography style={{ textAlign: 'center'}} variant="h6" gutterBottom>Come on, login!</Typography>
        <FormControl className={loginPageClasses.formControl}>
          <InputField label='User Name' type='text' {...register("userName")} defaultValue={userData.userName} />
          <p className="error-msg">{errors.userName?.message}</p>
          <InputField label='password' type='password' {...register("password")} defaultValue={userData.password} />
          <p className="error-msg">{errors.password?.message}</p>
        </FormControl>
        <p className="error-msg">{loginErr}</p>
        <Stack spacing={2} direction="column">
          <Button type="submit" variant="contained">Log In</Button>
          <p style={{ textAlign: 'center' }}>If you have not registered before, do it now</p>
          <Button type="button" variant="outlined">
            <Link className={loginPageClasses.signupLink} to="/signup">Sign Up</Link>
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default LoginPage;