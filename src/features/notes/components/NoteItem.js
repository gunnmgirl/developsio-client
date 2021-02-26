import React from "react";
import styled from "styled-components";
import format from "date-fns/format";
import { FileText } from "react-feather";
import { useSelector } from "react-redux";

import AddNoteModal from "./AddNoteModal";

const MainContainer = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.secondaryLight};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0.4rem 0.4rem;
  cursor: pointer;
`;

const StyledSpan = styled.span`
  color: ${(props) => props.theme.secondaryText};
`;

const Wrapper = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const StyledIcon = styled.div`
  color: ${(props) => props.theme.secondary};
  margin-right: 0.6rem;
`;

const StyledName = styled.span`
  margin-top: 1rem;
  color: ${(props) => props.theme.secondary};
`;

const NoteItem = (props) => {
  const { note } = props;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const newDate = new Date(note.updatedAt);
  const formatedDate = format(newDate, "MMMM dd, yyyy");
  const myId = useSelector((state) => state.auth.me.id);

  const initialValues = {
    title: note.title,
    body: note.body,
    isPrivate: note.isPrivate,
  };

  return (
    <MainContainer>
      <Container onClick={() => setIsModalOpen(!isModalOpen)}>
        <StyledSpan>{formatedDate}</StyledSpan>
        <Wrapper>
          <StyledIcon>
            <FileText />
          </StyledIcon>
          <p>
            {note && note.title && note.title.substring(0, 50)}
            {note && note.title && note.title.length > 50 && `...`}
          </p>
        </Wrapper>
        <StyledSpan>
          {note && note.body && note.body.substring(0, 100)}
          {note && note.body && note.body.length > 50 && `...`}
        </StyledSpan>
        <StyledName>{`${note?.person?.firstName} ${note?.person?.lastName}`}</StyledName>
      </Container>
      <AddNoteModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        initialValues={initialValues}
        isEdit={true}
        noteId={note.id}
        noteCreator={note.personId}
        activeButtonText="Edit Note"
        cancelButtonText={note?.personId === myId ? "Delete Note" : "Close"}
        myId={myId}
      />
    </MainContainer>
  );
};

export default NoteItem;
