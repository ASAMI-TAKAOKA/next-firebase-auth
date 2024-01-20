import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Head from "next/head";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PostInputs, PostData } from "types/types";
import { useAuthContext } from "context/AuthContext";

type Props = {
  postData?: PostData;
};

export default function PostForm(props: Props) {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  // if no post varaible passed in => add new post
  const post = props?.postData;
  const isAddMode = !post;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostInputs>();

  const onSubmit: SubmitHandler<PostInputs> = (postInputData) => {
    return isAddMode
      ? createPost(postInputData)
      : updatePost(post.id, postInputData);
  };

  async function setConfig() {
    const token = await currentUser?.getIdToken();
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return config;
  }

  async function createPost(postInputData: PostInputs) {
    const config = await setConfig();

    try {
      const response = await axios.post(
        "/posts",
        { post: postInputData },
        config
      );
      if (response.status === 200) {
        toast.success("投稿に成功しました!");
        router.push("/");
        return response.data;
      }
    } catch (err) {
      toast.error("投稿失敗: 何らかの問題が発生しました。");
      let message;
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data.message);
      } else {
        message = String(err);
        console.error(message);
      }
    }
  }

  async function updatePost(id: number, postInputData: PostInputs) {
    const config = await setConfig();

    try {
      const response = await axios.patch(
        `/posts/${id}`,
        { post: postInputData },
        config
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success("記事の更新に成功しました!");
        router.push(`/posts/${id.toString()}`);
        return response.data;
      }
    } catch (err) {
      toast.error("更新失敗: 何らかの問題が発生しました。");
      let message;
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data.message);
      } else {
        message = String(err);
        console.error(message);
      }
    }
  }

  return (
    <>
      <Head>
        <title>{post?.title || "Mom and Baby Help"}</title>
        <meta
          name="description"
          content={
            post?.body || "This is a sample app using firebase authenticate"
          }
        />
      </Head>
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap -m-2"
          >
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="title"
                  className="leading-7 text-sm text-gray-600"
                >
                  Title
                </label>
                <input
                  {...register("title", { required: true, maxLength: 60 })}
                  defaultValue={post?.title}
                  type="text"
                  id="title"
                  name="title"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.title &&
                  "Title is required and should be less than 60 characters."}
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="body"
                  className="leading-7 text-sm text-gray-600"
                >
                  Body
                </label>
                <textarea
                  {...register("body", { required: true, maxLength: 500 })}
                  defaultValue={post?.body}
                  id="body"
                  name="body"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
                {errors.body &&
                  "Body is required and should be less than 500 characters."}
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="category"
                  className="leading-7 text-sm text-gray-600"
                >
                  Category
                </label>
                <select
                  {...register("category", { required: true })}
                  defaultValue={post?.category}
                  id="category"
                  name="category"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"
                >
                  <option value="house_work">家事</option>
                  <option value="money">お金</option>
                  <option value="baby_food">離乳食</option>
                  <option value="childbirth">出産</option>
                  <option value="breastfeeding">授乳</option>
                  <option value="sleeping">ねんね</option>
                  <option value="goods">グッズ</option>
                </select>
                {errors.category &&
                  "Category is required."}
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                type="submit"
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                {isAddMode ? "投稿する" : "更新する"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}