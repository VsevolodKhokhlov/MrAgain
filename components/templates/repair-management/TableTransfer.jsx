import { Button, Col, Row, Table, Tag, Transfer } from "antd";
import difference from "lodash/difference";
import { useState } from "react";

export const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => {
  const [filteredInfo, setFilteredInfo] = useState(null);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
  };

  return (
    <>
      <Row type="flex" justify="space-between">
        <Col>
          <h2>Google</h2>
        </Col>
        <Col>
          <Button type="primary">Save</Button>
        </Col>
      </Row>
      <Transfer {...restProps} showSelectAll={false}>
        {({
          direction,
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
          disabled: listDisabled,
        }) => {
          const columns =
            direction === "left" ? leftColumns(filteredInfo) : rightColumns;

          const rowSelection = {
            getCheckboxProps: (item) => ({
              disabled: listDisabled || item.disabled,
            }),
            onSelectAll(selected, selectedRows) {
              const treeSelectedKeys = selectedRows
                .filter((item) => !item.disabled)
                .map(({ key }) => key);
              const diffKeys = selected
                ? difference(treeSelectedKeys, listSelectedKeys)
                : difference(listSelectedKeys, treeSelectedKeys);
              onItemSelectAll(diffKeys, selected);
            },
            onSelect({ key }, selected) {
              onItemSelect(key, selected);
            },
            selectedRowKeys: listSelectedKeys,
          };

          return (
            <Table
              pagination={{ pageSize: 18 }}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredItems}
              size="small"
              style={{ pointerEvents: listDisabled ? "none" : null }}
              onRow={({ key, disabled: itemDisabled }) => ({
                onClick: () => {
                  if (itemDisabled || listDisabled) return;
                  onItemSelect(key, !listSelectedKeys.includes(key));
                },
              })}
              onChange={handleChange}
            />
          );
        }}
      </Transfer>
    </>
  );
};
