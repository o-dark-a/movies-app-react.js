import React from "react";
import SignupFormClasses from './SignupPage.module.scss';
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputField from "../../components/UI/InputField/InputField";
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { setUserData } from "../../actions/moviesActions";

const errorText = {
  textField: 'Field must contain only letters of the English alphabet. Min number of characters - 2, max - 21.',
  usernameField: 'Username must start with a lowercase letter and consist only of letters, numbers or special characters (. or _).',
  requiredField: 'The field is required',
  confirmPassField: 'Passwords must match',
}

const schema = yup.object({
  firstName: yup.string()
    .required(errorText.requiredField)
    .matches(/^[A-Za-z]{2,21}$/i, { message: errorText.textField }),
  lastName: yup.string()
    .required(errorText.requiredField)
    .matches(/^[A-Za-z]{2,21}$/i, { message: errorText.textField }),
  userName: yup.string()
    .required(errorText.requiredField)
    .matches(/^[a-z]{1}[a-zA-Z0-9_.-]+$/, { message: errorText.usernameField }),
  birthsDate: yup.date().default(() => new Date()),
  sex: yup
    .mixed()
    .oneOf(['male', 'female', 'other'])
    .defined(),
  email: yup.string().nullable().email().required(),
  password: yup.string()
    .required('Password is mendatory')
    .min(3, 'Password must be at 3 char long'),
  confirmPwd: yup.string()
    .required('Password is mendatory')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
}).required();

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    dispatch(setUserData(data))
    navigate('/login');
  };

  return (
    <Container maxWidth="sm">
      <form className={SignupFormClasses.signupForm} onSubmit={handleSubmit(onSubmit)}>
        <Typography style={{ textAlign: 'center' }} variant="h6" gutterBottom>Come on, sign up!</Typography>
        <FormControl className={SignupFormClasses.formControl}>
          <InputField label='First Name' type='text' {...register("firstName")} />
          <p className="error-msg">{errors.firstName?.message}</p>
          <InputField label='Last Name' type='text' {...register("lastName")} />
          <p className="error-msg">{errors.lastName?.message}</p>
          <InputField label='User Name' type='text' {...register("userName")} />
          <p className="error-msg">{errors.userName?.message}</p>
          <FormLabel className={SignupFormClasses.birthDateLabel} htmlFor="birth-date">Date of Birth</FormLabel>
          <InputField id='birth-date' type='date' {...register("birthsDate")} />
          <p className="error-msg">{errors.birthsDate?.message}</p>
        </FormControl>

        <FormControl className={`${SignupFormClasses.formControl}, ${SignupFormClasses.formControlGender}`}>
          <FormLabel className={SignupFormClasses.genderLabel}>Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="female"
          >
            <FormControlLabel {...register("sex")} value="female" control={<Radio />} label="Female" />
            <FormControlLabel {...register("sex")} value="male" control={<Radio />} label="Male" />
            <FormControlLabel {...register("sex")} value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <InputField label='Email' type='email' {...register("email", { required: true })} />
          <p className="error-msg">{errors.email?.message}</p>
        </FormControl>

        <FormControl className={SignupFormClasses.formControl}>
          <InputField label='password' type='password' {...register("password")} />
          <p className="error-msg">{errors.password?.message}</p>
          <InputField
            label='Confirm Password'
            name="confirmPwd"
            type="password"
            {...register('confirmPwd')}
          />
          <p className="error-msg">{errors.confirmPwd?.message}</p>
        </FormControl>

        <Stack spacing={2} direction="column">
          <Button type="submit" variant="contained">Sign Up</Button>
          <p style={{ textAlign: 'center' }}>If you have registered before, just log in to your account</p>
          <Button type="button" variant="outlined">
            <Link className={SignupFormClasses.loginLink} to="/login">Log in</Link>
          </Button>
        </Stack>

      </form>
    </Container>

  )
}

export default SignupPage;