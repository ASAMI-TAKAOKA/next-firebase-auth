import PostList from "components/posts/PostList";
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { PostData } from "types/types";
// import styles from 'components/Pagination.module.scss';

type Props = {
  posts: PostData[];
};

const Pagination = (props: Props) => {
  const { posts } = props;

  const itemsPerPage = 5; // 1ページに何個表示するのか

  // itemOffsetは配列の0番目の要素
  const [itemOffset, setItemOffset] = useState(0);

  // endOffsetは配列の5番目の要素
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentPosts = posts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(posts.length / itemsPerPage);

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % posts.length;
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  

  return (
    <>
      <PostList
        currentPosts={currentPosts}
      />
    {/* TODO: styles.paginationの@import "bootstrap";の部分が適用されない */}
    {/* <div className={`${styles['pagination']} px-40`}> */}
    {/* <div className={styles.pagination}> */}
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
    {/* </div> */}
    </>
  );
}
export default Pagination;
