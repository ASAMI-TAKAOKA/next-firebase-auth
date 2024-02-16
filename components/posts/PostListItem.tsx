import Link from "next/link";
import { PostData } from "types/types";
import { useState } from "react";
import { HiOutlineChatAlt } from "react-icons/hi";

type Props = {
  post: PostData;
};

const PostListItem = ({ post }: Props) => {
  const date = new Date(post.created_at);
  const [isHovered, setIsHovered] = useState(false);

  // 任意のフォーマットで日付を表示する関数
  const formatDate = (date: { getFullYear: () => number; getMonth: () => number; getDate: () => number; }) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  };

// 15文字以上の場合に16文字目以降を省略して「...」を表示する関数
const formatBody = (body: string) => {
  if (body.length > 15) {
    return body.slice(0, 15) + "...";
  }
  return body;
};

  return (
    <div
    className={`bg-red-50 py-8 px-10 my-6 xs:mx-0 sm:mx-0 md:mx-0 lg:mx-72 rounded-lg${
      isHovered ? "cursor-pointer" : ""
      }`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className="md:w-64 md:mb-0 mb-6">
        <span className="mt-1 text-gray-500 text-sm">
          {formatDate(date)}
        </span>
      </div>
      {/* TODO: レスポンシブにするためにあとでclassを追加 */}
      <div className="">
        <Link href={`/posts/${encodeURIComponent(post.id)}`} legacyBehavior>
          <a className={`text-2xl font-medium text-gray-600 title-font mb-2 md:mb-0 ${isHovered ? "underline" : ""}`}>
            {post.title}
          </a>
        </Link>
        <p className="leading-relaxed text-gray-600">{formatBody(post.body)}</p>
        {/* コメント用のアイコン */}
        <Link href={`/posts/${encodeURIComponent(post.id)}`} legacyBehavior>
          <a>
            <button
              className="w-6 h-10 text-gray-600 focus:outline-none hover:bg-gray-300"
            >
              <HiOutlineChatAlt size={24}/>
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
