const fetchCurrency = async () => {
  const fetchCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencyResponse = await fetchCurrencies.json();
  const currencies = Object
    .keys(currencyResponse)
    .map((currency) => currency)
    .filter((symbol) => symbol !== 'USDT');
  return currencies;
};

export default fetchCurrency;
