import { useState, useEffect } from "react";

const useCurrencyInfo = (currency) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currency) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        let res = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        );

        if (!res.ok) {
          res = await fetch(`https://api.frankfurter.app/latest?from=${currency}`);
          if (!res.ok) throw new Error("Both APIs failed");
        }

        const result = await res.json();
        setData(result[currency.toLowerCase()] || result.rates); // Handle different API responses
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setData({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currency]);

  return { data, error, isLoading };
};

export default useCurrencyInfo;