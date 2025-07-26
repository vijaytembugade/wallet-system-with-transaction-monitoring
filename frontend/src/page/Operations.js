import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import WalletDetails from "@/components/custom/WalletDetails";
import TransactionFormSection from "@/section/TransactionFormSection";
import React from "react";
const Operations = () => {
    return (_jsxs("div", { className: "grid grid-cols-2 gap-4 m-6 justify-center items-center", children: [_jsx(TransactionFormSection, {}), _jsx(WalletDetails, {})] }));
};
export default React.memo(Operations);
