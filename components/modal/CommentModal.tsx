import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "context/AuthContext";
import { CommentInputs } from "types/types";
import { CommentData } from "types/types";

type Props = {
  postId: number;
  onClose: () => void;
  onCommentAdd: (comment: CommentData) => void; // コメントが追加されたときのコールバック関数。
};

export default function CommentModal(props: Props) {

  const { currentUser } = useAuthContext();
  const postId = props?.postId;
  const onClose = props?.onClose;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset // フォームをリセットする関数
  } = useForm<CommentInputs>();

  const setConfig = async () => {
    const token = await currentUser?.getIdToken();
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return config;
  };

  // onSubmit関数はonCommentAdd関数の高階関数なので、
  // onSubmit関数はonCommentAdd関数を引数として(ここではpropsとして)受け取って実行し、親コンポーネントに通知している
  const onSubmit: SubmitHandler<CommentInputs> = async (commentInputData) => {
    // 送信ボタン押下時consoleにこのログが表示される場合、onSubmit関数が機能していることが分かる
    console.log("Form Submitted with data:", commentInputData);

    const config = await setConfig();

    try {
      const response = await axios.post(
        `posts/${postId}/comments`,
        {
          comment_content: commentInputData.content,
          post_id: postId,
        },
        config
      );

      if (response.status === 200) {
        toast.success("コメントが追加されました！");
        console.log(response)
        console.log(response.data)
        console.log(response.data.comment_content)
        onClose();

        props.onCommentAdd(response.data); // 親コンポーネントにコメント追加を通知
        reset();
      }
    } catch (err) {
      toast.error("コメントの追加に失敗しました。");
      console.error(err);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-4">コメントを追加する</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="comment_content" className="block text-sm font-medium text-gray-600">
              コメント内容
            </label>
            <textarea
              {...register("content", { required: true })}
              id="content"
              name="content"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              rows={3}
            ></textarea>
            {errors.content && <p className="text-red-500">コメント内容は必須です。</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 mr-2 text-sm font-medium text-gray-500"
              onClick={onClose}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md"
            >
              送信
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};