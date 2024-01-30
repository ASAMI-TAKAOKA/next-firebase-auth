// 参考
// https://qiita.com/kandalog/items/2e1a499c710afe9c5f4f#usepaginationtsx-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF
import Head from "next/head";
import { GetServerSideProps } from "next";
import fetch from "node-fetch";
import { PostData } from "types/types";
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';
import PostListItem from "components/posts/PostListItem";

type Props = {
  posts: PostData[];
};

const SHOW_COUNT = 3;

export default function HomePage({ posts }: Props) {
  const [offset, setOffset] = useState(1);
  const [results, setResults] = useState(posts);

  const nextPage = () => {
    const necessaryButtonCount = Math.ceil(results.length / SHOW_COUNT);
    if (necessaryButtonCount === offset) return;
    setOffset((prevState) => prevState + 1);
  };

  const prevPage = () => {
    if (offset === 1) return;
    setOffset((prevState) => prevState - 1);
  };

  const changeOffset = (num: number) => {
    setOffset(num);
  };

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
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
              {getShowData(results, offset, SHOW_COUNT)?.map((result) => (
                  <PostListItem key={result.id} post={result} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {getShowData(results, offset, SHOW_COUNT)?.filter(result => result.category === "house_work").map((result) => (
                  <PostListItem key={result.id} post={result} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {getShowData(results, offset, SHOW_COUNT)?.filter(result => result.category === "house_work").map((result) => (
                  <PostListItem key={result.id} post={result} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {getShowData(results, offset, SHOW_COUNT)?.filter(result => result.category === "house_work").map((result) => (
                  <PostListItem key={result.id} post={result} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {getShowData(results, offset, SHOW_COUNT)?.filter(result => result.category === "house_work").map((result) => (
                  <PostListItem key={result.id} post={result} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {getShowData(results, offset, SHOW_COUNT)?.filter(result => result.category === "house_work").map((result) => (
                  <PostListItem key={result.id} post={result} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {getShowData(results, offset, SHOW_COUNT)?.filter(result => result.category === "house_work").map((result) => (
                  <PostListItem key={result.id} post={result} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {getShowData(results, offset, SHOW_COUNT)?.filter(result => result.category === "house_work").map((result) => (
                  <PostListItem key={result.id} post={result} />
                ))}
              </div>
            </div>
          </TabPanel>
        </Tabs>
        <div className="flex">
          <button
            className="border border-solid border-[#333]"
            onClick={prevPage}
          >
            前へ
          </button>
          {getButtonCount(results, SHOW_COUNT).map((count) => (
            <button
              key={count}
              className="rounded-full border border-solid border-black
            w-5 h-5 ml-1 flex justify-center items-center"
              onClick={() => changeOffset(count)}
            >
              {count}
            </button>
          ))}
          <button
            className="border border-solid border-[#333] ml-3"
            onClick={nextPage}
          >
            次へ
          </button>
        </div>
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

function getShowData<T>(results: T[], offset: number, showCount: number): T[] {
  const firstArg = (offset - 1) * showCount;
  const secondArg = offset * showCount;
  return results.slice(firstArg, secondArg);
}

function getButtonCount<T>(results: T[], showCount: number): number[] {
  const necessaryButtonCount = Math.ceil(results.length / showCount);
  
  let resultCount = [];
  for (let i = 0; i < necessaryButtonCount; i++) {
    resultCount.push(i + 1);
  }
  return resultCount;
}