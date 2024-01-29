import React from "react";
import { PostData } from "types/types";
import PostListItem from "components/posts/PostListItem";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import Pagination from "components/layout/Pagination";
// TODO <Pagination posts={posts} />
// import styles from 'components/Pagination.module.scss';

type Props = {
  currentPosts: PostData[];
};

const PostList = (props: Props) => {
  const { currentPosts } = props;

  return (
    <>
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
            <Tab disabled>グッズ</Tab>
          </TabList>

          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {currentPosts?.map((post) => (
                  <PostListItem key={post.id} post={post} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {currentPosts?.filter(post => post.category === "house_work").map((post) => (
                  <PostListItem key={post.id} post={post} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {currentPosts?.filter(post => post.category === "money").map((post) => (
                  <PostListItem key={post.id} post={post} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {currentPosts?.filter(post => post.category === "baby_food").map((post) => (
                  <PostListItem key={post.id} post={post} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {currentPosts?.filter(post => post.category === "childbirth").map((post) => (
                  <PostListItem key={post.id} post={post} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {currentPosts?.filter(post => post.category === "breastfeeding").map((post) => (
                  <PostListItem key={post.id} post={post} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {currentPosts?.filter(post => post.category === "sleeping").map((post) => (
                  <PostListItem key={post.id} post={post} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
              <div className="divide-y-2 divide-gray-100">
                {/* カテゴリに合った記事だけを表示 */}
                {currentPosts?.filter(post => post.category === "goods").map((post) => (
                  <PostListItem key={post.id} post={post} />
                ))}
              </div>
            </div>
          </TabPanel>
        </Tabs>
        </div>
      </section>
    </>
  );
}
export default PostList;