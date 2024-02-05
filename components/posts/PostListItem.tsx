import Link from "next/link";
import { PostData } from "types/types";
import { useState } from "react";

type Props = {
  post: PostData;
};

const PostListItem = ({ post }: Props) => {
  const date = new Date(post.created_at);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
    className={`sm:bg-red-50 md:bg-red-50 lg:bg-red-50 xl:bg-red-50 2xl:bg-red-50 py-8 my-6 px-8 flex flex-wrap md:flex-nowrap ${
      isHovered ? "cursor-pointer" : ""
      }`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="mt-1 text-gray-500 text-sm">
          {date.toDateString()}
        </span>
      </div>
      <div className="md:flex-grow">
        <Link href={`/posts/${encodeURIComponent(post.id)}`} legacyBehavior>
          <a className={`text-2xl font-medium text-gray-800 title-font mb-2 ${isHovered ? "underline" : ""}`}>
            {post.title}
          </a>
        </Link>
        <p className="leading-relaxed">{post.body}</p>
      </div>
    </div>
  );
};

export default PostListItem;
