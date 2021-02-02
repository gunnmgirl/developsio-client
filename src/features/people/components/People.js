import React from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";
import styled from "styled-components";
import { Popover } from "@malcodeman/react-popover";

import { getApplicants } from "../actions/peopleActions";
import Table from "./Table";
import { ChevronDown } from "react-feather";

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

const StyledSpan = styled.span`
  color: ${(props) => props.theme.secondary};
  margin-right: 0.4rem;
`;

const People = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.people);
  const totalCount = useSelector((state) => state.people.totalCount);
  const [page, setPage] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const sortBy = [
    { name: "Oldest", value: "ASC" },
    { name: "Latest", value: "DESC" },
  ];

  const [order, setOrder] = React.useState(sortBy[0]);

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
      };
    });
  });

  const handleSetPage = (newPage) => {
    setPage(newPage);
  };

  const getPopoverContent = () => {
    return (
      <PopoverMainContainer>
        <PopoverItem onClick={() => setOrder(sortBy[0])}>Oldest</PopoverItem>
        <PopoverItem onClick={() => setOrder(sortBy[1])}>Latest</PopoverItem>
      </PopoverMainContainer>
    );
  };

  React.useEffect(() => {
    dispatch(getApplicants({ page, order: order.value }));
  }, [page, order]);

  return (
    <div>
      <Wrapper>
        <StyledTotalCount>{`${totalCount} Total`}</StyledTotalCount>
        <StyledSort>
          <StyledSpan>{`Sort by: `}</StyledSpan>
          <span>{order.name}</span>
          <Popover
            isOpen={isOpen}
            content={getPopoverContent}
            onClickOutside={() => setIsOpen(false)}
          >
            <ChevronDown size="1rem" onClick={() => setIsOpen(!isOpen)} />
          </Popover>
        </StyledSort>
      </Wrapper>
      <Table
        data={data}
        columns={columns}
        handleSetPage={handleSetPage}
        totalCount={totalCount}
      />
    </div>
  );
};

export default People;
