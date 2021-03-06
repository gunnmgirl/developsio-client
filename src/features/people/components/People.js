import React from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";
import styled from "styled-components";
import { Popover } from "@malcodeman/react-popover";
import { Modal } from "@malcodeman/react-modal";
import { ChevronDown, AlignCenter, MoreHorizontal, User } from "react-feather";

import {
  getApplicants,
  deleteApplicant,
  restoreApplicant,
  getApplicantsSuccess,
} from "../actions/peopleActions";
import { getPositions } from "../../positions/actions/positionsActions";
import { getStatuses } from "../../statuses/actions/statusesActions";
import Table from "./Table";
import Button from "../../../components/Button";
import history from "../../../routing/history";

const ButtonWrapper = styled.div`
  display: flex;
  align-self: flex-end;
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.modalPrimary};
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
  color: ${(props) => props.theme.onPrimary};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 999px;
`;

const UserIcon = styled(User)`
  height: 2.6rem;
  width: 2.6rem;
  stroke-width: 1;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.modalPrimary};
  color: ${(props) => props.theme.onPrimary};
  border: 1px solid ${(props) => props.theme.border};
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
  z-index: 1;
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
  background-color: ${(props) => props.theme.modalPrimary};
  color: ${(props) => props.theme.onPrimary};
  border-radius: 8px;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const sortBy = [
  { name: "Latest", value: "DESC" },
  { name: "Oldest", value: "ASC" },
];

const People = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.people);
  const totalCount = useSelector((state) => state.people.totalCount);
  const positions = useSelector((state) => state.positions.positions);
  const statuses = useSelector((state) => state.statuses.statuses);
  const [page, setPage] = React.useState(0);
  const [isReset, setIsReset] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isStatusesOpen, setIsStatusesOpen] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const [order, setOrder] = React.useState(sortBy[0]);
  const [status, setStatus] = React.useState(null);
  const [filter, setFilter] = React.useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "imageUrl",
        width: 40,
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
        Header: "Status",
        accessor: "status",
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
                  <PopoverMainContainer data-cy="people-popover-main-container">
                    <PopoverItem
                      data-cy="people-popover-item-view"
                      onClick={() => history.push(`/people/${props.value}`)}
                    >
                      View
                    </PopoverItem>
                    {props.row.values.status === "Deleted" ? (
                      <PopoverItem
                        onClick={() => {
                          setIsMoreOpen(false);
                          dispatch(restoreApplicant({ personId: props.value }));
                        }}
                      >
                        Restore
                      </PopoverItem>
                    ) : (
                      <PopoverItem
                        onClick={() => {
                          setIsModalOpen(!isModalOpen);
                          setIsMoreOpen(false);
                        }}
                      >
                        Delete
                      </PopoverItem>
                    )}
                  </PopoverMainContainer>
                )}
              >
                <MoreHorizontal
                  data-cy="peope-more-horizontal-icon"
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
                  <StyledP>{`Are you sure you want to delete applicant ${props.row.values.name}?`}</StyledP>
                  <ButtonWrapper>
                    <StyledButton onClick={() => setIsModalOpen(false)}>
                      Cancel
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
        imageUrl: person.person.imageUrl ? (
          <ProfileImage imageUrl={person.person.imageUrl}></ProfileImage>
        ) : (
          <UserIcon />
        ),
        name: `${person.person.firstName} ${person.person.lastName}`,
        number: person.phoneNumber,
        position: person.position.name,
        date: formatedDate,
        status: person.status.name,
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
    const newPositions = [{ name: "All Positions" }, ...positions];

    return (
      <PopoverMainContainer>
        {newPositions
          ? newPositions.map((position) => (
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

  const getStatusesPopoverContent = () => {
    const newStatuses = [{ name: "All Statuses" }, ...statuses];
    return (
      <PopoverMainContainer>
        {newStatuses
          ? newStatuses.map((status) => (
              <PopoverItem
                onClick={() => {
                  setIsReset(true);
                  if (status.name === `All Statuses`) {
                    setStatus(null);
                  } else {
                    setStatus(status);
                  }
                  setIsStatusesOpen(false);
                }}
              >
                {status.name}
              </PopoverItem>
            ))
          : null}
      </PopoverMainContainer>
    );
  };

  React.useEffect(() => {
    dispatch(
      getApplicants({
        page,
        order: order.value,
        filter,
        statusId: status?.id || null,
      })
    );
    return () => {
      dispatch(getApplicantsSuccess({ applicants: [], count: 0 }));
    };
  }, [page, order, filter, status]);

  return (
    <MainContainer data-cy="people-main-container">
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
            isOpen={isStatusesOpen}
            content={getStatusesPopoverContent}
            onClickOutside={() => setIsStatusesOpen(false)}
          >
            <StyledFilter
              onClick={() => {
                if (!status || !status.length) {
                  dispatch(getStatuses());
                }
                setIsStatusesOpen(!isStatusesOpen);
              }}
            >
              <StyledAlignCenter />
              <span>{!status ? `All Statuses` : `${status.name}`}</span>
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
