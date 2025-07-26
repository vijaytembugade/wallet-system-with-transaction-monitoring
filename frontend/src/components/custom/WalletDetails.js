import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useWallet from "@/hooks/useWallet";
const WalletDetails = () => {
    const { wallet, balance } = useWallet();
    return (_jsx("div", { className: "flex flex-1 flex-col gap-4 justify-center items-center", children: _jsxs(Card, { className: "w-full", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-left text-4xl", children: "Wallet Details" }) }), _jsxs(CardContent, { className: "flex flex-col gap-2 text-left", children: [_jsxs("p", { children: ["Username: ", wallet?.username] }), _jsxs("p", { className: "flex gap-2", children: ["Current Balance:", " ", _jsx("span", { className: "font-bold font-mono", children: balance })] })] })] }) }));
};
export default React.memo(WalletDetails);
