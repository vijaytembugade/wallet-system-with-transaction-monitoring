import { createContext, useContext, useEffect, useRef, useState } from "react";
import useGetWalletId from "./useGetWalletId";
import getTransactionDetails from "@/apis/getTransactionDetails";

const TransactionContext = createContext({});

const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const walletId = useGetWalletId();
  const [transactionDetails, setTransactionDetails] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    if (walletId) {
      const fetchTransactionDetails = async () => {
        const { data, total } = await getTransactionDetails(
          walletId,
          paginationModel.page + 1,
          paginationModel.pageSize
        );
        setTransactionDetails(
          data.map((item: any) => ({
            ...item,
            id: item._id,
            createdAt: new Date(item.createdAt).toLocaleString(),
          }))
        );
        setTotal(total);
      };
      fetchTransactionDetails();
    }
  }, [walletId, paginationModel]);

  return (
    <TransactionContext.Provider
      value={{
        transactionDetails,
        paginationModel,
        setPaginationModel,
        total,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default function useTransactionDetails() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
}

export { TransactionProvider };
