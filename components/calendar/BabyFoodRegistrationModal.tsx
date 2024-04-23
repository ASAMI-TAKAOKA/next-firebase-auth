import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { BabyFoodInputs } from "types/types";
import Modal from 'react-modal';

type Props = {
  open: boolean;
  closeTheModal: () => void;
};

export default function BabyFoodRegistrationModal(props: Props) {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BabyFoodInputs>();

  const onSubmit: SubmitHandler<BabyFoodInputs> = async (babyFoodInputData) => {
    await createBabyFood(babyFoodInputData);
    props.closeTheModal(); // ボタン押下時にモーダルを閉じる
  };

  async function setConfig() {
    const token = await currentUser?.getIdToken();
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return config;
  }

  async function createBabyFood(babyFoodInputData: BabyFoodInputs) {
    const config = await setConfig();

    try {
      const response = await axios.post(
        "/baby_foods",
        { baby_food: babyFoodInputData },
        config
      );
      if (response.status === 200) {
        toast.success("離乳食の献立を登録しました!");
        router.push("/");
        return response.data;
      }
    } catch (err) {
      toast.error("登録失敗: 何らかの問題が発生しました。");
      let message;
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data.message);
      } else {
        message = String(err);
        console.error(message);
      }
    }
  }

  return props.open ? (
    <Modal
      isOpen={props.open}
      onRequestClose={props.closeTheModal}
      contentLabel="Baby Food Registration Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        content: {
          borderRadius: "12px",
          outline: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          padding: "20px",
          marginTop: "50px",
          marginBottom: "30px"
        }
      }}
    >
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <button
          onClick={props.closeTheModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 m-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap -m-2"
          >

            {/* Meal Category */}
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="meal_category"
                  className="leading-7 text-sm text-gray-600"
                >
                  Meal Category
                </label>
                <select
                  {...register("meal_category", { required: true })}
                  id="meal_category"
                  name="meal_category"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"
                >
                  <option value="break_fast">主食</option>
                  <option value="lunch">主菜</option>
                  <option value="dinner">副菜</option>
                  <option value="lunch">汁物</option>
                  <option value="dinner">その他</option>
                </select>
                {errors.meal_category &&
                  "Meal Category is required."}
              </div>
            </div>

            {/* Meal Time */}
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="meal_time"
                  className="leading-7 text-sm text-gray-600"
                >
                  Meal Time
                </label>
                <select
                  {...register("meal_time", { required: true })}
                  id="meal_time"
                  name="meal_time"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"
                >
                  <option value="break_fast">朝食</option>
                  <option value="lunch">昼食</option>
                  <option value="dinner">夕食</option>
                </select>
                {errors.meal_time &&
                  "Meal Time is required."}
              </div>
            </div>

            {/* Title */}
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
                  type="text"
                  id="title"
                  name="title"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.title &&
                  "Title is required and should be less than 60 characters."}
              </div>
            </div>

            {/* Body */}
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
                  id="body"
                  name="body"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
                {errors.body &&
                  "Body is required and should be less than 500 characters."}
              </div>
            </div>

            <div className="p-2 w-full">
              <button
                type="submit"
                className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
              >
                登録する
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  ) : null;
};