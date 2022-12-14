export const fetchCurrencies = async () => {
  const fetchCurr = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencyResponse = await fetchCurr.json();
  const currencies = Object
    .keys(currencyResponse)
    .map((currency) => currency)
    .filter((symbol) => symbol !== 'USDT');
  return currencies;
};

export const fetchRates = async () => {
  const fetchCurr = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencyResponse = await fetchCurr.json();
  delete currencyResponse.USDT; // isso foi mais fácil que pensei
  return currencyResponse;
};

// export default fetchCurrency;
