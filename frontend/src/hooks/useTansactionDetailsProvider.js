import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useRef, useState, } from "react";
import useGetWalletId from "./useGetWalletId";
import getTransactionDetails from "@/apis/getTransactionDetails";
const TransactionContext = createContext({});
const TransactionProvider = ({ children }) => {
    const walletId = useGetWalletId();
    const [transactionDetails, setTransactionDetails] = useState([]);
    const [total, setTotal] = useState(0);
    const [sortModel, setSortModel] = useState({ createdAt: -1 });
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const handleSortModelChange = useCallback((sortModel) => {
        const sortBy = sortModel?.[0];
        if (sortBy)
            setSortModel({ [sortBy.field]: sortBy.sort });
    }, []);
    useEffect(() => {
        if (walletId) {
            const fetchTransactionDetails = async () => {
                const { data, total } = await getTransactionDetails(walletId, paginationModel.page + 1, paginationModel.pageSize, JSON.stringify(sortModel));
                setTransactionDetails(data.map((item) => ({
                    ...item,
                    id: item._id,
                    createdAt: new Date(item.createdAt).toLocaleString(),
                })));
                setTotal(total);
            };
            fetchTransactionDetails();
        }
    }, [walletId, paginationModel, sortModel]);
    return (_jsx(TransactionContext.Provider, { value: {
            transactionDetails,
            paginationModel,
            setPaginationModel,
            total,
            handleSortModelChange,
        }, children: children }));
};
export default function useTransactionDetails() {
    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error("useTransaction must be used within a TransactionProvider");
    }
    return context;
}
export { TransactionProvider };
