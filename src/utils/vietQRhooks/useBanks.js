import React, { useState, useEffect } from "react";
import ApiPaymentVietQr from "../../apis/payment/ApiPaymentVietQr.js";

export function useBanks() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const CACHE_KEY = "vietqr_banks";
    const CACHE_TTL = 24 * 60 * 60 * 1000; // 24h

    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) {
          setBanks(data);
          setLoading(false);
          return;
        }
      } catch {}
    }

    ApiPaymentVietQr.getTransferBanks()
      .then((res) => {
        setBanks(res.data);
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: res.data, ts: Date.now() }),
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { banks, loading, error };
}
