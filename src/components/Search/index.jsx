import React, { useCallback, useContext, useRef } from "react";

import styles from "./Search.module.scss";
import { searchContext } from "../../App";
import debounce from 'lodash.debounce'



export default function Search() {


const {setSearchValue} = useContext(searchContext)
const inputRef = useRef();
const [value, setValue] = React.useState('');


const updateSearchValue = useCallback(
  debounce((str) => {
    setSearchValue(str)
  }, 550), []
)

const onChangeInput = (event) => {
  setValue(event.target.value);
  updateSearchValue(event.target.value)
}

  return (
    <>
      <div className={styles.root}>
        <input
        value={value}
          className={styles.input}
          ref={inputRef}
          placeholder="Поиск"
          onChange={onChangeInput}
        />

        {value && (
            <svg
            onClick={() => {
              setSearchValue('');
              inputRef.current.focus()
            }}
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
