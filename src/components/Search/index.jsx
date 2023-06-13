import React, { useContext } from "react";

import styles from "./Search.module.scss";
import { searchContext } from "../../App";



export default function Search() {

const {searchValue, setSearchValue} = useContext(searchContext)

  return (
    <>
      <div className={styles.root}>
        <input
        value={searchValue}
          className={styles.input}
          placeholder="Поиск"
          onChange={(event) => setSearchValue(event.target.value)}
        />

        {searchValue && (
            <svg
            onClick={() => setSearchValue('')}
            xmlns="http://www.w3.org/2000/svg"
            class={styles.delete}
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) }
        
      </div>
    </>
  );
}
