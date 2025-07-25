import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const ReactGrid = (props: { rowData: any[]; columnDefs: any[] }) => {
  const { rowData, columnDefs } = props;
  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        sx={{ width: "100%", height: 400 }}
        rows={rowData}
        columns={columnDefs}
        paginationMode="server"
        pageSizeOptions={[5, 10, 25]}
        showToolbar
        {...props}
        disableColumnMenu
        sortingMode="server"
      />
    </div>
  );
};

export default React.memo(ReactGrid);
