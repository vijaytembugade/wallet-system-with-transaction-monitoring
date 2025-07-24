import React from "react";
import ReactGrid from "@/components/custom/ReactGrid";
import useTransactionDetails from "@/hooks/useTansactionDetailsProvider";

const columns = [
  {
    align: "center",
    headerAlign: "center",
    field: "createdAt",
    headerName: "Transaction Date",
    sortable: true,
    flex: 1,
  },
  {
    align: "center",
    headerAlign: "center",
    field: "amount",
    headerName: "Amount",
    sortable: true,
    flex: 1,
    renderCell: (params: any) => {
      return (
        <div
          className={`${
            params.row.type === "CREDIT" ? "text-green-700" : "text-red-700"
          } font-bold`}
        >
          {params.row.type === "CREDIT" ? "+" : "-"}
          {params.row.amount}
        </div>
      );
    },
  },
  {
    align: "center",
    headerAlign: "center",
    field: "type",
    headerName: "Type",
    sortable: false,
    flex: 1,
    renderCell: (params: any) => {
      return (
        <div
          className={`${
            params.row.type === "CREDIT" ? "text-green-700" : "text-red-700"
          } font-bold`}
        >
          {params.row.type}
        </div>
      );
    },
  },
  {
    align: "center",
    headerAlign: "center",
    field: "onRampBalance",
    headerName: "Remaining Balance",
    sortable: false,
    flex: 1,
  },
  {
    align: "center",
    headerAlign: "center",
    field: "description",
    headerName: "Description",
    sortable: false,
    flex: 1,
  },
];

const TransactionDetails = () => {
  const { transactionDetails, paginationModel, setPaginationModel, total } =
    useTransactionDetails();

  console.log(paginationModel);

  return (
    <div className="flex flex-1 flex-col gap-4 justify-center items-center p-6 w-full">
      <h1 className="text-2xl font-bold">Transaction Details</h1>
      <ReactGrid
        rowData={transactionDetails}
        columnDefs={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={total}
      />
    </div>
  );
};

export default TransactionDetails;
