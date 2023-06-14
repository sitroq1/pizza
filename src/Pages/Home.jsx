// eslint-disable-next-line

import React, { useContext } from "react";
import { useState, useEffect } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "./Pagination";
import { searchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategorieId } from "../redux/slices/filterSlice";


export const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filterReducer.categoryId)
  console.log("categoryId", categoryId)
  
  const onClickCategory = (id) => {
    console.log("onClickCategory", id)
    dispatch(setCategorieId(id))
  }


  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // let [categorieId, setCategorieId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const { searchValue } = useContext(searchContext)

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    

    fetch(
      `https://648850e00e2469c038fd750f.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((res) => {
        setProductList(res);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={onClickCategory}
        />
        <Sort value={sort} onSelectSort={(i) => setSort(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
      
        {isLoading
          ? [...new Array(6)].map((_, indx) => {
              return <Skeleton key={indx} />;
            })
          : productList.map((obj) => {
              return <PizzaBlock key={obj.id} {...obj} />;
            })}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)}/>
    </div>
  );
};

export default Home;
