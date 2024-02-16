import { PostData } from "types/types";

type Props = {
  post: PostData;
}; 

// コメントを表示するコンポーネント
const CommentIndex = ({ post }: Props) => {

  // 任意のフォーマットで日付を表示する関数
  const formatDate = (date: { getFullYear: () => number; getMonth: () => number; getDate: () => number; }) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  };

  return (
    <section>
      <div>
        コメント一覧
      </div>
      <div className="bg-red-50 py-8 px-10 my-6 mx-auto rounded-lg">
        {post.comments.map((comment) => {
          const date = new Date(comment.created_at);
          return (
            <div key={comment.id} className="mb-4">
              <span className="text-gray-500 text-sm">
                {formatDate(date)}
              </span>
              <p className="leading-relaxed text-gray-600">{comment.comment_content}</p>
            </div>
          );
        })}
      </div>
    </section>

  );
};

export default CommentIndex;

