import useInput from "../../hooks/use-input";
import styles from "./SubmitOrder.module.css";

const SubmitOrder = (props) => {
  const {
    value: enteredName,
    hasError: hasNameInputError,
    isValid: isEnteredNameValid,
    inputChangeHandler: nameInputChangeHandler,
    inputLostFocusHadler: nameInputLostFocusHandler,
    resetValues: resetNameValue,
  } = useInput((val) => val.trim() !== "");

  const {
    value: enteredCity,
    hasError: hasCityInputError,
    isValid: isEnteredCityValid,
    inputChangeHandler: cityInputChangeHandler,
    inputLostFocusHadler: cityInputLostFocusHandler,
    resetValues: resetCityValue,
  } = useInput((val) => val.trim() !== "");

  const {
    value: enteredAddress,
    hasError: hasAddressInputError,
    isValid: isEnteredAddressValid,
    inputChangeHandler: addressInputChangeHandler,
    inputLostFocusHadler: addressInputLostFocusHandler,
    resetValues: resetAddressValue,
  } = useInput((val) => val.trim() !== "");

  const submitHandler = (evt) => {
    evt.preventDefault();
    if (!isEnteredNameValid || !isEnteredAddressValid || !isEnteredCityValid) {
      return;
    }

    console.log(enteredAddress, enteredCity, enteredName);
    props.onSubmit({
      name: enteredName,
      city: enteredCity,
      address: enteredAddress,
    });

    resetNameValue();
    resetCityValue();
    resetAddressValue();
  };

  const isFormValid =
    isEnteredNameValid && isEnteredAddressValid && isEnteredCityValid;

  const nameClassList = hasNameInputError ? `${styles.invalid}` : "";
  const addressClassList = hasAddressInputError ? `${styles.invalid}` : "";
  const cityClassList = hasCityInputError ? `${styles.invalid}` : "";

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={`${styles.control} ${nameClassList}`}>
        <label htmlFor="name">Введите имя</label>
        <input
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputLostFocusHandler}
          type="text"
          id="name"
          required
        />
        {hasNameInputError && (
          <span className={styles.error}>Пожалуйста введите имя</span>
        )}
      </div>
      <div className={`${styles.control} ${cityClassList}`}>
        <label htmlFor="city">Введите название города</label>
        <input
          type="text"
          id="city"
          required
          value={enteredCity}
          onChange={cityInputChangeHandler}
          onBlur={cityInputLostFocusHandler}
        />
        {hasCityInputError && (
          <span className={styles.error}>
            Пожалуйста введите название города
          </span>
        )}
      </div>
      <div className={`${styles.control} ${addressClassList}`}>
        <label htmlFor="address">Введите адрес</label>
        <input
          type="text"
          id="address"
          required
          value={enteredAddress}
          onChange={addressInputChangeHandler}
          onBlur={addressInputLostFocusHandler}
        />
        {hasAddressInputError && (
          <span className={styles.error}>Пожалуйста введите адрес</span>
        )}
      </div>
      <div className={styles.actions}>
        <button className={styles.submit} type="submit" disabled={!isFormValid}>
          Заказать
        </button>
        <button type="button" onClick={props.onCloseForm}>
          Отменить
        </button>
      </div>
    </form>
  );
};

export default SubmitOrder;
