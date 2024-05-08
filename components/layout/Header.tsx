import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

import LoginButton from "../atoms/button/LoginButton";
import LogoutButton from "../atoms/button/LogoutButton";
import { useAuthContext } from "context/AuthContext";

const Header = () => {
  const { currentUser, loading, logout } = useAuthContext();
  const userPhotoUrl = currentUser?.photoURL;
  const [hamburgerMenuIsOpen, setHamburgerMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setHamburgerMenuOpen(!hamburgerMenuIsOpen);
  };

  useEffect(() => {
    if (!loading && !currentUser) {
      Router.push("/");
    }
  }, [currentUser, loading]);

  const logoutHandler = async () => {
    await logout();
    toast.success("ログアウトしました。");
  };

  return (
    <header className="container flex items-center justify-between mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="text-center sm:text-left hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
      >
        <h1 className="text-4xl font-medium text-pink-400">Mom and Baby Help</h1>
      </Link>
      <nav
        className={
          hamburgerMenuIsOpen
            ? "z-40 bg-blue-100 fixed top-0 right-0 bottom-0 left-0 h-screen flex flex-col"
            : "fixed right-[-100%] lg:right-4 "
        }
      >
        <ul
          className={
            hamburgerMenuIsOpen
              ? "flex h-screen justify-center items-center flex-col gap-6 text-xl"
              : "block md:flex md:gap-8"
          }
        >
        {!hamburgerMenuIsOpen && (
          <li>
            {userPhotoUrl && (
              <Image
                src={userPhotoUrl}
                alt="User photo"
                referrerPolicy="no-referrer"
                width={24}
                height={24}
                className="h-10 w-10 rounded-full object-cover md:block"
              />
            )}
          </li>
        )}
          <li>
            {currentUser && (
              <Link
                onClick={() => setHamburgerMenuOpen(false)}
                href="/posts/new"
                className="block rounded-lg bg-pink-400 px-5 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring"
                type="button"
              >
                新規投稿する
              </Link>
            )}
          </li>
            {currentUser && (
              <Link
                onClick={() => setHamburgerMenuOpen(false)}
                href="/"
                className="block rounded-lg bg-pink-400 px-5 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring"
                type="button"
              >
                記事を探す
              </Link>
            )}
          <li>
            {currentUser ? (
              <LogoutButton onLogout={logoutHandler} />
            ) : (
              <LoginButton onClick={() => setHamburgerMenuOpen(false)} />
            )}
          </li>
        </ul>
      </nav>
      <button
        className="z-50 space-y-2 lg:hidden"
        onClick={handleMenuToggle}
      >
        <span
          className={
            hamburgerMenuIsOpen
              ? "block w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 duration-300"
              : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
        <span
          className={
            hamburgerMenuIsOpen ? "block opacity-0 duration-300" : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
        <span
          className={
            hamburgerMenuIsOpen
              ? "block w-8 h-0.5 bg-gray-600 -rotate-45 duration-300"
              : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
      </button>
    </header>
  );
};

export default Header;