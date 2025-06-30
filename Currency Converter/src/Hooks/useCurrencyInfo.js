import { useState, useEffect } from "react";

const useCurrencyInfo = (currency) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currency) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency.toLowerCase()}.json`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch currency data");
        }

        const result = await res.json();
        setData(result[currency.toLowerCase()]);
        setError(null);
      } catch (err) {
        console.error("API fetch error:", err);
        setError(err.message);
        setData({});
      }
    };

    fetchData();
  }, [currency]);

  return { data, error };
};

export default useCurrencyInfo;
