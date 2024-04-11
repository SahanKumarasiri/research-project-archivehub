import { Table } from "antd";
import React from "react";

const TableContainer = ({ children, ...props }) => {
  return <Table {...props}>{children}</Table>;
};
export default TableContainer;
