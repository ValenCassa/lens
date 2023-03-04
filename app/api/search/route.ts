import { initialValues } from "@/context/PostsProvider";
import { PostsResponse } from "@/types/Post";
import axios from "axios";

const replaceCommasBy = (value: string, by: string) => {
  //replace all commas that are not inside a phrase with quotation marks by the given string
  const regex =
    /(?<=^|[^",\\](?:\\{2})*)\s*,\s*(?=(?:(?:\\.|"(?:\\.|[^"\\])*")|[^",\\])*($|[^",\\](?:\\{2})*"))/g;

  return value.replace(regex, by);
};

const queryFactory = (value: string, key: string) => {
  if (!value) return "";
  return ` ${key}:(${value.trim()})`;
};

interface Queries extends Record<keyof typeof initialValues, string> {
  after: string;
}

export async function GET(request: Request) {
  const reqQueries = request.url
    .split("?")[1]
    .split("&")
    .reduce((acc: any, cur) => {
      const [key, value] = cur.split("=");
      acc[key] = value;
      return acc;
    }, {}) as Queries;

  console.log(reqQueries);

  const parsedQueries = Object.entries(reqQueries).reduce(
    (acc: any, [initialKey, value]) => {
      switch (initialKey) {
        case "search":
          acc["search"] = value;
          break;
        case "title:every":
          // replace all commas that are not inside quotation marks with AND
          acc["title:every"] = replaceCommasBy(value, " AND ");
          break;
        case "title:some":
          acc["title:some"] = replaceCommasBy(value, " OR ");
          break;
        case "selftext:every":
          acc["selftext:every"] = replaceCommasBy(value, " AND ");
          break;
        case "selftext:some":
          acc["selftext:some"] = replaceCommasBy(value, " OR ");
          break;
        case "subreddit":
          acc["subreddit"] = replaceCommasBy(value, " OR ");
          break;
        case "author":
          acc["author"] = replaceCommasBy(value, " OR ");
          break;
        case "flair":
          acc["flair"] = replaceCommasBy(value, " OR ");
          break;
        case "title:not":
          acc["title:not"] = replaceCommasBy(value, " OR ");
          break;
        case "selftext:not":
          acc["selftext:not"] = replaceCommasBy(value, " OR ");
          break;
        case "exclude":
          acc["title:not"] = acc["title:not"]
            ? acc["title:not"] + " OR " + replaceCommasBy(value, " OR ")
            : replaceCommasBy(value, " OR ");
          acc["selftext:not"] = acc["selftext:not"]
            ? acc["selftext:not"] + " OR " + replaceCommasBy(value, " OR ")
            : replaceCommasBy(value, " OR ");
          break;
        default:
          break;
      }

      return acc;
    },
    {
      search: "",
      "title:every": "",
      "selftext:every": "",
      "title:some": "",
      "selftext:some": "",
      subreddit: "",
      author: "",
      flair: "",
      "title:not": "",
      "selftext:not": "",
    }
  );

  const titleQuery = Object.entries(parsedQueries)
    .filter(([key]) => key.includes("title"))
    .reduce((acc, [key, value]) => {
      if (value) {
        if (key.includes("every")) {
          acc += `(${value})`;
        } else if (key.includes("some")) {
          const addAnd = acc ? " AND " : "";
          acc += `${addAnd}(${value})`;
        } else if (key.includes("not")) {
          acc += ` NOT (${value})`;
        }
      }
      return acc;
    }, "");

  const selftextQuery = Object.entries(parsedQueries)
    .filter(([key]) => key.includes("selftext"))
    .reduce((acc, [key, value]) => {
      if (value) {
        if (key.includes("every")) {
          acc += `(${value})`;
        } else if (key.includes("some")) {
          const addAnd = acc ? " AND " : "";
          acc += `${addAnd}(${value})`;
        } else if (key.includes("not")) {
          const addSpace = acc ? " " : "";
          acc += `${addSpace}NOT (${value})`;
        }
      }
      return acc;
    }, "");

  const q = `(${
    parsedQueries.search ? parsedQueries.search + " " : ""
  }${queryFactory(titleQuery, "title").trim()}${queryFactory(
    selftextQuery,
    "selftext"
  )}${queryFactory(parsedQueries.subreddit, "subreddit")}${queryFactory(
    parsedQueries.author,
    "author"
  )}${queryFactory(parsedQueries.flair, "flair")})`;
  const sort = reqQueries.sort || "relevance";
  const t = reqQueries.time || "month";
  const limit = 25;

  const params = {
    q,
    sort,
    t,
    limit,
    after: reqQueries.after,
  };

  try {
    const { data } = await axios.get<PostsResponse>(
      "https://www.reddit.com/search.json",
      {
        params,
      }
    );

    const res = data.data.children.reduce((acc: any, cur) => {
      return (acc = [...acc, cur.data]);
    }, []);

    return new Response(JSON.stringify(res), {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify(e), {
      headers: { "content-type": "application/json" },
      status: 500,
    });
  }
}
