import Head from "next/head";
import { GetServerSideProps, GetStaticPropsContext } from "next";
import { useEffect, useState } from "react";
import fetch from "node-fetch";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

import { PostData } from "types/types";
import { useAuthContext } from "context/AuthContext";
import postImage from "components/posts/postImage.png";

export type Props = {
  post: PostData;
};

export default function PostDetailPage({ post }: Props) {
  const { currentUser } = useAuthContext();
  const [isAuthor, setIsAuthor] = useState(false);
  const router = useRouter();
  const date = new Date(post.created_at);

  useEffect(() => {
    if (currentUser && currentUser.uid === post.user_uid) {
      setIsAuthor(true);
    }
  }, [currentUser]);

  const deletePost = async () => {
    const result = confirm("削除しますか？");
    if (result) {
      const token = await currentUser?.getIdToken();

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.delete(`/posts/${post.id}`, config);
        if (response.status === 200) {
          router.push("/");
        }
      } catch (err) {
        let message;
        if (axios.isAxiosError(err) && err.response) {
          console.error(err.response.data.message);
        } else {
          message = String(err);
          console.error(message);
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.body} />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <Image
              className="object-cover object-center rounded"
              alt="Post image"
              src={postImage}
            />
          </div>
          {/* 表示されない範囲 */}
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {post.title}
            </h1>
            <p className="mb-4"> {date.toDateString()}</p>

            <p className="mb-8 leading-relaxed ">{post.body}</p>
            <div className="flex justify-center">
              {isAuthor && (
                <Link
                  href={`/posts/${post.id}/edit`}
                  type="button"
                  className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg"
                >
                  編集
                </Link>
              )}
              {isAuthor && (
                <button
                  onClick={deletePost}
                  className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                >
                  削除
                </button>
              )}
            </div>
          </div>
          {/*  */}
        </div>
      </section>
    </>
  );
}

// Use Server-Side Rendering
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`);
  // const res = await fetch(`http://127.0.0.1:3001/api/v1/posts/${id}`);

  const post: PostData = (await res.json()) as any;

  res.headers.set(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return { props: { post } };
};
