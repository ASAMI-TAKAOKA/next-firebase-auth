import { useState, useEffect } from 'react';
import React from 'react';
import ReactPaginate from 'react-paginate';
import { PostData } from "types/types";
import styles from 'components/Pagination.module.scss';
import PostList from "components/posts/PostList";

type Props = {
  posts: PostData[];
};

const Pagination = (props: Props) => {
  const { posts } = props;
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentPosts = posts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(posts.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (e: {selected: number}) => {
    const newOffset = (e.selected * itemsPerPage) % posts.length;
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <section>
      <div>
        <PostList currentPosts={currentPosts} />
      </div>
      <div className={styles.pagination}>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          breakLabel="..."
          nextLabel="next >"
          pageRangeDisplayed={5}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </section>
  );
}
export default Pagination;
