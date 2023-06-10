import React, { useState } from "react";

function Categories() {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  let [indexOfCategories, setIndexOfCategories] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((val, indx) => {
          return (
            <li
              key={val}
              onClick={() => setIndexOfCategories(indx)}
              className={indexOfCategories === indx ? "active" : ""}
            >
              {val}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
