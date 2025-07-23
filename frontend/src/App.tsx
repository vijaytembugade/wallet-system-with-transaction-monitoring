import Navbar from "./components/custom/Navbar";
import WalletSeupPopup from "./components/custom/WalletSeupPopup";
import useActiveNavTab from "./hooks/useActiveNavTab";
import TransactionFormSection from "./section/TransactionFormSection";

function App() {
  const { activeNavTab, setActiveNavTab } = useActiveNavTab();
  return (
    <>
      <Navbar activeNavTab={activeNavTab} handleNavTabClick={setActiveNavTab} />
      <WalletSeupPopup />
      <TransactionFormSection />
    </>
  );
}

export default App;
