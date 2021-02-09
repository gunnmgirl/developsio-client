import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "@malcodeman/react-popover";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  PlusCircle,
  ChevronDown,
  AlignCenter,
} from "react-feather";

import { getNotes } from "../actions/notesActions";
import NoteItem from "./NoteItem";
import AddNoteModal from "./AddNoteModal";
import Spinner from "../../components/Spinner";

const MainContainer = styled.div`
  flex-grow: 1;
  padding: 2rem 6rem;
`;

const Container = styled.div`
  display: grid;
  height: 70%;
  padding: 1rem 0;
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
  cursor: pointer;
`;

const StyledPlusCircle = styled(PlusCircle)`
  color: ${(props) => props.theme.secondary};
  margin-right: 0.4rem;
`;

const StyledSpan = styled.span`
  color: ${(props) => props.theme.secondary};
  margin-right: 0.4rem;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
`;

const StyledSort = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const PopoverMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.ternary};
  border-radius: 8px;
  color: ${(props) => props.theme.onSecondary};
  padding: 1rem 0;
`;

const PopoverItem = styled.div`
  padding: 0.2rem 0.6rem;
  &:hover {
    background-color: ${(props) => props.theme.ternaryLight};
  }
  cursor: pointer;
`;

const StyledFilter = styled(StyledSort)`
  padding: 0.4rem 0.6rem;
  border: 2px solid ${(props) => props.theme.secondary};
  border-radius: 6px;
  color: ${(props) => props.theme.secondaryText};
  cursor: pointer;
`;

const StyledAlignCenter = styled(AlignCenter)`
  size: 1rem;
  margin-right: 0.6rem;
`;

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const limit = useSelector((state) => state.notes.limit);
  const totalCount = useSelector((state) => state.notes.totalCount);
  const loading = useSelector((state) => state.notes.loading);
  const [page, setPage] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const sortBy = [
    { name: "Latest", value: "DESC" },
    { name: "Oldest", value: "ASC" },
  ];

  const filterOptions = [
    { name: "All  Notes", value: null },
    { name: "My Notes", value: true },
  ];

  const [order, setOrder] = React.useState(sortBy[0]);
  const [filter, setFilter] = React.useState(filterOptions[0]);

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

  const getPopoverContent = () => {
    return (
      <PopoverMainContainer>
        <PopoverItem
          onClick={() => {
            setOrder(sortBy[0]);
            setIsPopoverOpen(false);
          }}
        >
          Latest
        </PopoverItem>
        <PopoverItem
          onClick={() => {
            setOrder(sortBy[1]);
            setIsPopoverOpen(false);
          }}
        >
          Oldest
        </PopoverItem>
      </PopoverMainContainer>
    );
  };

  const getFilterPopoverContent = () => {
    return (
      <PopoverMainContainer>
        {filterOptions.map((option) => (
          <PopoverItem
            onClick={() => {
              setPage(0);
              setFilter(option);
              setIsFilterOpen(false);
            }}
          >
            {option.name}
          </PopoverItem>
        ))}
      </PopoverMainContainer>
    );
  };

  React.useEffect(() => {
    dispatch(getNotes({ page, order: order.value, filter: filter.value }));
  }, [page, order.value, filter]);

  return (
    <MainContainer>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <RowContainer>
            <Wrapper onClick={() => setIsModalOpen(!isModalOpen)}>
              <StyledPlusCircle />
              <StyledSpan>Add New Note</StyledSpan>
            </Wrapper>
            <Popover
              isOpen={isFilterOpen}
              content={getFilterPopoverContent}
              onClickOutside={() => setIsFilterOpen(false)}
            >
              <StyledFilter onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <StyledAlignCenter />
                <span>{!filter ? `All Notes` : `${filter.name}`}</span>
                <ChevronDown size="1rem" />
              </StyledFilter>
            </Popover>
            <Popover
              isOpen={isPopoverOpen}
              content={getPopoverContent}
              onClickOutside={() => setIsPopoverOpen(false)}
            >
              <StyledSort onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                <StyledSpan>{`Sort by: `}</StyledSpan>
                <span>{order.name}</span>
                <ChevronDown size="1rem" />
              </StyledSort>
            </Popover>
          </RowContainer>
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
              disabled={!(page < Math.floor(totalCount / limit))}
            >
              <ArrowRightCircle />
            </IconWrapper>
          </Wrapper>
          <AddNoteModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
      )}
    </MainContainer>
  );
};

export default Notes;
