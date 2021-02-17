import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import hash from "object-hash";

import { changePassword } from "../actions/peopleActions";
import Spinner from "../../components/Spinner";
import Input from "../../../components/Input";
import FormControl from "../../../components/FormControl";
import Button from "../../../components/Button";
import padlock from "../../../images/padlock.png";

const MainContainer = styled.div`
  display: flex;
  padding: 3rem 6rem;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.primary};
  border: 1.5px solid ${(props) => props.theme.secondary};
  border-radius: 6px;
  height: 1.6rem;
  padding: 0.2rem 0.6rem;
`;

const Image = styled.div`
  height: 12rem;
  width: 12rem;
  background: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.theme.primary};
  margin-right: 6rem;
`;

const StyledForm = styled.div`
  width: 20rem;
`;

const StyledInput = styled(Input)`
  border: 0;
  border: 1px solid ${(props) => props.theme.onPrimary};
  border-radius: 6px;
  background-color: ${(props) => props.theme.primary};
  width: auto;
  margin: 0;
  padding-left: 0.6rem;
`;

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required!"),
  newPassword: Yup.string().required("New password is required!"),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.people.loading);
  const { personId } = useParams();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { resetForm }) => {
      const newPassword = hash(values.newPassword);
      const currentPassword = hash(values.currentPassword);
      const newValues = { newPassword, currentPassword };
      dispatch(changePassword({ personId, newValues }, { formik, resetForm }));
    },
    validationSchema,
  });

  return (
    <MainContainer>
      <Image image={padlock}></Image>
      <StyledForm onSubmit={formik.handleSubmit}>
        <FormControl
          label="Current Password"
          caption={
            formik.touched.currentPassword && formik.errors.currentPassword
          }
        >
          <StyledInput
            name="currentPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentPassword}
          />
        </FormControl>
        <FormControl
          label="New Password"
          caption={formik.touched.newPassword && formik.errors.newPassword}
        >
          <StyledInput
            name="newPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          />
        </FormControl>
        {loading ? (
          <Spinner />
        ) : (
          <StyledButton
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Change Password
          </StyledButton>
        )}
      </StyledForm>
    </MainContainer>
  );
};

export default ChangePassword;
