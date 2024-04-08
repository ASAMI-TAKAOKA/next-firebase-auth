import Head from "next/head";
import { GetServerSideProps } from "next";
import fetch from "node-fetch";
import { PostData } from "types/types";
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PostListItem from "components/posts/PostListItem";
import { TitleHeaderSection } from 'components/calendar/TitleHeaderSection';
import { CardSection } from 'components/calendar/CardSection';
import { createCalendarArray } from "utils/createCalendarArray";
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';

type Props = {
  posts: PostData[];
};

export default function HomePage({ posts }: Props) {
  const year = dayjs().format('YYYY');
  const month = dayjs().format('M');
  const calendarArray = createCalendarArray(year, month);
  const isMobileAndTablet = useMediaQuery({ maxWidth: 1023 }); // xs and sm and md breakpoint

  return (
    <>
      <Head>
        <title>Mom and Baby Help</title>
        <meta
          name="description"
          content="This is a app for mom and baby using firebase authenticate"
        />
      </Head>
      <section>
        {/* 投稿記事一覧 */}
        <Tabs className="container mx-auto py-8 px-3 mx-3 my-3">
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
          <div className="px-8 py-8">
            {/* スマホとタブレット以外(PC等)の場合のみ、以下の通りカレンダーを表示させる */}
            {!isMobileAndTablet && (
              <div className="rounded-lg flex flex-col items-center gap-4">
                <h2>離乳食の献立を登録する</h2>
                {/* カレンダー */}
                <TitleHeaderSection year={year} month={month}/>
                <CardSection calendarArray={calendarArray} month={month}/>
              </div>
            )}
              <div>
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
              </div>
          </div>
        </Tabs>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/`);

  let posts: PostData[] = [];

  if (res.ok) {
    posts = (await res.json()) as PostData[];
  }

  res.headers.set(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return { props: { posts } };
};
