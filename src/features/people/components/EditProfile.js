import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { getMe, editProfile } from "../actions/peopleActions";
import noImage from "../../../images/noImage.png";
import Spinner from "../../components/Spinner";
import Input from "../../../components/Input";
import FormControl from "../../../components/FormControl";
import Button from "../../../components/Button";

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

const ProfileImage = styled.div`
  height: ${(props) => (props.imageUrl ? "20rem" : "12rem")};
  width: ${(props) => (props.imageUrl ? "16rem" : "12rem")};
  background: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : `url(${props.noImage})`};
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.theme.primary};
  border-radius: ${(props) => (props.imageUrl ? "16px" : 0)};
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

const StyledEmailInput = styled(StyledInput)`
  color: ${(props) => props.theme.secondaryText};
`;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required!"),
  lastName: Yup.string().required("Last name is required!"),
});

const EditProfile = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.people.me);
  const loading = useSelector((state) => state.people.loading);
  const { personId } = useParams();

  const initialValues = {
    firstName: me?.firstName || "",
    lastName: me?.lastName || "",
    email: me?.email || "",
    imageFile: null,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: (values, { resetForm }) => {
      if (
        parseInt(personId) !== me.id ||
        values.email !== initialValues.email
      ) {
        return;
      }
      const formData = new FormData();
      formData.append("file", values.imageFile);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      dispatch(editProfile({ formData, personId: me.id }));
      resetForm({});
    },
    validationSchema,
  });

  const handleOnImageUploadChange = async (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("imageFile", file);
  };

  React.useEffect(() => {
    dispatch(getMe({ personId }));
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MainContainer>
          <ProfileImage
            noImage={noImage}
            imageUrl={me?.imageUrl}
          ></ProfileImage>
          <StyledForm onSubmit={formik.handleSubmit}>
            <FormControl
              label="First Name"
              caption={formik.touched.firstName && formik.errors.firstName}
            >
              <StyledInput
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
            </FormControl>
            <FormControl
              label="Last Name"
              caption={formik.touched.lastName && formik.errors.lastName}
            >
              <StyledInput
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </FormControl>
            <FormControl
              label="Email"
              caption={formik.touched.email && formik.errors.email}
            >
              <StyledEmailInput
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                disabled
              />
            </FormControl>
            <FormControl label="Upload Profile Image">
              <StyledInput
                name="imageFile"
                type="file"
                onChange={handleOnImageUploadChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>
            <StyledButton
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              Edit Profile
            </StyledButton>
          </StyledForm>
        </MainContainer>
      )}
    </>
  );
};

export default EditProfile;
