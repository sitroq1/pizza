import React from "react";
import { useState, useEffect } from "react";

import Categories from "../Categories";
import Sort from "../Sort";
import PizzaBlock from "../PizzaBlock/index";
import Skeleton from "../PizzaBlock/Skeleton";

export const Home = () => {

    const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const urlDb = 'https://6485b6faa795d24810b7397b.mockapi.io/pizza';
  
  useEffect(() => {
    fetch(urlDb)
    .then((res) => res.json())
    .then((res) => {
      setProductList(res)
      setIsLoading(false)
    })
  }, [])

    return (
        <>
            <div className="content__top">
                <Categories />
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
        </>
    );
};

export default Home