import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "@malcodeman/react-popover";
import { ChevronDown, MapPin } from "react-feather";
import format from "date-fns/format";

import { getApplicant, changeApplicantStatus } from "../actions/peopleActions";
import { getStatuses } from "../../statuses/actions/statusesActions";
import noImage from "../../../images/noImage.png";
import Textarea from "../../../components/Textarea";
import Spinner from "../../components/Spinner";

const StyledFilter = styled.div`
  height: 2rem;
  min-width: 14rem;
  color: ${(props) => props.theme.secondaryText};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const MainContainer = styled.div`
  display: flex;
  padding: 3rem 6rem;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 30rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

const ProfileImage = styled.div`
  height: ${(props) => (props.imageUrl ? "20rem" : "12rem")};
  width: ${(props) => (props.imageUrl ? "16rem" : "12rem")};
  background: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : `url(${props.noImage})`};
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.theme.primary};
  border-radius: ${(props) => (props.imageUrl ? "16px" : 0)};
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
  color: ${(props) =>
    props.noData ? props.theme.onPrimary : props.theme.secondary};
`;

const BasicInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const CountryWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 1rem;
  margin-left: 1rem;
  color: ${(props) => props.theme.secondaryText};
`;

const StyledTextarea = styled(Textarea)`
  width: 14rem;
  min-height: 6rem;
  background-color: ${(props) => props.theme.secondaryLight};
  margin-left: 3rem;
  padding: 0.4rem 0.4rem;
  overflow-y: auto;
`;

const PersonDetails = () => {
  const { personId } = useParams();
  const dispatch = useDispatch();
  const person = useSelector((state) => state.people.person);
  const statuses = useSelector((state) => state.statuses.statuses);
  const [isOpen, setIsOpen] = React.useState(false);
  const newDate = new Date(person?.createdAt || null);
  const formatedDate = format(newDate, "MMMM dd, yyyy");
  const loading = useSelector((state) => state.people.loading);

  const getPopoverContent = () => {
    return (
      <PopoverMainContainer>
        {statuses?.map((status) => (
          <PopoverItem
            onClick={() => {
              dispatch(
                changeApplicantStatus({
                  personId: person?.person?.id,
                  status: status,
                })
              );
              setIsOpen(false);
            }}
          >
            {status.name}
          </PopoverItem>
        ))}
      </PopoverMainContainer>
    );
  };

  React.useEffect(() => {
    dispatch(getApplicant({ personId }));
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MainContainer>
          <ProfileImage
            noImage={noImage}
            imageUrl={person?.person?.imageUrl}
          ></ProfileImage>
          <Container>
            <BasicInfo>
              <span>{`${person?.person?.firstName} ${person?.person?.lastName}`}</span>
              <CountryWrapper>
                <MapPin />
                <span>{`${person?.country}, ${person?.city}`}</span>
              </CountryWrapper>
            </BasicInfo>
            <Wrapper>
              <span>Job Position: </span>
              <StyledSpan>{person?.position?.name}</StyledSpan>
            </Wrapper>
            <Wrapper>
              <span>Email Address: </span>
              <StyledSpan>{person?.person?.email}</StyledSpan>
            </Wrapper>
            <Wrapper>
              <span>Phone Number: </span>
              <StyledSpan>{person?.phoneNumber}</StyledSpan>
            </Wrapper>
            <Wrapper>
              <span>Street Address: </span>
              <StyledSpan>{person?.streetAddress}</StyledSpan>
            </Wrapper>
            <Wrapper>
              <span>Skype: </span>
              {person?.skype ? (
                <StyledSpan>{person.skype}</StyledSpan>
              ) : (
                <StyledSpan noData>/</StyledSpan>
              )}
            </Wrapper>
            <Wrapper>
              <span>Submitted Application: </span>
              <StyledSpan>{formatedDate}</StyledSpan>
            </Wrapper>
            <Wrapper>
              <span>Previous Positions: </span>
              <StyledTextarea resize="0">
                {person?.previousPositions}
              </StyledTextarea>
            </Wrapper>
          </Container>
          <Popover
            isOpen={isOpen}
            content={getPopoverContent}
            onClickOutside={() => setIsOpen(false)}
          >
            <StyledFilter
              onClick={() => {
                if (!statuses?.length) {
                  dispatch(getStatuses());
                }
                setIsOpen(!isOpen);
              }}
            >
              <span>{person?.status?.name}</span>
              <ChevronDown size="1rem" />
            </StyledFilter>
          </Popover>
        </MainContainer>
      )}
    </>
  );
};

export default PersonDetails;
