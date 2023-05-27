import React from "react";
import MealList from "./MealList";
import PromoText from "./PromoText";


const Meals = (props) => {
  return (
    <React.Fragment>
      <PromoText />
      <MealList />
    </React.Fragment>
  )
};

export default Meals;