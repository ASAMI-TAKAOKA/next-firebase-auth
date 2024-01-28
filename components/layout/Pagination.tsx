import PostList from "components/posts/PostList";
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { PostData } from "types/types";
import styles from 'components/layout/Pagination.module.scss';

type Props = {
  posts: PostData[];
};

const Pagination = (props: Props) => {
  const { posts } = props;
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 5; // 1ページに何個表示するのか
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [itemOffset, setItemOffset] = useState(0); // itemOffsetは配列の0番目の要素
  const endOffset = itemOffset + itemsPerPage; // endOffsetは配列の5番目の要素
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentPosts(posts.slice(itemOffset, endOffset));
    // postsが存在する場合に計算を行う
    if (posts.length > 0) {
      setPageCount(Math.ceil(posts.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, posts]);

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % posts.length;
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  

  return (
    <>
      <section>
        <div>
          <PostList
            currentPosts={currentPosts}
          />
        {/* TODO: styles.paginationの@import "bootstrap";の部分が適用されない */}
        {/* <div className={`${styles['pagination']} px-40`}> */}
        <div className={styles.pagination}>
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
            marginPagesDisplayed={2} //先頭と末尾に表示するページの数。今回は2としたので1,2…今いるページの前後…後ろから2番目, 1番目 のように表示されます。
            pageRangeDisplayed={5} //上記の「今いるページの前後」の番号をいくつ表示させるかを決めます。
            containerClassName='pagination' //ページネーションリンクの親要素のクラス名
            pageClassName='page-item' //各子要素(li要素)のクラス名
            pageLinkClassName='page-link' //ページネーションのリンクのクラス名
            activeClassName='active' //今いるページ番号のクラス名。今いるページの番号だけ太字にしたりできます 
            previousLabel='<' //前のページ番号に戻すリンクのテキスト
            nextLabel='>' //次のページに進むボタンのテキスト
            previousClassName='page-item' // '<'の親要素(li)のクラス名
            nextClassName='page-item' //'>'の親要素(li)のクラス名
            previousLinkClassName='page-link'  //'<'のリンクのクラス名
            nextLinkClassName='page-link' //'>'のリンクのクラス名
            disabledClassName='disabled' //先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくするためのクラス
            breakLabel='...' // ページがたくさんあるときに表示しない番号に当たる部分をどう表示するか
            breakClassName='page-item' // 上記の「…」のクラス名
            breakLinkClassName='page-link' // 「…」の中のリンクにつけるクラス
            renderOnZeroPageCount={null}
          />
        </div>
        </div>
      </section>
    </>
  );
}
export default Pagination;
