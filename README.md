# Mom and Baby Help

![スクリーンショット 2024-05-12 23 38 00](https://github.com/ASAMI-TAKAOKA/next-firebase-auth/assets/77926245/209c040f-bb2f-4c32-8eb3-403b60af3103)



# サービス概要
育児サポートアプリです。  
機能は主に3つです。  
1. 育児に関する記事投稿、コメント投稿機能
2. 離乳食の献立のカレンダー登録機能
3. 離乳食のメニューごとの集計機能（制作中）

# 目的
育児サポート系のアプリは既にたくさん存在しており、私自身も活用してきました。  
しかし、その中で「こんな機能があったらもっと助かるのにな」と思う点がいくつかあり、技術力の向上にもつながることから、  
それらを解決できるアプリの開発を進めてきました。

# URL
https://mom-and-baby-help.com/

# 使用技術・環境
- フロントエンド
  - TypeScript 5.2.2
  - React 18.2.37
  - Next.js 14.0.1
  - Tailwind CSS 3.5.5
  - ESLint 8.53.0

- バックエンド
  - [バックエンドのGithub リポジトリはこちら](https://github.com/ASAMI-TAKAOKA/rails-firebase-auth)
  - Rails 7.1.1
  - Ruby 3.1.4

- 認証
  - Firebase Authentication(V9) - Google ログイン

- 本番環境
  - フロントエンド
    - Vercel
  - バックエンド
    - Render
  - DB
    - PostgreSQL 13.6

- 開発環境
  - フロントエンド
    - VScode
  - バックエンド
    - VScode
  - DB
    - sqlite3

- バージョン管理
  - Git/GitHub

# 機能
- Googleアカウントを利用したユーザーログイン機能
- 投稿記事のデータ取得 / 作成 / 更新 / 削除機能
- 離乳食のデータ取得 / 作成機能
- カレンダー機能
- 離乳食のメニューごとの集計機能

# 画面
トースト表示  
モーダル画面  
レスポンシブデザイン  
シンプルなUI/UXデザイン  

# ER図
<img src="https://github.com/ASAMI-TAKAOKA/next-firebase-auth/assets/77926245/d1ecbb8b-7aaa-44b1-b079-8a23c0a24d7f" width="50%" />

# 今後の実装予定
- 離乳食のメニューごとの集計機能の完成
- 検索フォームの追加
- 離乳食カレンダーの日付表示時のアラートにURLやメモも表示させたい



