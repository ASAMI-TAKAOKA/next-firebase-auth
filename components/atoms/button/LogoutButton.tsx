type Props = {
  onLogout: () => Promise<void>;
};

const LogoutButton = ({ onLogout }: Props) => {
  return (
    <button
      onClick={onLogout}
      className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
      type="button"
    >
      <span className="text-sm font-medium">ログアウト </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-2"
      >
        <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
      </svg>
    </button>
  );
};

export default LogoutButton;