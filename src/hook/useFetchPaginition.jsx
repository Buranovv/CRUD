import { useEffect, useState } from "react";
import request from "../server";

import { LIMIT } from "../const";
import ReactPaginate from "react-paginate";

const useFetchPaginition = (url, otherParams) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1);
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

        let params = {
          page: activePage,
          limit: LIMIT,
          ...JSON.parse(otherParams),
        };

        let { data } = await request.get(url, { params, signal });
        let { data: totalData } = await request.get(url, {
          params: JSON.parse(otherParams),
        });

        setData(data);
        setTotal(totalData.length);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
    return () => controller.abort();
  }, [activePage, url, otherParams, callBack]);

  const handlePageClick = ({ selected }) => {
    setActivePage(selected + 1);
  };

  let pages = Math.ceil(total / LIMIT);

  let pagination =
    pages !== 1 ? (
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        previousLabel="Previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        pageRangeDisplayed={5}
        pageCount={pages}
        renderOnZeroPageCount={null}
        onPageChange={handlePageClick}
      />
    ) : null;

  return { pagination, data, total, loading, error, reFetch };
};

export default useFetchPaginition;
