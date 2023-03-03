"use client";

import { Data } from "@/types/Post";
import axios from "axios";
import { createContext, useState } from "react";
import useSWRInfinite from "swr/infinite";

export const initialValues = {
  search: "",
  sort: "relevance", // relevance, hot, top, new, comments
  time: "all", // all, day, hour, month, week, year
  "title:every": "",
  "selftext:every": "",
  "title:some": "",
  "selftext:some": "",
  exclude: "",
  "title:not": "",
  "selftext:not": "",
  subreddit: "",
  author: "",
  flair: "",
};

interface PostsContext {
  data: Data[];
  isLoading: boolean;
  queries: typeof initialValues;
  setQueries: React.Dispatch<React.SetStateAction<typeof initialValues>>;
  dataLength: number;
  hasMore: boolean;
  loadMore: () => void;
}
const postsContext = createContext<null | PostsContext>(null);

const fetcher = ([endpoint, params]: [string, Record<string, any>]) =>
  axios.get(endpoint, { params }).then((res) => {
    return res.data;
  });

const getKeys = (
  pageIndex: number,
  previousPageData: Data[],
  queries: Record<string, any>
) => {
  const limit = 25;

  if (previousPageData && previousPageData.length < limit) return null;
  if (pageIndex === 0) return ["/api/search", queries];
  return [
    "/api/search",
    { ...queries, after: previousPageData[previousPageData.length - 1].name },
  ];
};

const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [queries, setQueries] = useState<typeof initialValues>(initialValues);

  const { data, isLoading, setSize, size, error } = useSWRInfinite<Data[]>(
    (...args) => getKeys(...args, queries),
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateFirstPage: false,
    }
  );

  const parsedData = data?.reduce((acc: Data[], cur) => {
    return [...acc, ...cur];
  }, []) as Data[];

  const dataLength = parsedData?.length || 0;

  const hasMore =
    isLoading || ((data && data[data.length - 1]?.length === 25) as boolean);

  const loadMore = () => {
    setSize(size + 1);
  };

  return (
    <postsContext.Provider
      value={{
        data: parsedData,
        isLoading: isLoading,
        queries,
        setQueries,
        dataLength,
        hasMore,
        loadMore,
      }}
    >
      {children}
    </postsContext.Provider>
  );
};

export { postsContext, PostsProvider };
