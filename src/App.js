import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock ";
import { useEffect, useState } from "react";

function App() {

  const [productList, setProductList] = useState([]);
  const urlDb = 'https://6485b6faa795d24810b7397b.mockapi.io/pizza';
  
  useEffect(() => {
    fetch(urlDb)
    .then((res) => res.json())
    .then((res) => {
      setProductList(res)
    })
  }, [])
 console.log(productList)
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
            
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {productList.map((obj) => {
              return (
                <PizzaBlock key={obj.id} {...obj}/>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
