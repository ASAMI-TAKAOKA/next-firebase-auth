import Head from "next/head";
import { GetServerSideProps } from "next";
import fetch from "node-fetch";
import { PostData, BabyFoodData } from "types/types";
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PostListItem from "components/posts/PostListItem";
import { createCalendarArray } from "utils/createCalendarArray";
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import BabyFoodRegistrationModal from "components/calendar/BabyFoodRegistrationModal"
import { useState } from 'react'

type Props = {
  posts: PostData[];
  babyFoods: BabyFoodData[];
};

const thisMonth = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
};

export default function HomePage({ posts, babyFoods }: Props) {
  const year = dayjs().format('YYYY');
  const month = dayjs().format('M');
  const calendarArray = createCalendarArray(year, month);
  const isMobileAndTablet = useMediaQuery({ maxWidth: 1023 }); // xs and sm and md breakpoint
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // FullCalendarのdateClickイベントハンドラー
  const handleDateClick = (arg: DateClickArg) => {
    const isoDateString = arg.date.toISOString();
  setSelectedDate(isoDateString);
};

  // FullCalendarで使用するイベントオブジェクトの作成
  const calendarEvents = babyFoods.map((food) => ({
    title: food.meal_time,
    description: food.dish_name,
    date: food.meal_date,
    backgroundColor: "red",
    borderColor: "red",
    editable: true
  }));

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
        <Tabs className="container mx-auto py-8 px-3">
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
          {/* スマホとタブレットは縦に表示*/}
            {isMobileAndTablet && (
              <section className="container mx-auto">
                {/* 離乳食カレンダー */}
                <div className="flex flex-col items-center gap-1">
                  <BabyFoodRegistrationModal
                    open={isOpen}
                    closeTheModal={() => setIsOpen(false)}
                    calendarEvents={calendarEvents} // calendarEventsをpropsで渡す
                    selectedDate={selectedDate}
                  />

                  <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth" // ここをMonth or Weekに変更するだけで切り替わる
                    locales={allLocales}
                    locale="ja"
                    events={calendarEvents}
                    dateClick={(arg: DateClickArg) => {
                      setIsOpen(true);
                      handleDateClick(arg);
                    }}
                  />
                </div>

                <div className="flex flex-col items-center">
                  <h2 className="mt-5">投稿記事</h2>
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
              </section>
              )}

          {/* スマホとタブレット以外(PC等)の場合、水平にアイテムを表示 */}
            {!isMobileAndTablet && (
              <section className="container flex mx-auto">
                <div className="flex flex-col items-center">
                  <h2>投稿記事</h2>
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

                {/* 離乳食カレンダー */}
                <div className="flex flex-col items-center gap-1">
                  <BabyFoodRegistrationModal
                    open={isOpen}
                    closeTheModal={() => setIsOpen(false)}
                    calendarEvents={calendarEvents} // calendarEventsをpropsで渡す
                    selectedDate={selectedDate}
                  />

                  <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth" // ここをMonth or Weekに変更するだけで切り替わる
                    locales={allLocales}
                    locale="ja"
                    events={calendarEvents}
                    dateClick={(arg: DateClickArg) => {
                      setIsOpen(true);
                      handleDateClick(arg);
                    }}
                  />
                </div>
              </section>
              )}
        </Tabs>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const postRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/`);
  const babyFoodsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/baby_foods/`);

  let posts: PostData[] = [];
  let babyFoods: BabyFoodData[] = [];

  if (postRes.ok) {
    posts = (await postRes.json()) as PostData[];
  }
  if (babyFoodsRes.ok) {
    babyFoods = (await babyFoodsRes.json()) as BabyFoodData[];
  }

  postRes.headers.set(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  babyFoodsRes.headers.set(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return { props: { posts, babyFoods } };
};

