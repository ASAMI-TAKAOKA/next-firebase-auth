import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import fetch from "node-fetch";
import { PostData } from "types/types";
import 'react-tabs/style/react-tabs.css';
import Pagination from "components/Pagination";

type Props = {
  posts: PostData[];
};

export default function HomePage({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Mom and Baby Help</title>
        <meta
          name="description"
          content="This is a app for mom and baby using firebase authenticate"
        />
      </Head>
      <Pagination posts={posts} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/`);

  const posts: PostData[] = (await res.json()) as any;

  res.headers.set(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return { props: { posts } };
};
