import { useEffect, useState } from "react";
import request from "../server";

const useFetch = ({ url, params }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [callBack, setCallBack] = useState(false);

  const reFetch = () => {
    setCallBack(!callBack);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const getData = async () => {
      try {
        setLoading(true);
        let { data } = await request.get(url, {
          params: params ? JSON.parse(params) : {},
          signal,
        });
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getData();

    return () => controller.abort();
  }, [url, params, callBack]);
  return { data, error, loading, reFetch };
};

export default useFetch;
