import { useState, useEffect } from "react";

const UseCurrencyInfo = (currency) => {
  const [Data, setData] = useState({});

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
    )
      .then((res) => res.json())
      .then((res) => setData(res[currency]));
  }, []);
  return Data;
};

export default UseCurrencyInfo;
