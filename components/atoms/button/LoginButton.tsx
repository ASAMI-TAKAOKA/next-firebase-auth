import Link from "next/link";

type Props = {
  onClick: () => void; // 関数型のプロパティ
};

const LoginButton = ({ onClick }: Props) => {
  return (
    <Link
      href="/login"
      onClick={onClick} // ハンバーガーメニューを閉じる関数を渡す
      className="block rounded-lg bg-pink-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring"
      type="button"
    >
      <span className="text-sm font-medium">ログイン </span>
    </Link>
  );
};

export default LoginButton;