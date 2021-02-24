import React from "react";
import styled from "styled-components";
import { Modal } from "@malcodeman/react-modal";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { X } from "react-feather";

import { addNote, editNote, deleteNote } from "../actions/notesActions";
import FormControl from "../../../components/FormControl";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";

const WrapperRadio = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.modalPrimary};
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
  display: flex;
  flex-direction: column;
  min-height: 20rem;
  width: 25rem;
  background-color: ${(props) => props.theme.modalPrimary};
  color: ${(props) => props.theme.onPrimary};
  border-radius: 8px;
  padding: 1rem 1rem;
`;

const WrapperButtons = styled(WrapperRadio)`
  justify-content: flex-end;
`;

const StyledActiveButton = styled(StyledButton)`
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.primary};
  margin-left: 0.4rem;
`;

const StyledForm = styled.div``;

const StyledInput = styled(Input)`
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.onPrimary};
  border-radius: 0;
  background-color: ${(props) => props.theme.modalPrimary};
  width: auto;
  margin: 0;
  padding-left: 0.6rem;
`;

const StyledTextarea = styled(Textarea)`
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  height: 8rem;
  background-color: ${(props) => props.theme.secondaryLight};
  color: ${(props) => props.theme.onPrimary};
  margin-bottom: 1rem;
  font-family: "Roboto", sans-serif;
  padding: 0.4rem 0.4rem;
  margin: 1rem 0;
`;

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required!"),
});

const StyledX = styled(X)`
  align-self: flex-end;
  color: ${(props) => props.theme.secondaryText};
  size: 1rem;
  cursor: pointer;
`;

const AddNoteModal = ({
  isOpen,
  setIsOpen,
  initialValues,
  isEdit = false,
  noteId,
  noteCreator,
  activeButtonText = "Add Note",
  cancelButtonText = "Cancle",
  myId,
}) => {
  const emptyState = { isPrivate: 0, title: "" };
  const dispatch = useDispatch();
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
      <ModalMainContainer data-cy="add-new-note-main-container">
        <StyledX
          onClick={() => {
            setIsOpen(false);
            formik.resetForm(emptyState);
          }}
        />
        <StyledForm onSubmit={formik.handleSubmit}>
          <FormControl
            label="Title"
            caption={formik.touched.title && formik.errors.title}
          >
            <StyledInput
              data-cy="add-new-note-title-input"
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
              data-cy="add-new-note-body-input"
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
                if (isEdit && myId === noteCreator) {
                  dispatch(deleteNote({ noteId }));
                }
                setIsOpen(false);
                formik.resetForm(emptyState);
              }}
            >
              {cancelButtonText}
            </StyledButton>
            {!disabled && (
              <StyledActiveButton
                data-cy="add-new-note-button"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
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
