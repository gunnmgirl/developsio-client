import React from "react";
import styled from "styled-components";
import { useTable, useFlexLayout } from "react-table";

const Container = styled.div`
  color: ${(props) => props.theme.onPrimary};
  background-color: ${(props) => props.theme.primary};
`;

const Head = styled.div`
  margin: 2rem 0;
  padding: 0 2rem;
`;

const Body = styled.div`
  color: ${(props) => props.theme.secondary};
`;

const Header = styled.div``;

const Data = styled.div``;

const DataRow = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  border-left: 0;
  border-right: 0;
  background-color: ${(props) => props.theme.secondaryLight};
  margin: 1rem 0;
  padding: 0 2rem;
  min-height: 3rem;
  align-items: center;
`;

function Table(props) {
  const { columns, data } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
    },
    useFlexLayout
  );

  return (
    <Container>
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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <DataRow
                {...row.getRowProps()}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <Data {...cell.getCellProps()}>{cell.render("Cell")}</Data>
                  );
                })}
              </DataRow>
            );
          })}
        </Body>
      </div>
    </Container>
  );
}

export default Table;
