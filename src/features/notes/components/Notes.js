import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";

import { getNotes } from "../actions/notesActions";

import NoteItem from "./NoteItem";
import Spinner from "../../components/Spinner";

const MainContainer = styled.div`
  flex-grow: 1;
`;

const Container = styled.div`
  display: grid;
  height: 70%;
  padding: 1rem 6rem;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

const PageWrapper = styled.div`
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.primary};
  font-size: 1rem;
  border-radius: 999px;
  height: 1.6rem;
  width: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  color: ${(props) =>
    props.disabled ? props.theme.secondaryLight : props.theme.secondary};
  margin: 0.6rem 0.4rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const limit = useSelector((state) => state.notes.limit);
  const totalCount = useSelector((state) => state.notes.totalCount);
  const loading = useSelector((state) => state.notes.loading);
  const [page, setPage] = React.useState(0);

  const previousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < Math.floor(totalCount / limit)) {
      setPage(page + 1);
    }
  };

  React.useEffect(() => {
    dispatch(getNotes({ page }));
  }, [page]);

  return (
    <MainContainer>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Container>
            {notes.map((note) => (
              <NoteItem note={note} />
            ))}
          </Container>
          <Wrapper>
            <IconWrapper onClick={() => previousPage()} disabled={page < 1}>
              <ArrowLeftCircle />
            </IconWrapper>
            <PageWrapper>{`${page + 1}`}</PageWrapper>
            <IconWrapper
              onClick={() => nextPage()}
              disabled={page >= Math.floor(totalCount / limit)}
            >
              <ArrowRightCircle />
            </IconWrapper>
          </Wrapper>
        </>
      )}
    </MainContainer>
  );
};

export default Notes;
