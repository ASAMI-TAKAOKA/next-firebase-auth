import React, { ChangeEvent } from 'react';

type Props = {
  searchInput: string;
  handleSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchForm(props: Props) {
  <input
    type="text"
    value={props.searchInput}
    onChange={props.handleSearchInputChange}
    placeholder="このルームで検索"
    className="mb-4 p-2 border rounded w-full"
  />
}