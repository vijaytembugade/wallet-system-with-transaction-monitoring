import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useIsWalletDetailsAvailable from "@/hooks/useIsWalletDetailsAvailable";
import useSetupWallet from "@/hooks/useSetupWallet";
import { memo } from "react";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

function WalletSeupPopup() {
  const isWalletDetailsAvailable = useIsWalletDetailsAvailable();
  const {
    username,
    balance,
    setUsername,
    setBalance,
    handleSetupWallet,
    isLoading,
  } = useSetupWallet();
  return (
    <AlertDialog open={!isWalletDetailsAvailable}>
      <AlertDialogContent className="w-5xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Setup you wallet
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              type="text"
              placeholder="Enter your username"
              className="w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </AlertDialogDescription>
          <AlertDialogDescription>
            <Input
              type="number"
              placeholder="Enter amount"
              className="w-full"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction disabled={isLoading} onClick={handleSetupWallet}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Setup Wallet"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default memo(WalletSeupPopup);
