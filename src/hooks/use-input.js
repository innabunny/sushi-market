import { useReducer } from "react";

const initialInputState = {
  inputValue: "",
  wasTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    return { inputValue: action.value, wasTouched: state.wasTouched };
  }
  if (action.type === "INPUT_BLUR") {
    return { inputValue: state.inputValue, wasTouched: true };
  }
  if (action.type === "RESET") {
    return { inputValue: "", wasTouched: false };
  }
  return inputStateReducer;
};

const useInput = (validateFunc) => {
  const [inputState, dispatchAction] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const isValueValid = validateFunc(inputState.inputValue);
  const isInputInvalid = !isValueValid && inputState.wasTouched;

  const inputChangeHandler = (evt) => {
    dispatchAction({ type: "INPUT_CHANGE", value: evt.target.value });
  };

  const inputLostFocusHadler = (evt) => {
    dispatchAction({ type: "INPUT_BLUR" });
  };

  const resetValues = () => {
    dispatchAction({ type: "RESET" });
  };

  return {
    value: inputState.inputValue,
    hasError: isInputInvalid,
    isValid: isValueValid,
    inputChangeHandler,
    inputLostFocusHadler,
    resetValues,
  };
};

export default useInput;
