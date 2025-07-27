import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useWallet from "@/hooks/useWallet";
import { Loader2 } from "lucide-react";

const WalletDetails = () => {
  const { wallet, balance, walletLoading: isLoading } = useWallet();

  return (
    <div className="flex flex-1 flex-col gap-4 justify-center items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-left text-4xl">Wallet Details</CardTitle>
        </CardHeader>
        {isLoading && (
          <CardContent className="flex h-full text-gray-400">
            <p>Loading wallet details...</p>
          </CardContent>
        )}
        <CardContent className="flex flex-col gap-2 text-left">
          <p className="flex gap-2 items-center">
            Username:{" "}
            <span className="font-bold ">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                wallet?.username
              )}
            </span>
          </p>
          <p className="flex gap-2 items-center">
            Current Balance:{" "}
            <span className="font-bold font-mono">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                balance
              )}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(WalletDetails);
