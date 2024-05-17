import Head from "next/head";
import { GetServerSideProps } from "next";
import fetch from "node-fetch";
import { PostData, BabyFoodData } from "types/types";
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PostListItem from "components/posts/PostListItem";
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import BabyFoodRegistrationModal from "components/calendar/BabyFoodRegistrationModal"
import { useState, useEffect } from 'react'
import { useAuthContext } from 'context/AuthContext';
import BabyFoodUpdateModal from "components/calendar/BabyFoodUpdateModal";

type Props = {
  posts: PostData[];
  babyFoods: BabyFoodData[];
};

export default function HomePage({ posts: initialPosts, babyFoods: initialBabyFoods }: Props) {
  const isMobileAndTablet = useMediaQuery({ maxWidth: 1023 }); // xs and sm and md breakpoint
  const [babyFoodRegistrationModalIsOpen, setBabyFoodRegistrationModalIsOpen] = useState(false);
  const [babyFoodUpdateModalIsOpen, setBabyFoodUpdateModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<{ id: string; title: string; description: string; date: string } | null>(null);
  const {currentUser} = useAuthContext();
  const [posts, setPosts] = useState(initialPosts);
  const [babyFoods, setBabyFoods] = useState(initialBabyFoods);

  useEffect(() => {
    console.log('HomePageがマウントされました');
    const fetchBabyFoods = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/baby_foods/`);
      if (response.ok) {
        const data = (await response.json()) as BabyFoodData[];
        setBabyFoods(data);
      }
    };

    const fetchPosts = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/`);
      if (response.ok) {
        const data = (await response.json()) as PostData[];
        setPosts(data);
      }
    };

    if (babyFoodRegistrationModalIsOpen === false && babyFoodUpdateModalIsOpen === false) {
      fetchBabyFoods();
    }
    fetchPosts();

  }, [babyFoodRegistrationModalIsOpen, babyFoodUpdateModalIsOpen]);

  const handleDateClick = (arg: DateClickArg) => {
    if (arg.date) {
      const year = arg.date.getFullYear();
      const month = arg.date.getMonth() + 1;
      const day = arg.date.getDate();
      const isoDateString = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      setSelectedDate(isoDateString);
    }
  };

  const handleEventClick = (arg: EventClickArg) => {
    if (arg.event) {
      const clickedDate = dayjs(arg.event.startStr).format('YYYY-MM-DD'); // クリックしたイベントの日付
      const clickedEvent = calendarEvents.find(event => event.date === clickedDate && event.title === arg.event.title); // calendarEventsのdateとclickedDateが同じ かつ calendarEventsのtitleとクリックしたtitleが同じデータを、clickedEventとする
      if (clickedEvent) {
        setSelectedEvent(clickedEvent);
        setBabyFoodUpdateModalIsOpen(true);
      }
    }
  };

  const calendarEvents = babyFoods
  .sort((a, b) => {
    // meal_dateの昇順でソート
    if (a.meal_date < b.meal_date) return -1;
    if (a.meal_date > b.meal_date) return 1;

    // meal_timeの優先順位を付けてソート
    const mealTimeOrder: Record<string, number> = { "break_fast": 1, "lunch": 2, "dinner": 3 };
    if (mealTimeOrder[a.meal_time] < mealTimeOrder[b.meal_time]) return -1;
    if (mealTimeOrder[a.meal_time] > mealTimeOrder[b.meal_time]) return 1;

    // meal_categoryの優先順位を付けてソート
    const mealCategoryOrder: Record<string, number> = { "main_dish": 1, "main_course": 2, "side_dish": 3, "soup": 4, "other": 5 };
    return mealCategoryOrder[a.meal_category] - mealCategoryOrder[b.meal_category];
  })
  .map((food) => ({
    id: String(food.id),
    title: food.dish_name,
    description: food.meal_time,
    date: food.meal_date,
    backgroundColor: "#FF99FF",
    borderColor: "#FF99FF",
    editable: false
  }));

  const closeBabyFoodRegistrationModal = () => {
    setBabyFoodRegistrationModalIsOpen(false);
    setSelectedDate(null);
  };

  const closeBabyFoodUpdateModal = () => {
    setBabyFoodUpdateModalIsOpen(false);
    setSelectedEvent(null);
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
      <section>
        {/* 投稿記事一覧 */}
        <Tabs className="container mx-auto py-8 px-3">
          <TabList>
            <Tab>全ての投稿</Tab>
            <Tab>家事</Tab>
            <Tab>仕事</Tab>
            <Tab>お金</Tab>
            <Tab>人間関係</Tab>
            <Tab>お出かけ</Tab>
            <Tab>健康</Tab>
            <Tab>発達</Tab>
            <Tab>離乳食</Tab>
            <Tab>出産</Tab>
            <Tab>授乳</Tab>
            <Tab>ねんね</Tab>
            <Tab>グッズ</Tab>
          </TabList>
          {/* スマホとタブレットかつログイン済みの場合、縦に表示*/}
            {isMobileAndTablet && currentUser && (
              <section className="container mx-auto">
                {/* 離乳食カレンダー */}
                <div className="flex flex-col items-center gap-1">
                  {/* 登録モーダル */}
                  {selectedDate && (
                    <BabyFoodRegistrationModal
                      open={babyFoodRegistrationModalIsOpen}
                      closeTheModal={closeBabyFoodRegistrationModal}
                      selectedDate={selectedDate}
                    />
                  )}
                  {/* 更新モーダル */}
                  {selectedEvent && (
                    <BabyFoodUpdateModal
                      open={babyFoodUpdateModalIsOpen}
                      closeTheModal={closeBabyFoodUpdateModal}
                      selectedEvent={selectedEvent}
                    />
                  )}

                  <h2 className="text-center">離乳食カレンダー</h2>
                  <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth" // ここをMonth or Weekに変更するだけで切り替わる
                    locales={allLocales}
                    locale="ja"
                    events={calendarEvents}
                    eventClick={handleEventClick}
                    dateClick={(arg: DateClickArg) => {
                      setBabyFoodRegistrationModalIsOpen(true);
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
                  {["house_work", "work", "money", "human_relations", "outing_with_baby", "health", "developmental", "baby_food", "childbirth", "breastfeeding", "sleeping", "goods"].map((category, index) => (
                    <TabPanel key={index}>
                      {posts?.filter(post => post.category === category).map((post) => (
                        <PostListItem key={post.id} post={post} />
                      ))}
                    </TabPanel>
                  ))}
                </div>
              </section>
            )}

          {/* スマホとタブレット以外(PC等)かつログイン済みの場合、水平にアイテムを表示 */}
            {!isMobileAndTablet && currentUser && (
              <section className="container flex">
              <div className="w-1/3">
                {/* 投稿記事一覧 */}
                <div>
                  <h2 className="text-center">投稿記事</h2>
                  <TabPanel>
                    {posts?.map((post) => (
                      <PostListItem key={post.id} post={post} />
                    ))}
                  </TabPanel>
                  {/* カテゴリに合った記事だけを表示 */}
                  {["house_work", "work", "money", "human_relations", "outing_with_baby", "health", "developmental", "baby_food", "childbirth", "breastfeeding", "sleeping", "goods"].map((category, index) => (
                    <TabPanel key={index}>
                      {posts?.filter(post => post.category === category).map((post) => (
                        <PostListItem key={post.id} post={post} />
                      ))}
                    </TabPanel>
                  ))}
                </div>
              </div>

              <div className="w-2/3">
                {/* 離乳食カレンダー */}
                <div className="">
                  {/* 登録モーダル */}
                  {selectedDate && (
                    <BabyFoodRegistrationModal
                      open={babyFoodRegistrationModalIsOpen}
                      closeTheModal={closeBabyFoodRegistrationModal}
                      selectedDate={selectedDate}
                    />
                  )}
                  {/* 更新モーダル */}
                  {selectedEvent && (
                    <BabyFoodUpdateModal
                      open={babyFoodUpdateModalIsOpen}
                      closeTheModal={closeBabyFoodUpdateModal}
                      selectedEvent={selectedEvent}
                    />
                  )}

                  <h2 className="text-center">離乳食カレンダー</h2>
                  <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth" // ここをMonth or Weekに変更するだけで切り替わる
                    locales={allLocales}
                    locale="ja"
                    events={calendarEvents}
                    eventClick={handleEventClick}
                    dateClick={(arg: DateClickArg) => {
                      setBabyFoodRegistrationModalIsOpen(true);
                      handleDateClick(arg);
                    }}
                  />
                </div>
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

