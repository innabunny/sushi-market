import React from "react";
import CartContextProvider from "./store/CartContextProvider";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  return (
      <CartContextProvider>
        <Header />
        <main>
          <Meals />
        </main>
      </CartContextProvider>
  );
}

export default App;