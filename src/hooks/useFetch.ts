import Item from "antd/lib/list/Item";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { api } from "../services/api";

interface IUseFetchProps {
  baseUrl: string;
  isLinkProps?: boolean;
  isArray?: boolean;
}

interface FilterProps {
  key: string; 
  content: string;
}

export function useFetch<T = unknown>({
  baseUrl,
  isLinkProps = true,
  isArray = true,
}: IUseFetchProps) {
  const [dataFetch, setDataFetch] = useState<T | undefined>();
  const [isFetching, setIsFetching] = useState(false);
  const [filterLink, setFilterLink] = useState("");

  const [itensPerPage, setItensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItens, setTotalItens] = useState(0);

  const [filters, setFilters] = useState<FilterProps[]>([] as FilterProps[]);
  const [search, setSearch] = useState("");

  const [columnOrdenation, setColumnOrdenation] = useState("");

  const linkFetch = `${baseUrl}?limit=${itensPerPage}&page=${currentPage}&search=${search}&sortBy=${columnOrdenation}${filterLink}`;

  const fetchAPI = useCallback(async () => {
    let variableFetchLink = linkFetch;

    if (!isLinkProps) {
      variableFetchLink = `${baseUrl}`;
    }

    setIsFetching(true);
    try {
      const { data } = await api.get(variableFetchLink);

      if (isArray) {
        setDataFetch(data.data);
        setTotalItens(data.meta.totalItems);
      } else {
        setDataFetch(data);
        setTotalItens(0);
      }

      setIsFetching(false);
    } catch(err) {
      setIsFetching(false);
      console.log(err);
    }
  }, [baseUrl, isArray, isLinkProps, linkFetch])

  async function refetch() {
    await fetchAPI();
  }

  function ApplyFilters() {
    const res = filters.map(item => { return `${item.key}${item.content}`});
    setFilterLink(res.join(""))
  }

  function handleAddFilters(object: FilterProps) {
    let initialArray = filters;
    let arrayFilter = initialArray.filter((item) => item.key !== object.key);
    let finalArray = [...arrayFilter, object];
    setFilters(finalArray);
  }

  function clearFilters() {
    setFilters([])
    setFilterLink("");
  }

  const [cookies] = useCookies(["whats-front-token"]);
  const token = cookies["whats-front-token"];

  useEffect(() => {
    if(token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      fetchAPI();
    }
  }, [fetchAPI, token]);

  useEffect(() => {
    if(token) fetchAPI();
  }, [linkFetch]);

  return {
    dataFetch,
    isFetching,
    currentPage,
    setCurrentPage,
    clearFilters,
    itensPerPage,
    setItensPerPage,
    totalItens,
    filters,
    handleAddFilters,
    search,
    setSearch,
    columnOrdenation,
    setColumnOrdenation,
    refetch,
    ApplyFilters
  };
}