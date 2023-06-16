import styles from "./MealList.module.css";
import Card from "../Layout/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const MealList = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const respone = await fetch(
        "https://my-project-2bad7-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      const responseData = await respone.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={styles.loading}>
        <p>Загрузка данных</p>
      </section>
    );
  }

  const mealList = meals.map((item) => (
    <MealItem
      name={item.name}
      description={item.description}
      price={item.price}
      id={item.id}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default MealList;
