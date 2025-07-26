import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import useIsWalletDetailsAvailable from "@/hooks/useIsWalletDetailsAvailable";
import useSetupWallet from "@/hooks/useSetupWallet";
import { memo } from "react";
import { Input } from "../ui/input";
function WalletSeupPopup() {
    const isWalletDetailsAvailable = useIsWalletDetailsAvailable();
    const { username, balance, setUsername, setBalance, handleSetupWallet } = useSetupWallet();
    return (_jsx(AlertDialog, { open: !isWalletDetailsAvailable, children: _jsxs(AlertDialogContent, { className: "w-5xl", children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { className: "text-center", children: "Setup you wallet" }), _jsx(AlertDialogDescription, { children: _jsx(Input, { type: "text", placeholder: "Enter your username", className: "w-full", value: username, onChange: (e) => setUsername(e.target.value) }) }), _jsx(AlertDialogDescription, { children: _jsx(Input, { type: "number", placeholder: "Enter amount", className: "w-full", value: balance, onChange: (e) => setBalance(Number(e.target.value)) }) })] }), _jsx(AlertDialogFooter, { children: _jsx(AlertDialogAction, { onClick: handleSetupWallet, children: "Continue" }) })] }) }));
}
export default memo(WalletSeupPopup);
