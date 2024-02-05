// 参考
// https://qiita.com/kandalog/items/2e1a499c710afe9c5f4f#usepaginationtsx-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF
import Head from "next/head";
import { GetServerSideProps } from "next";
import fetch from "node-fetch";
import { PostData } from "types/types";
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PostListItem from "components/posts/PostListItem";

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
      <section className="mx-auto py-10 px-8">
        <div className="px-40">
        <Tabs>
          <TabList>
            <Tab>全ての投稿</Tab>
            <Tab>家事</Tab>
            <Tab>お金</Tab>
            <Tab>離乳食</Tab>
            <Tab>出産</Tab>
            <Tab>授乳</Tab>
            <Tab>ねんね</Tab>
            <Tab >グッズ</Tab>
          </TabList>

          <TabPanel>
            {posts?.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </TabPanel>
          {/* カテゴリに合った記事だけを表示 */}
          <TabPanel>
            {posts?.filter(post => post.category === "house_work").map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </TabPanel>
          <TabPanel>
            {posts?.filter(post => post.category === "money").map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </TabPanel>
          <TabPanel>
            {posts?.filter(post => post.category === "baby_food").map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </TabPanel>
          <TabPanel>
            {posts?.filter(post => post.category === "childbirth").map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </TabPanel>
          <TabPanel>
            {posts?.filter(post => post.category === "breastfeeding").map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </TabPanel>
          <TabPanel>
            {posts?.filter(post => post.category === "sleeping").map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </TabPanel>
          <TabPanel>
            {posts?.filter(post => post.category === "goods").map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </TabPanel>
        </Tabs>
        </div>
      </section>
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