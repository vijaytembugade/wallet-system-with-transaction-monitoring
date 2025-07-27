import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const ReactGrid = (props: {
  rowData: any[];
  columnDefs: any[];
  isLoading: boolean;
}) => {
  const { rowData, columnDefs, isLoading } = props;
  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <DataGrid
        sx={{ width: "100%" }}
        rows={rowData}
        columns={columnDefs}
        paginationMode="server"
        pageSizeOptions={[5, 10, 25]}
        showToolbar
        {...props}
        disableColumnMenu
        sortingMode="server"
        loading={isLoading}
      />
    </div>
  );
};

export default React.memo(ReactGrid);
