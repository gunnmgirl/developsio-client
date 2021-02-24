import React from "react";
import styled from "styled-components";
import { useTable, useFlexLayout } from "react-table";
import { useTrail, animated } from "react-spring";

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

const DataRow = styled(animated.div)`
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

  const trail = useTrail(rows.length, {
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    to: { opacity: 1, transform: "translate3d(0,0px,0)" },
  });

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
          {trail.map((props, index) => {
            const row = rows[index];
            prepareRow(row);
            return (
              <DataRow
                {...row.getRowProps()}
                style={{
                  ...row.getRowProps().style,
                  ...props,
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
