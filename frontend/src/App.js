import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "./components/custom/Navbar";
import WalletSeupPopup from "./components/custom/WalletSeupPopup";
import { NAV_TABS } from "./constants";
import useActiveNavTab from "./hooks/useActiveNavTab";
import Operations from "./page/Operations";
import TransactionDetails from "./page/TransactionDetails";
import { TransactionProvider } from "./hooks/useTansactionDetailsProvider";
import { Toaster } from "@/components/ui/sonner";
function App() {
    const { activeNavTab, setActiveNavTab } = useActiveNavTab();
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, { activeNavTab: activeNavTab, handleNavTabClick: setActiveNavTab }), _jsx(WalletSeupPopup, {}), activeNavTab === NAV_TABS.OPERATIONS && _jsx(Operations, {}), activeNavTab === NAV_TABS.TRANSACTION && (_jsx(TransactionProvider, { children: _jsx(TransactionDetails, {}) })), _jsx(Toaster, {})] }));
}
export default App;
