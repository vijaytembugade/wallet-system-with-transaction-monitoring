import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useGetWalletId from "./useGetWalletId";
import getTransactionDetails from "@/apis/getTransactionDetails";

const TransactionContext = createContext({});

const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const walletId = useGetWalletId();
  const [transactionDetails, setTransactionDetails] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [sortModel, setSortModel] = useState<any>({ createdAt: -1 });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSortModelChange = useCallback((sortModel: any) => {
    const sortBy = sortModel?.[0];
    if (sortBy) setSortModel({ [sortBy.field]: sortBy.sort });
  }, []);

  useEffect(() => {
    if (walletId) {
      try {
        const fetchTransactionDetails = async () => {
          setIsLoading(true);
          const { data, total } = await getTransactionDetails(
            walletId,
            paginationModel.page + 1,
            paginationModel.pageSize,
            JSON.stringify(sortModel)
          );
          setTransactionDetails(
            data.map((item: any) => ({
              ...item,
              id: item._id,
              createdAt: new Date(item.createdAt).toLocaleString(),
            }))
          );
          setTotal(total);
          setIsLoading(false);
        };
        fetchTransactionDetails();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  }, [walletId, paginationModel, sortModel]);

  return (
    <TransactionContext.Provider
      value={{
        transactionDetails,
        paginationModel,
        setPaginationModel,
        total,
        handleSortModelChange,
        isLoading,
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
