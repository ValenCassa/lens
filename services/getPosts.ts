import axios from "axios";

export const getPosts = async (params: Record<string, string>) => {
  const { data } = await axios.get(
    "https://api.pushshift.io/reddit/search/submission/",
    { params }
  );
  return data;
};
