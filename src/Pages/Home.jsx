// eslint-disable-next-line

import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "./Pagination";
import { searchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategorieId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import qs from 'qs';
import { useNavigate } from "react-router-dom";


export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false)

  const { categoryId, sort, currentPage } = useSelector((state) => state.filterReducer)

  console.log("categoryId", categoryId)
  
  const onClickCategory = (id) => {
    console.log("onClickCategory", id)
    dispatch(setCategorieId(id))
  }
  const onChangePage = (num) => {
    dispatch(setCurrentPage(num))
  }


  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(searchContext);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(
        setFilters({
          ...params,
          sort
        })
      )
      isSearch.current = true;
    }
  }, [])

  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    
    axios.get(`https://648850e00e2469c038fd750f.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((res) => {
        setProductList(res.data);
        setIsLoading(false);
      })
  }

  useEffect(() => {
    
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;

    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
  
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={onClickCategory}
        />
        <Sort />
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  );
};

export default Home;
