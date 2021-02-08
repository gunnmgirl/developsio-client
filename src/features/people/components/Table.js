import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTable, useFlexLayout, usePagination } from "react-table";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import Spinner from "../../components/Spinner";

const Container = styled.div`
  height: 100%;
`;

const Head = styled.div`
  margin: 2rem 0;
  padding: 0 2rem;
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

const Body = styled.div`
  color: ${(props) => props.theme.secondary};
`;

const Header = styled.div``;

const Data = styled.div``;

const DataRow = styled.div`
  border: 1px solid ${(props) => props.theme.onPrimary};
  border-left: 0;
  border-right: 0;
  background-color: ${(props) => props.theme.secondaryLight};
  margin: 1rem 0;
  padding: 0 2rem;
  min-height: 3rem;
  align-items: center;
`;

function Table(props) {
  const { columns, data, handleSetPage, totalCount } = props;
  const limit = useSelector((state) => state.people.limit);
  const loading = useSelector((state) => state.people.loading);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      pageCount: Math.ceil(totalCount / limit),
      manualPagination: true,
      initialState: { pageIndex: 0 },
    },
    useFlexLayout,
    usePagination
  );

  React.useEffect(() => {
    handleSetPage(pageIndex);
  }, [pageIndex]);

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <div {...getTableProps()}>
          <Head>
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Header {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Header>
                ))}
              </div>
            ))}
          </Head>
          <Body {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <DataRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <>
                        <Data {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </Data>
                      </>
                    );
                  })}
                </DataRow>
              );
            })}
          </Body>
          <Wrapper>
            <IconWrapper
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <ArrowLeftCircle />
            </IconWrapper>
            <PageWrapper>{`${pageIndex + 1}`}</PageWrapper>
            <IconWrapper onClick={() => nextPage()} disabled={!canNextPage}>
              <ArrowRightCircle />
            </IconWrapper>
          </Wrapper>
        </div>
      )}
    </Container>
  );
}

export default Table;
