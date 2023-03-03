/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-children-prop */
"use client";

import { usePosts } from "@/hooks/usePosts";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { cn } from "@/utils/cn";
import { Data } from "@/types/Post";
import Link from "next/link";
import { DateTime } from "luxon";
import { startCase, upperFirst } from "lodash";
import markdownToTxt from "markdown-to-txt";
import { ArrowUp, MessageText } from "iconoir-react";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Post = ({ post }: { post: Data }) => {
  const miscClasses = cn("text-sm", "text-gray-600");

  return (
    <Link href={`https://reddit.com${post.permalink}`} target="_blank">
      <div
        className={cn(
          "p-2",
          "hover:bg-gray-100",
          "rounded-smPlus",
          "grid",
          "gap-1.5",
          "leading-none"
        )}
      >
        <div>
          <Link
            href={`https://reddit.com/r/${post.subreddit}`}
            className={cn(miscClasses, "hover:underline")}
            target="_blank"
            rel="noferrer"
          >
            {post.subreddit_name_prefixed}
          </Link>
          <span className="text-sm text-gray-800"> • </span>
          <Link
            href={`https://reddit.com/user/${post.author}`}
            className={cn(miscClasses, "hover:underline")}
            target="_blank"
            rel="noferrer"
          >
            by u/{post.author}
          </Link>
          <span className="text-sm text-gray-800"> • </span>
          <span className={cn(miscClasses)}>
            {upperFirst(
              DateTime.fromJSDate(
                new Date(post.created_utc * 1000)
              ).toRelativeCalendar({
                locale: "en-US",
              }) as string
            )}
          </span>
        </div>
        <div>
          <h3 className="font-[450]">{post.title}</h3>
        </div>
        {post.selftext ? (
          <div className="overflow-hidden">
            <p className="text-gray-700 text-[15px]">
              {markdownToTxt(post.selftext).slice(0, 200)}...
            </p>
          </div>
        ) : null}
        {post.url_overridden_by_dest ? (
          <img
            alt="preview"
            src={post.url_overridden_by_dest}
            className="rounded-smPlus w-full h-[200px] object-contain bg-gray-50 bg-opacity-50 shadow-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              // hide element if image is broken
              target.style.display = "none";
            }}
          />
        ) : null}
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-800 flex items-center gap-1.5 mt-1">
            <span className="flex items-center gap-0.5">
              <ArrowUp
                width={13}
                height={13}
                strokeWidth={2}
                className={"text-gray-500"}
              />
              {post.ups}
            </span>
            <span className="flex items-center gap-0.5">
              <MessageText
                width={13}
                height={13}
                strokeWidth={2}
                className={"text-gray-500"}
              />
              {post.num_comments}
            </span>
          </div>
          {post.link_flair_text ? (
            <span className="px-1.5 py-0.5 bg-purple-600 bg-opacity-20 text-purple-600 font-medium text-xs rounded-md">
              {post.link_flair_text}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

const PostsSection = ({ ...props }: React.ComponentPropsWithoutRef<"div">) => {
  const { data, isLoading, loadMore, hasMore, dataLength } = usePosts();

  return (
    <div {...props}>
      <MotionConfig transition={{ duration: 0.1 }}>
        <AnimatePresence mode="wait" initial>
          {isLoading ? (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              exit={"hidden"}
              key={"loading"}
              className="min-h-[10vh] grid place-content-center"
            >
              <Spinner />
            </motion.div>
          ) : (
            <motion.div
              key={"posts"}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit={"hidden"}
            >
              <InfiniteScroll
                dataLength={dataLength}
                next={loadMore}
                hasMore={hasMore}
                loader={<Spinner />}
                endMessage={
                  <p className="text-center mt-2">
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                className="grid gap-1"
              >
                {data?.map((post, index) => {
                  return <Post key={index} post={post} />;
                })}
              </InfiniteScroll>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
};

export default PostsSection;
