import { postsContext } from "@/context/PostsProvider";
import { useContext } from "react";

export const usePosts = () => {
  const context = useContext(postsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};
