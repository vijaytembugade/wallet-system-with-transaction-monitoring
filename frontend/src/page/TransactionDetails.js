import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
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
        renderCell: (params) => {
            return (_jsxs("div", { className: `${params.row.type === "CREDIT" ? "text-green-700" : "text-red-700"} font-bold`, children: [params.row.type === "CREDIT" ? "+" : "-", params.row.amount] }));
        },
    },
    {
        align: "center",
        headerAlign: "center",
        field: "type",
        headerName: "Type",
        sortable: false,
        flex: 1,
        renderCell: (params) => {
            return (_jsx("div", { className: `${params.row.type === "CREDIT" ? "text-green-700" : "text-red-700"} font-bold`, children: params.row.type }));
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
    const { transactionDetails, paginationModel, setPaginationModel, total, handleSortModelChange, } = useTransactionDetails();
    return (_jsxs("div", { className: "flex flex-1 flex-col gap-4 justify-center items-center p-6 w-full", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Transaction Details" }), _jsx(ReactGrid, { rowData: transactionDetails, columnDefs: columns, paginationModel: paginationModel, onPaginationModelChange: setPaginationModel, rowCount: total, onSortModelChange: handleSortModelChange })] }));
};
export default TransactionDetails;
