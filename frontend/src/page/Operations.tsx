import WalletDetails from "@/components/custom/WalletDetails";
import TransactionFormSection from "@/section/TransactionFormSection";
import React from "react";

const Operations = () => {
  return (
    <div className="grid grid-cols-2 gap-4 m-6 justify-center items-center">
      <TransactionFormSection />
      <WalletDetails />
    </div>
  );
};

export default React.memo(Operations);
