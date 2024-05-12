# Mom and Baby Help

![スクリーンショット 2024-05-12 17 58 53](https://github.com/ASAMI-TAKAOKA/next-firebase-auth/assets/77926245/a02c73f2-d1eb-4f06-acf0-24a1d10ae9e0)


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

# メイン機能の使い方


# 使用技術・環境
- フロントエンド
  - TypeScript 5.2.2
  - React 18.2.37
  - Next.js 14.0.1
  - Tailwind CSS 3.5.5
  - ESLint 8.53.0

- バックエンド
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

 
# ER図
<div align="center">
<img width="1014" alt="ER" src="https://user-images.githubusercontent.com/77926245/126564786-432d0b39-66f7-4632-b7e9-5afa67e4d26f.png">
</div>

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

# 今後の実装予定
- 離乳食のメニューごとの集計機能の完成
- 検索フォームの追加
- 記事のカテゴリ追加
- 離乳食カレンダーの日付表示時のアラートにURLやメモも表示させたい



