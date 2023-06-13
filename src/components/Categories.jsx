import React from "react";

function Categories({value, onClickCategory}) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  // let [indexOfCategories, setIndexOfCategories] = useState(0);
  // console.log(value)
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, indx) => {
          return (
            <li
              key={categoryName}
              onClick={() => onClickCategory(indx)}
              className={value === indx ? "active" : ""}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
