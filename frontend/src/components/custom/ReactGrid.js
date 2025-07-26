import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
const ReactGrid = (props) => {
    const { rowData, columnDefs } = props;
    return (_jsx("div", { style: { height: "70vh", width: "100%" }, children: _jsx(DataGrid, { sx: { width: "100%" }, rows: rowData, columns: columnDefs, paginationMode: "server", pageSizeOptions: [5, 10, 25], showToolbar: true, ...props, disableColumnMenu: true, sortingMode: "server" }) }));
};
export default React.memo(ReactGrid);
