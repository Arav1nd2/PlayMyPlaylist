const { useState } = require("react");

export function useFormState(defaultValue, idPrefix) {
  const [state, setState] = useState(defaultValue);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const elem = e.target;
    setState((prevState) => ({ ...prevState, [elem.name]: [elem.value] }));
  }

  function getFieldProps(name) {
    return {
      name,
      id: `${idPrefix}-${name}`,
      value: state[name],
      onChange: handleChange,
    };
  }

  function getFormState() {
    return {
      data: state,
      errors,
    };
  }

  return {
    getFieldProps,
    getFormState,
  };
}
