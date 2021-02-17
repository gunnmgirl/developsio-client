import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "@malcodeman/react-popover";
import { ChevronDown, MapPin } from "react-feather";
import format from "date-fns/format";
import { Modal } from "@malcodeman/react-modal";

import { getApplicant, changeApplicantStatus } from "../actions/peopleActions";
import { getStatuses } from "../../statuses/actions/statusesActions";
import noImage from "../../../images/noImage.png";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";
import Spinner from "../../components/Spinner";

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

const StyledFilter = styled.div`
  min-width: 14rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${(props) => props.theme.secondaryText};
  cursor: pointer;
  margin: 0.4rem 0;
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

const WrapperPositions = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  border-top: 2px solid ${(props) => props.theme.secondaryText};
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
  width: 100%;
  min-height: 8rem;
  background-color: ${(props) => props.theme.secondaryLight};
  padding: 0.4rem 0.4rem;
  margin-top: 1rem;
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const getPopoverContent = () => {
    return (
      <PopoverMainContainer>
        {statuses?.map((status) => (
          <PopoverItem
            onClick={() => {
              setStatus(status);
              setIsModalOpen(!isModalOpen);
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
            <WrapperPositions>
              <span>Previous Positions: </span>
              <StyledTextarea resize="0">
                {person?.previousPositions}
              </StyledTextarea>
            </WrapperPositions>
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
              <StyledSpan>Current Status</StyledSpan>
              <FilterWrapper>
                <span>{person?.status?.name}</span>
                <ChevronDown size="1rem" />
              </FilterWrapper>
            </StyledFilter>
          </Popover>
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
            }}
          >
            <ModalMainContainer>
              <StyledP>{`Are you sure you want to change applicant status to ${status?.name}?`}</StyledP>
              <ButtonWrapper>
                <StyledButton onClick={() => setIsModalOpen(false)}>
                  Cancel
                </StyledButton>
                <StyledActiveButton
                  onClick={() => {
                    dispatch(
                      changeApplicantStatus({
                        personId: person?.person?.id,
                        status: status,
                      })
                    );
                    setIsModalOpen(false);
                  }}
                >
                  Change
                </StyledActiveButton>
              </ButtonWrapper>
            </ModalMainContainer>
          </Modal>
        </MainContainer>
      )}
    </>
  );
};

export default PersonDetails;
