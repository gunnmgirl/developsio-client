import React from "react";
import styled from "styled-components";
import { Modal } from "@malcodeman/react-modal";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { X } from "react-feather";

import { addPosition, editPosition } from "../actions/positionsActions";
import FormControl from "../../../components/FormControl";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";

const ModalMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 20rem;
  width: 25rem;
  background-color: ${(props) => props.theme.secondaryLight};
  color: ${(props) => props.theme.onPrimary};
  border-radius: 8px;
  padding: 1rem 1rem;
`;

const StyledActiveButton = styled(Button)`
  border: 1.5px solid ${(props) => props.theme.secondary};
  border-radius: 6px;
  height: 1.6rem;
  padding: 0.2rem 0.6rem;
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.primary};
`;

const StyledForm = styled.div``;

const StyledInput = styled(Input)`
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.onPrimary};
  border-radius: 0;
  background-color: ${(props) => props.theme.secondaryLight};
  width: auto;
  margin: 0;
  padding-left: 0.6rem;
`;

const StyledTextarea = styled(Textarea)`
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  height: 8rem;
  background-color: ${(props) => props.theme.ternary};
  color: ${(props) => props.theme.onPrimary};
  margin-bottom: 1rem;
  font-family: "Roboto", sans-serif;
  padding: 0.4rem 0.4rem;
  margin: 1rem 0;
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
});

const StyledX = styled(X)`
  align-self: flex-end;
  color: ${(props) => props.theme.secondaryText};
  size: 1rem;
  cursor: pointer;
`;

const AddPositionModal = ({
  isOpen,
  setIsOpen,
  name = "",
  details = "",
  positionId = 0,
  actionButtonText = "Add Position",
}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: name,
      details: details,
    },
    onSubmit: (values, { resetForm }) => {
      if (positionId) {
        dispatch(editPosition({ values, positionId }));
      } else {
        dispatch(addPosition(values));
      }
      resetForm({});
      setIsOpen(false);
    },
    validationSchema,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        formik.resetForm({});
      }}
    >
      <ModalMainContainer>
        <StyledX
          onClick={() => {
            setIsOpen(false);
            formik.resetForm({});
          }}
        />
        <StyledForm onSubmit={formik.handleSubmit}>
          <FormControl
            label="Name"
            caption={formik.touched.name && formik.errors.name}
          >
            <StyledInput
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </FormControl>
          <FormControl label="Details">
            <StyledTextarea
              name="details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              resize="0"
              placeholder="Write Job Position Details Here"
              value={formik.values.details}
            />
          </FormControl>
          <StyledActiveButton
            onClick={() => {
              formik.handleSubmit();
            }}
            shouldFitContainer
          >
            {actionButtonText}
          </StyledActiveButton>
        </StyledForm>
      </ModalMainContainer>
    </Modal>
  );
};

export default AddPositionModal;
