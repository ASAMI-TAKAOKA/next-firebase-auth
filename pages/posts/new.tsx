import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { useAuthContext } from "context/AuthContext";
import PostForm from "components/posts/PostForm";

export default function NewPostPage() {
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  // loadingとcurrentUserの変更を監視し、ログインしていない場合はリダイレクトする
  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [loading, currentUser]);

  return (
    <>
      <PostForm />
    </>
  );
}