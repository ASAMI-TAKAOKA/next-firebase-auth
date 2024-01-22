import Link from "next/link";

const LoginButton = () => {
  return (
    <Link
      href="/login"
      className="block rounded-lg bg-pink-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring"
      type="button"
    >
      <span className="text-sm font-medium">ログイン </span>
    </Link>
  );
};

export default LoginButton;