import React from "react";
import styled from "styled-components";
import format from "date-fns/format";
import { FileText } from "react-feather";

const MainContainer = styled.div`
  border: 1px solid ${(props) => props.theme.onPrimary};
  border-radius: 8px;
  background-color: ${(props) => props.theme.secondaryLight};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.4rem 0.4rem;
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

const NoteItem = (props) => {
  const { note } = props;
  const newDate = new Date(note.createdAt);
  const formatedDate = format(newDate, "MMMM dd, yyyy");
  return (
    <MainContainer>
      <Container>
        <StyledSpan>{formatedDate}</StyledSpan>
        <Wrapper>
          <StyledIcon>
            <FileText />
          </StyledIcon>
          <p>
            {note.title.substring(0, 50)}
            {note.title.length > 50 && `...`}
          </p>
        </Wrapper>
        <StyledSpan>
          {note.body.substring(0, 100)} {note.title.length > 50 && `...`}
        </StyledSpan>
      </Container>
    </MainContainer>
  );
};

export default NoteItem;
