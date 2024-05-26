import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { BabyFoodInputs } from "types/types";
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import Link from "next/link";

type Props = {
  open: boolean;
  closeTheModal: () => void;
  selectedEventId: string;
};

export default function BabyFoodUpdateModal(props: Props) {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  const [selectedEventData, setSelectedEventData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<BabyFoodInputs>();

  const MEAL_CATEGORIES = [
    { value: "main_dish", label: "主食" },
    { value: "main_course", label: "主菜" },
    { value: "side_dish", label: "副菜" },
    { value: "soup", label: "汁物" },
    { value: "other", label: "その他" }
  ];
  const [selectedRadioBtnValue, setSelectedRadioBtnValue] = useState<string>('');
  const onRadioBtnChanged = (e: React.ChangeEvent<HTMLInputElement>) => setSelectedRadioBtnValue(e.target.value);

  useEffect(() => {
    const fetchData = async () => {
      const token = await currentUser?.getIdToken();
      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.get(`/baby_foods/${props.selectedEventId}`, config);
        setSelectedEventData(response.data); // nullから更新する
        setSelectedRadioBtnValue(response.data.meal_category); // ラジオボタンの値を""から更新する
        // resetはAPIから取得したデータを使ってフォームの初期値を設定するために使用。
        // これを使わないと初期値が""の状態として読み込まれてしまい、dish_name入力フォームで「入力必須です」エラーが発生してしまう
        reset({
        meal_category: response.data.meal_category,
        dish_name: response.data.dish_name,
        meal_time: response.data.meal_time,
        url: response.data.url,
        memo: response.data.memo
      });
      // resetの直後にconsole.logを使用して値を確認しても、
      // Reactの状態更新が非同期の状態更新のため、
      // 値がすぐには反映されない...(単純に反映までに時間がかかる)
      // console.log(selectedEventData);
      // console.log(selectedRadioBtnValue);
      } catch (err) {
        console.error('Failed to fetch event data:', err);
      }
    };

    if (props.open && props.selectedEventId) {
      fetchData();
    }
  }, [props.open, props.selectedEventId, currentUser]);

  const onSubmit: SubmitHandler<BabyFoodInputs> = async (babyFoodInputData) => {
    await updateBabyFood(props.selectedEventId, babyFoodInputData);
    props.closeTheModal(); // ボタン押下時にモーダルを閉じる
  };

  async function setConfig() {
    const token = await currentUser?.getIdToken();
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return config;
  }

  async function updateBabyFood(id: string, babyFoodInputData: BabyFoodInputs) {
    const config = await setConfig();

    try {
      const response = await axios.put(
        `/baby_foods/${props.selectedEventId}`, // URLにcalendarのidパラメータを追加
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

  const deleteBabyFood = async () => {
    const result = confirm("削除しますか？");
    if (result) {
      const token = await currentUser?.getIdToken();

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.delete(
          `/baby_foods/${props.selectedEventId}`,
          config
        );
        if (response.status === 200) {
          toast.success("離乳食の献立を削除しました!");
          props.closeTheModal(); // ボタン押下時にモーダルを閉じる
          router.push("/");
        }
      } catch (err) {
        toast.error("削除失敗: 何らかの問題が発生しました。");
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
      {/* <p>選択されたラジオボタン：{selectedRadioBtnValue}</p> */}
      {/* 参考: https://web-engineer-wiki.com/javascript/react/radio-btn/#index_id2  */}
            {/* Meal Category */}
            <div className="p-2 w-full">
              <div className="relative">
                <div>
                  {MEAL_CATEGORIES.map((mealCategory) => (
                    <label key={mealCategory.value} className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        value={mealCategory.value}
                        className="form-radio h-5 w-5 text-pink-600"
                        name="meal_category"
                        onChange={onRadioBtnChanged}
                        checked={mealCategory.value === selectedRadioBtnValue}
                      />
                      {mealCategory.label}
                    </label>
                  ))}
                </div>
                {errors.meal_category &&
                  <p className="text-red-500">Meal Category is required.</p>}
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
                  defaultValue={selectedEventData?.dish_name || ""}
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
                  defaultValue={selectedEventData?.meal_time || ""}
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
                  {...register("url", {
                    required: false,
                    maxLength: 500,
                    pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                  })}
                  type="url"
                  id="url"
                  name="url"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"
                  defaultValue={selectedEventData?.url || ""}
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
                  defaultValue={selectedEventData?.memo || ""}
                />
              </div>
            </div>

            <div className="flex justify-between p-2 w-1/2">
              <button
                type="submit"
                className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-md"
              >
                こんだてを更新
              </button>
              <button
                type="button"
                onClick={deleteBabyFood}
                className="text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-md"
              >
                削除
              </button>
            </div>


          </form>
        </div>
      </div>
    </Modal>
  ) : null;
};