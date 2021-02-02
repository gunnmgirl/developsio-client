import React from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";
import styled from "styled-components";

import { getApplicants } from "../actions/peopleActions";
import Table from "./Table";

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

const People = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.people);
  const totalCount = useSelector((state) => state.people.totalCount);
  const [page, setPage] = React.useState(0);

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

  React.useEffect(() => {
    dispatch(getApplicants({ page }));
  }, [page]);

  return (
    <div>
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
