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
          {["house_work", "money", "baby_food", "childbirth", "breastfeeding", "sleeping", "goods"].map((category, index) => (
            <TabPanel key={index}>
              {posts?.filter(post => post.category === category).map((post) => (
                <PostListItem key={post.id} post={post} />
              ))}
            </TabPanel>
          ))}
        </Tabs>
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