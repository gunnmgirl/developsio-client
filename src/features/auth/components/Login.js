import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import hash from "object-hash";

import Logo from "../../components/Logo";
import FormControl from "../../../components/FormControl";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { login } from "../actions/authActions";
import LoginIcon from "../../../icons/LoginIcon";
import ToggleTheme from "../../components/ToggleTheme";
import Spinner from "../../components/Spinner";

const MainContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 0;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.onPrimary};
  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
`;

const StyledInput = styled(Input)`
  width: 20rem;
  background-color: ${(props) => props.theme.modalPrimary};
`;

const StyledP = styled.p`
  color: ${(props) =>
    props.secondary ? props.theme.secondary : props.theme.onPrimary};
  font-size: 1.2rem;
`;

const StyledForm = styled.form`
  margin-top: 5rem;
`;

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required!")
    .min(5, "Password must be min 5 characters long"),
  email: Yup.string()
    .required("Email is required!")
    .email("Must be a valid email!"),
});

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: (values) => {
      const hashedPassword = hash(values.password);
      dispatch(
        login({ email: values.email, password: hashedPassword }, { formik })
      );
    },
    validationSchema,
  });

  return (
    <MainContainer>
      <ColumnWrapper>
        <ToggleTheme />
        <Container>
          <Logo />
          <StyledP>Welcome back</StyledP>
          <StyledP secondary>Log in to your Developsio account</StyledP>
          <StyledForm onSubmit={formik.handleSubmit}>
            <FormControl
              label="Email address"
              caption={formik.touched.email && formik.errors.email}
            >
              <StyledInput
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>
            <FormControl
              label="Password"
              caption={formik.touched.password && formik.errors.password}
            >
              <StyledInput
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>
            {loading ? (
              <Spinner />
            ) : (
              <Button onClick={formik.handleSubmit} shouldFitContainer>
                Log in
              </Button>
            )}
          </StyledForm>
        </Container>
      </ColumnWrapper>
      <LoginIcon />
    </MainContainer>
  );
};

export default Login;
