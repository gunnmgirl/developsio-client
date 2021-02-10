import React from "react";
import styled from "styled-components";
import { Modal } from "@malcodeman/react-modal";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { addNote, editNote } from "../actions/notesActions";
import FormControl from "../../../components/FormControl";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";

const WrapperRadio = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.secondary};
  border: 1.5px solid ${(props) => props.theme.secondary};
  border-radius: 6px;
  height: 1.6rem;
  padding: 0.2rem 0.6rem;
`;

const StyledLabel = styled.label`
  margin: 0 0.4rem;
`;

const ModalMainContainer = styled.div`
  min-height: 20rem;
  width: 25rem;
  background-color: ${(props) => props.theme.primary};
  border-radius: 8px;
`;

const WrapperButtons = styled(WrapperRadio)`
  justify-content: flex-end;
`;

const StyledActiveButton = styled(StyledButton)`
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.primary};
  margin-left: 0.4rem;
`;

const StyledForm = styled.div`
  padding: 1rem 1rem;
`;

const StyledInput = styled(Input)`
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.onPrimary};
  border-radius: 0;
  background-color: ${(props) => props.theme.primary};
  width: auto;
  margin: 0;
  padding-left: 0.6rem;
`;

const StyledTextarea = styled(Textarea)`
  border: 1px solid ${(props) => props.theme.onPrimary};
  border-radius: 4px;
  height: 8rem;
  background-color: ${(props) => props.theme.secondaryLight};
  margin-bottom: 1rem;
  font-family: "Roboto", sans-serif;
  padding: 0.4rem 0.4rem;
  margin: 1rem 0;
`;

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required!"),
});

const AddNoteModal = ({
  isOpen,
  setIsOpen,
  initialValues,
  isEdit = false,
  noteId,
  noteCreator,
  activeButtonText = "Add Note",
  cancelButtonText = "Cancle",
}) => {
  const emptyState = { isPrivate: 0 };
  const dispatch = useDispatch();
  const myId = useSelector((state) => state.auth.me.id);
  const disabled = isEdit && myId !== noteCreator;
  const formik = useFormik({
    initialValues: initialValues || emptyState,
    onSubmit: (values, { resetForm }) => {
      if (isEdit && myId !== noteCreator) {
        return;
      }
      if (isEdit) {
        values.noteId = noteId;
        dispatch(editNote(values));
      } else {
        dispatch(addNote(values));
      }
      resetForm(emptyState);
      setIsOpen(false);
    },
    validationSchema,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        formik.resetForm(emptyState);
      }}
    >
      <ModalMainContainer>
        <StyledForm onSubmit={formik.handleSubmit}>
          <FormControl
            label="Title"
            caption={formik.touched.title && formik.errors.title}
          >
            <StyledInput
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              disabled={disabled}
            />
          </FormControl>
          <FormControl label="Note">
            <StyledTextarea
              name="body"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              resize="0"
              placeholder="Write Your Note Here"
              value={formik.values.body}
              disabled={disabled}
            />
          </FormControl>
          <WrapperRadio>
            <StyledInput
              type="radio"
              name="isPrivate"
              onChange={() => formik.setFieldValue("isPrivate", 1)}
              checked={formik.values.isPrivate}
              disabled={disabled}
            />
            <StyledLabel>Private</StyledLabel>
            <StyledInput
              type="radio"
              name="isPrivate"
              onChange={() => formik.setFieldValue("isPrivate", 0)}
              checked={!formik.values.isPrivate}
              disabled={disabled}
            />
            <StyledLabel>Shared</StyledLabel>
          </WrapperRadio>
          <WrapperButtons>
            <StyledButton
              onClick={() => {
                setIsOpen(false);
                formik.resetForm(emptyState);
              }}
            >
              {cancelButtonText}
            </StyledButton>
            {!disabled && (
              <StyledActiveButton onClick={() => formik.handleSubmit()}>
                {activeButtonText}
              </StyledActiveButton>
            )}
          </WrapperButtons>
        </StyledForm>
      </ModalMainContainer>
    </Modal>
  );
};

export default AddNoteModal;
