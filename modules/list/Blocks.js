import { Table as AntTable } from "antd";
import React, { useMemo } from "react";
import styled from "styled-components";

import Loader from "@/components/common/Loader";

import { useListContext } from ".";

const StyledTable = styled(AntTable)`
  .ant-table-head {
    background: #fafafa;
  }
  .ant-table-thead > tr > th {
    font-size: 12px;
    color: #909090;
    font-weight: 400;
    border-bottom: 0;
  }

  .ant-table-tbody {
    border-radius: 10px;
    overflow: hidden;
    background: white;
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
  margin: 40px auto;
  max-width: 500px;
`;

export function Listing({ Item }) {
  const { state } = useListContext();
  const { items, pages, currentPage, isLoading } = state;

  const derivedItems = useMemo(() => {
    return pages.reduce((accumulator, page) => {
      return accumulator.concat(items[page]);
    }, []);
  }, [items, pages]);

  function renderItem(item) {
    return <Item item={item} />;
  }

  function renderLoader() {
    if (!isLoading) {
      return null;
    }

    return <Loader small={currentPage > 0} />;
  }

  return (
    <>
      {Item ? derivedItems.map(renderItem) : null}
      {renderLoader()}
    </>
  );
}

export function Table({ ...props }) {
  const { state } = useListContext();
  const { items, pages, isLoading, currentPage, filters } = state;

  const derivedItems = useMemo(() => {
    return pages.reduce((accumulator, page) => {
      return accumulator.concat(items[page]);
    }, []);
  }, [items, pages]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      props.onRowsSelected(selectedRowKeys, selectedRows);
    },
    getCheckboxProps: (item) => ({
      disabled: item.disabled, // Column configuration not to be checked
      name: item.name,
    }),
  };

  return (
    <StyledTable
      pagination={false}
      {...props}
      loading={isLoading}
      dataSource={derivedItems}
      rowSelection={props.selection && rowSelection}
    />
  );
}

export function LoadMore() {
  const { state, actions } = useListContext();

  if (state.isLoading) {
    return null;
  }

  return <button onClick={actions.nextPage}>Load more</button>;
}

export function NoResults({ message }) {
  const { items, state } = useListContext();

  if (state.isLoading) {
    return null;
  }

  if (items.length === 0) {
    return <NoResultsMessage>{message}</NoResultsMessage>;
  }

  return null;
}
