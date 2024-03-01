import { useState, useEffect } from 'react';
import { PostData, CommentData } from "types/types";
import CommentModal from "components/modal/CommentModal";
import axios from "axios";
import Link from "next/link";
import { HiOutlineChatAlt } from "react-icons/hi";

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

  const [comments, setComments] = useState<CommentData>();

  const fetchComments = async () => {
    try {
      const response = await axios.get(`posts/${post.id}/comments`);
      setComments(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post.id]); // post.idが変更されたときにコメント一覧を再取得

  // isModalOpenというstateを使用し、コメントモーダルが開いているかどうかを管理
  // isModalOpenのデフォルトはfalse
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      {post.comments ? (
        <>
          {/* コメント用のアイコン */}
          <Link href={`/posts/${encodeURIComponent(post.id)}`} legacyBehavior>
            <a className="flex items-center" onClick={handleOpenModal}>
              <HiOutlineChatAlt className="w-6 h-6 text-gray-600" size={24} />
              <span className="text-gray-600 ml-1 hover:bg-gray-300">コメントする</span>
            </a>
          </Link>
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
            {isModalOpen &&<CommentModal postId={post.id} onClose={handleCloseModal} />}
          </div>
        </>
      ) : (
        <p>そのIDの記事は存在しません。</p>
      )}
    </section>
  );
};

export default CommentIndex;

