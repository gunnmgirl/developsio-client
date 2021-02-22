import React from "react";
import format from "date-fns/format";
import styled from "styled-components";
import { Popover } from "@malcodeman/react-popover";
import { useDispatch, useSelector } from "react-redux";

import Table from "./Table";
import { getPositions } from "../actions/positionsActions";
import { HelpCircle, PlusCircle } from "react-feather";
import Spinner from "../../components/Spinner";
import AddPositionModal from "./AddPositionModal";

const StyledPlusCircle = styled(PlusCircle)`
  color: ${(props) => props.theme.secondary};
  margin-right: 0.4rem;
`;

const StyledSpan = styled.span`
  color: ${(props) => props.theme.secondary};
  margin-right: 0.4rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledTotalCount = styled.div`
  font-size: 1.4rem;
  color: ${(props) => props.theme.secondaryText};
  font-weight: 300;
`;
const Container = styled.div`
  display: flex;
  margin: 3rem 3rem;
  align-items: center;
  justify-content: space-between;
`;

const MainContainer = styled.div`
  flex-grow: 1;
`;

const PopoverMainContainer = styled.div`
  width: 20rem;
  background-color: ${(props) => props.theme.ternary};
  border-radius: 8px;
  color: ${(props) => props.theme.onSecondary};
  padding: 1rem 1rem;
`;

const Positions = () => {
  const [isReset, setIsReset] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const totalCount = useSelector((state) => state.positions.totalCount);
  const positions = useSelector((state) => state.positions.positions);
  const loading = useSelector((state) => state.positions.loading);

  const dispatch = useDispatch();

  const columns = React.useMemo(() => [
    {
      Header: "Job Positions",
      accessor: "position",
    },
    {
      Header: "Date Created",
      accessor: "date",
    },
    {
      Header: "Job Details",
      accessor: "details",
      width: 40,
      Cell: (props) => {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <Popover
            isOpen={isOpen}
            onClickOutside={() => setIsOpen(false)}
            content={() => (
              <PopoverMainContainer>
                {props?.value || "No job details"}
              </PopoverMainContainer>
            )}
          >
            <HelpCircle onClick={() => setIsOpen(!isOpen)} />
          </Popover>
        );
      },
    },
  ]);

  const data = React.useMemo(() => {
    return positions.map((position) => {
      const newDate = new Date(position.createdAt);
      const formatedDate = format(newDate, "MMMM dd, yyyy");
      return {
        position: position.name,
        date: formatedDate,
        details: position.details,
      };
    });
  });

  React.useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  return (
    <MainContainer>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Container>
            <StyledTotalCount>{`${totalCount} Total`}</StyledTotalCount>
            <Wrapper onClick={() => setIsModalOpen(!isModalOpen)}>
              <StyledPlusCircle />
              <StyledSpan>Add Job Position</StyledSpan>
            </Wrapper>
          </Container>
          <Table
            data={data}
            columns={columns}
            totalCount={totalCount}
            isReset={isReset}
            setIsReset={setIsReset}
          />
          <AddPositionModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
      )}
    </MainContainer>
  );
};

export default Positions;
