import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useWallet from "@/hooks/useWallet";

const WalletDetails = () => {
  const { wallet, balance } = useWallet();

  return (
    <div className="flex flex-1 flex-col gap-4 justify-center items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-left text-4xl">Wallet Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-left">
          <p>Username: {wallet?.username}</p>
          <p className="flex gap-2">
            Current Balance:{" "}
            <span className="font-bold font-mono">{balance}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(WalletDetails);
