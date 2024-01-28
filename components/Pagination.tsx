import PostList from "components/posts/PostList";
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { PostData } from "types/types";
import styles from 'components/Pagination.module.scss';

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
    <div>
      <PostList
        posts={posts}
        currentPosts={currentPosts}
      />
    </div>
    {/* TODO: styles.paginationの@import "bootstrap";の部分が適用されない */}
    {/* <div className={`${styles['pagination']} px-40`}> */}
    <div className={styles.pagination}>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
    </>
  );
}
export default Pagination;
