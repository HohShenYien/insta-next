import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/api/posts";
import Post from "@/components/posts/Post";
import StoryCarousel from "@/components/carousel/StoryCarousel";
import { signIn, useSession } from "next-auth/react";
import { Avatar, Text } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  const posts = useQuery({ queryFn: getAllPosts, queryKey: ["all-posts"] });
  const session = useSession();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row items-start justify-center space-x-12">
        <div className="space-y-4 flex flex-col items-center">
          <StoryCarousel />
          {posts.isSuccess &&
            posts.data.posts.map((post, index) => (
              <Post post={post} key={index} />
            ))}
        </div>
        <div className="w-[240px]">
          <Link href={`/users/${session?.data?.user.name}`}>
            <div className="flex items-center space-x-2">
              <Avatar
                src={session?.data?.user.image ?? ""}
                alt={session?.data?.user.name ?? ""}
                size="64px"
                classNames={{ root: "rounded-full" }}
              />
              <Text className="font-semibold">{session?.data?.user.name}</Text>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
