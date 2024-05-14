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
  calendarEvents: { title: string; description: string; date: string; editable: boolean }[];
  selectedDate: string | null; // nullを許容するように修正
};

export default function BabyFoodUpdateModal(props: Props) {
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
    // Add selectedDate as meal_date to babyFoodInputData
    babyFoodInputData.meal_date = props.selectedDate || "";;

    try {
      const response = await axios.put(
        "/baby_foods",
        { baby_food: babyFoodInputData },
        config
      );
      if (response.status === 200) {
        toast.success("離乳食の献立を更新しました!");
        router.push("/");
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

  return props.open ? (
    <Modal
      isOpen={props.open}
      onRequestClose={props.closeTheModal}
      contentLabel="Baby Food Update Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000 // Set a higher z-index
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
                <div>
                  <label className="inline-flex items-center">
                    <input
                      {...register("meal_category", { required: true })}
                      type="radio"
                      value="main_dish"
                      className="form-radio h-5 w-5 text-pink-600"
                      onChange={(e) => console.log("ラジオボタンで選択した値:", e.target.value)}
                    />
                    <span className="ml-2">主食</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      {...register("meal_category", { required: true })}
                      type="radio"
                      value="main_course"
                      className="form-radio h-5 w-5 text-pink-600"
                      onChange={(e) => console.log("ラジオボタンで選択した値:", e.target.value)}
                    />
                    <span className="ml-2">主菜</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      {...register("meal_category", { required: true })}
                      type="radio"
                      value="side_dish"
                      className="form-radio h-5 w-5 text-pink-600"
                      onChange={(e) => console.log("選択した:", e.target.value)}
                    />
                    <span className="ml-2">副菜</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      {...register("meal_category", { required: true })}
                      type="radio"
                      value="soup"
                      className="form-radio h-5 w-5 text-pink-600"
                      onChange={(e) => console.log("選択した値:", e.target.value)}
                    />
                    <span className="ml-2">汁物</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      {...register("meal_category", { required: true })}
                      type="radio"
                      value="other"
                      className="form-radio h-5 w-5 text-pink-600"
                      onChange={(e) => console.log("ラジオボタン選択した値:", e.target.value)}
                    />
                    <span className="ml-2">その他</span>
                  </label>
                </div>
                {errors.meal_category &&
                  <span className="text-red-500">Meal Category is required.</span>}
              </div>
            </div>

            {/* Dish Name */}
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="dish_name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Dish Name
                </label>
                <input
                  {...register("dish_name", { required: true, maxLength: 60 })}
                  type="text"
                  id="dish_name"
                  name="dish_name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={props.calendarEvents[0]?.title ?? ""}
                />
                {errors.dish_name &&
                  "Dish Name is required and should be less than 60 characters."}
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
                  value={props.calendarEvents[0]?.description ?? ""}
                >
                  <option value="break_fast">朝食</option>
                  <option value="lunch">昼食</option>
                  <option value="dinner">夕食</option>
                </select>
                {errors.meal_time &&
                  "Meal Time is required."}
              </div>
            </div>

            {/* URL(任意) */}
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="url"
                  className="leading-7 text-sm text-gray-600"
                >
                  URL
                </label>
                <input
                  {...register("url", { required: false })}
                  type="url"
                  id="url"
                  name="url"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            {/* Memo(任意) */}
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="memo"
                  className="leading-7 text-sm text-gray-600"
                >
                  メモ
                </label>
                <input
                  {...register("memo", { required: false })}
                  type="text"
                  id="memo"
                  name="memo"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            {/* 登録ボタン */}
            <div className="p-2 w-full">
              <button
                type="submit"
                className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-md"
              >
                こんだてを登録
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  ) : null;
};