import Link from "next/link";
import { PostData } from "types/types";
import { useState } from "react";
import { HiOutlineChatAlt } from "react-icons/hi"; // Tailwind CSSのアイコンをインポート

type Props = {
  post: PostData;
};

const PostListItem = ({ post }: Props) => {
  const date = new Date(post.created_at);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-red-50 py-8 my-6 px-8 md:px-12 flex flex-col md:flex-row md:flex-nowrap rounded-lg${
        isHovered ? " cursor-pointer" : ""
      }`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="mt-1 text-gray-500 text-sm">
          {date.toDateString()}
        </span>
      </div>
      <div className="md:flex-grow flex flex-col md:flex-row w-full md:w-auto">
        <Link href={`/posts/${encodeURIComponent(post.id)}`} legacyBehavior>
          <a className={`text-2xl font-medium text-gray-600 title-font mb-2 md:mb-0 ${isHovered ? "underline" : ""}`}>
            {post.title}
          </a>
        </Link>
        <p className="leading-relaxed text-gray-600">{post.body}</p>
      </div>
      {/* コメント用のアイコン */}
      <Link href={`/posts/${encodeURIComponent(post.id)}`} legacyBehavior>
        <a>
          <button
            className="inline-flex items-center justify-center w-10 h-10 text-gray-600 focus:outline-none hover:bg-gray-300"
          >
            <HiOutlineChatAlt size={24}/>
          </button>
        </a>
      </Link>
    </div>
  );
};

export default PostListItem;
