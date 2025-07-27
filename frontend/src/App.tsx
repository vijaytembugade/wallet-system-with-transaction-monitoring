import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/custom/Navbar";
import WalletSeupPopup from "./components/custom/WalletSeupPopup";
import { NAV_TABS } from "./constants";
import useActiveNavTab from "./hooks/useActiveNavTab";
import { TransactionProvider } from "./hooks/useTansactionDetailsProvider";
import Operations from "./page/Operations";
import TransactionDetails from "./page/TransactionDetails";

function App() {
  const { activeNavTab, setActiveNavTab } = useActiveNavTab();

  return (
    <>
      <Navbar activeNavTab={activeNavTab} handleNavTabClick={setActiveNavTab} />
      <WalletSeupPopup />
      {activeNavTab === NAV_TABS.OPERATIONS && <Operations />}
      {activeNavTab === NAV_TABS.TRANSACTION && (
        <TransactionProvider>
          <TransactionDetails />
        </TransactionProvider>
      )}
      <Toaster />
    </>
  );
}

export default App;
