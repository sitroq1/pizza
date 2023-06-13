import "./scss/app.scss";
import React from "react";
import Header from "./components/Header";
import Home from "./components/Pages/Home";
import NotFoundPage from './components/Pages/NotFoundPage'
import Cart from "./components/Pages/Cart";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";



export const searchContext = React.createContext();
function App() {

  const [searchValue, setSearchValue] = useState('');

  console.log(searchValue)
  

 
  return (
    <div className="wrapper">
      <searchContext.Provider value={{searchValue, setSearchValue}}>
      <Header />
      <div className="content">
        
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue}/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="*" element={<NotFoundPage/>}/>

           
          
          
          </Routes>
          
        
      </div>
      </searchContext.Provider>
    </div>
  );
}

export default App;
