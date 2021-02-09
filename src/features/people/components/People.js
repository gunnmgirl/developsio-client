import React from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";
import styled from "styled-components";
import { Popover } from "@malcodeman/react-popover";
import { Modal } from "@malcodeman/react-modal";
import { ChevronDown, AlignCenter, MoreHorizontal } from "react-feather";

import { getApplicants, deleteApplicant } from "../actions/peopleActions";
import { getPositions } from "../../positions/actions/positionsActions";
import Table from "./Table";
import Button from "../../../components/Button";
import history from "../../../routing/history";

const ButtonWrapper = styled.div`
  display: flex;
  align-self: flex-end;
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.secondary};
  border: 1.5px solid ${(props) => props.theme.secondary};
  border-radius: 6px;
  height: 1.6rem;
  padding: 0.2rem 0.6rem;
`;

const StyledActiveButton = styled(StyledButton)`
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.primary};
  margin-left: 0.4rem;
`;

const StyledP = styled.p`
  margin: 1rem 0;
`;

const MainContainer = styled.div`
  flex-grow: 1;
`;

const ProfileImage = styled.div`
  height: 2.6rem;
  width: 2.6rem;
  background: ${(props) =>
    props.imageUrl
      ? `url(${props.imageUrl})`
      : `url(https://res.cloudinary.com/hfgn9mp1b/image/upload/v1611752813/user_i07dfu.svg)`};
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.onPrimary};
  border-radius: 999px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem 3rem 0 3rem;
`;

const StyledTotalCount = styled.span`
  font-size: 1.4rem;
  color: ${(props) => props.theme.secondaryText};
  font-weight: 300;
`;

const StyledSort = styled.div`
  display: flex;
  align-items: center;
  margin: 0 2rem;
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

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAlignCenter = styled(AlignCenter)`
  size: 1rem;
  margin-right: 0.6rem;
`;

const StyledSpan = styled.span`
  color: ${(props) => props.theme.secondary};
  margin-right: 0.4rem;
`;

const StyledFilter = styled(StyledSort)`
  padding: 0.4rem 0.6rem;
  border: 2px solid ${(props) => props.theme.secondary};
  border-radius: 6px;
  color: ${(props) => props.theme.secondaryText};
  cursor: pointer;
`;

const ModalMainContainer = styled.div`
  min-height: 10rem;
  width: 20rem;
  background-color: ${(props) => props.theme.primary};
  border-radius: 8px;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const People = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.people);
  const totalCount = useSelector((state) => state.people.totalCount);
  const positions = useSelector((state) => state.positions.positions);
  const [page, setPage] = React.useState(0);
  const [isReset, setIsReset] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const sortBy = [
    { name: "Latest", value: "DESC" },
    { name: "Oldest", value: "ASC" },
  ];

  const [order, setOrder] = React.useState(sortBy[0]);
  const [filter, setFilter] = React.useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "imageUrl",
      },
      {
        Header: "Full Name",
        accessor: "name",
      },
      {
        Header: "Phone Number",
        accessor: "number",
      },
      {
        Header: "Job Position",
        accessor: "position",
      },
      {
        Header: "Date Created",
        accessor: "date",
      },
      {
        Header: "",
        accessor: "more",
        Cell: (props) => {
          const [isMoreOpen, setIsMoreOpen] = React.useState(false);
          const [isModalOpen, setIsModalOpen] = React.useState(false);

          return (
            <>
              <Popover
                isOpen={isMoreOpen}
                onClickOutside={() => setIsMoreOpen(false)}
                content={() => (
                  <PopoverMainContainer>
                    <PopoverItem
                      onClick={() => history.push(`/person/${props.value}`)}
                    >
                      View
                    </PopoverItem>
                    <PopoverItem
                      onClick={() => {
                        setIsModalOpen(!isModalOpen);
                        setIsMoreOpen(false);
                      }}
                    >
                      Delete
                    </PopoverItem>
                  </PopoverMainContainer>
                )}
              >
                <MoreHorizontal
                  onClick={() => {
                    setIsMoreOpen(!isMoreOpen);
                  }}
                  size="2rem"
                  cursor="pointer"
                />
              </Popover>
              <Modal
                isOpen={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                }}
              >
                <ModalMainContainer>
                  <StyledP>{`Are you sure you want to delete ${props.row.values.name}?`}</StyledP>
                  <ButtonWrapper>
                    <StyledButton onClick={() => setIsModalOpen(false)}>
                      Cancle
                    </StyledButton>
                    <StyledActiveButton
                      onClick={() => {
                        dispatch(deleteApplicant({ personId: props.value }));
                        setIsModalOpen(false);
                      }}
                    >
                      Delete
                    </StyledActiveButton>
                  </ButtonWrapper>
                </ModalMainContainer>
              </Modal>
            </>
          );
        },
        width: 20,
      },
    ],

    []
  );

  const data = React.useMemo(() => {
    return people.map((person) => {
      const newDate = new Date(person.createdAt);
      const formatedDate = format(newDate, "MMMM dd, yyyy");
      return {
        imageUrl: (
          <ProfileImage imageUrl={person.person.imageUrl}></ProfileImage>
        ),
        name: `${person.person.firstName} ${person.person.lastName}`,
        number: person.phoneNumber,
        position: person.position.name,
        date: formatedDate,
        more: person.person.id,
      };
    });
  });

  const handleSetPage = (newPage) => {
    setPage(newPage);
  };

  const getPopoverContent = () => {
    return (
      <PopoverMainContainer>
        <PopoverItem
          onClick={() => {
            setOrder(sortBy[0]);
            setIsOpen(false);
          }}
        >
          Latest
        </PopoverItem>
        <PopoverItem
          onClick={() => {
            setOrder(sortBy[1]);
            setIsOpen(false);
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
        {positions
          ? positions.map((position) => (
              <PopoverItem
                onClick={() => {
                  if (position.name === `All Positions`) {
                    setIsReset(true);
                    setFilter(null);
                  } else {
                    setIsReset(true);
                    setFilter(position.name);
                  }
                  setIsFilterOpen(false);
                }}
              >
                {position.name}
              </PopoverItem>
            ))
          : null}
      </PopoverMainContainer>
    );
  };

  React.useEffect(() => {
    dispatch(getApplicants({ page, order: order.value, filter }));
  }, [page, order, filter]);

  return (
    <MainContainer>
      <Wrapper>
        <StyledTotalCount>{`${totalCount} Total`}</StyledTotalCount>
        <Container>
          <Popover
            isOpen={isFilterOpen}
            content={getFilterPopoverContent}
            onClickOutside={() => setIsFilterOpen(false)}
          >
            <StyledFilter
              onClick={() => {
                if (!positions || !positions.length) {
                  dispatch(getPositions());
                }
                setIsFilterOpen(!isFilterOpen);
              }}
            >
              <StyledAlignCenter />
              <span>{!filter ? `All Positions` : `${filter}`}</span>
              <ChevronDown size="1rem" />
            </StyledFilter>
          </Popover>
          <Popover
            isOpen={isOpen}
            content={getPopoverContent}
            onClickOutside={() => setIsOpen(false)}
          >
            <StyledSort onClick={() => setIsOpen(!isOpen)}>
              <StyledSpan>{`Sort by: `}</StyledSpan>
              <span>{order.name}</span>
              <ChevronDown size="1rem" />
            </StyledSort>
          </Popover>
        </Container>
      </Wrapper>
      <Table
        data={data}
        columns={columns}
        handleSetPage={handleSetPage}
        totalCount={totalCount}
        isReset={isReset}
        setIsReset={setIsReset}
      />
    </MainContainer>
  );
};

export default People;
