import { jsx as _jsx } from "react/jsx-runtime";
import WalletTransactForm from "@/components/custom/WalletTransactForm";
import React from "react";
const TransactionFormSection = () => {
    return (_jsx("div", { className: "flex justify-center items-center w-full p-3 m-3", children: _jsx(WalletTransactForm, {}) }));
};
export default TransactionFormSection;
