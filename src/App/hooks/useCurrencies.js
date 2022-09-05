import {
  useGetCurrenciesQuery,
  usePostCurrenciesMutation,
} from "../store/features/currency/currencyAPI";

const useCurrencies = () => {
  const { data: currencies } = useGetCurrenciesQuery();
  const [triggerConvertCurrency] = usePostCurrenciesMutation();

  return {
    currencies,
    triggerConvertCurrency,
  };
};

export default useCurrencies;
