import React, { ChangeEvent } from 'react';
import { useMediaQuery } from 'react-responsive';

type Props = {
  searchInput: string;
  handleSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchForm(props: Props) {
  const isMobileAndTablet = useMediaQuery({ maxWidth: 1023 }); // xs and sm and md breakpoint

  return (
    <input
      type="text"
      value={props.searchInput}
      onChange={props.handleSearchInputChange}
      placeholder="このルームで検索"
      className={`mb-4 p-2 border border-gray-400 rounded ${isMobileAndTablet ? 'w-full' : 'w-1/3'}`}
    />
  );
}