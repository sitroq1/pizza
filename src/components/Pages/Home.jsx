// eslint-disable-next-line

import React from "react";
import { useState, useEffect } from "react";

import Categories from "../Categories";
import Sort from "../Sort";
import PizzaBlock from "../PizzaBlock/index";
import Skeleton from "../PizzaBlock/Skeleton";

export const Home = () => {

    const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  let [categorieId, setCategorieId] = useState(0);
  const [sort, setSort] = useState({
    name: 'популярности',
    sortProperty: 'rating'
  });

  // const urlDb = `https://648850e00e2469c038fd750f.mockapi.io/pizza?category=${categorieId}`;
  const urlDb = `https://648850e00e2469c038fd750f.mockapi.io/pizza?${categorieId > 0 ? `category=${categorieId}`: ''}&sortBy=${sort.sortProperty}&order=desc`
  useEffect(() => {
    setIsLoading(true)

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc': 'desc';
    const category = categorieId > 0 ? `category=${categorieId}`: '';

    fetch(`https://648850e00e2469c038fd750f.mockapi.io/pizza?${category}&sortBy=${sortBy}&order=${order}`)
    .then((res) => res.json())
    .then((res) => {
      setProductList(res)
      setIsLoading(false)
    });
    window.scrollTo(0, 0)
  }, [categorieId, sort])

    return (
      <div className="container">
            <div className="content__top">
                <Categories value={categorieId} onClickCategory={(indx) => setCategorieId(indx)}/>
                <Sort value={sort} onSelectSort={(i) => setSort(i)}/>
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
        </div>
    );
};

export default Home