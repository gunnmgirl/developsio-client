import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import hash from "object-hash";

import Logo from "../../components/Logo";
import FormControl from "../../../components/FormControl";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import image from "../../../images/loginBackground.png";
import { login } from "../actions/authActions";

const MainContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled(Input)`
  width: 20rem;
`;

const StyledP = styled.p`
  color: ${(props) =>
    props.secondary ? props.theme.secondary : props.theme.onPrimary};
  font-size: 1.2rem;
`;

const StyledForm = styled.form`
  margin-top: 5rem;
`;

const StyledImage = styled.div`
  background: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
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
          <Button onClick={formik.handleSubmit} shouldFitContainer>
            Log in
          </Button>
        </StyledForm>
      </Container>
      <StyledImage image={image}></StyledImage>
    </MainContainer>
  );
};

export default Login;
