"use client";

import PostsSection from "@/components/PostsSection";
import Sidebar from "@/components/Sidebar";
import { PostsProvider } from "@/context/PostsProvider";
import { cn } from "@/utils/cn";

export default function Home() {
  return (
    <PostsProvider>
      <div className={cn("flex", "gap-4", "flex-col", "lg:flex-row")}>
        <Sidebar className="flex-[35%] w-full" />
        <PostsSection className="flex-[65%]" />
      </div>
    </PostsProvider>
  );
}
