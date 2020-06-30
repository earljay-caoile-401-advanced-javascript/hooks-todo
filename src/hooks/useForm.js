import { useState } from 'react';

/**
 * custom React hook handles form change and submission of a form component
 * @param {Object} obj -  base object representing the fields the form should have
 * @param {Function} submitFunction -  function that really handles submit
 * @returns several variables and functions to be used elsewhere
 */
function useForm(obj, submitFunction) {
  const [data, setData] = useState(obj || {});

  function handleChange(key, val) {
    const newData = { ...data };
    newData[key] = val;
    setData(newData);
  }

  function handleSubmit() {
    console.log('What is data?', data);
    submitFunction();
  }

  return {
    handleChange,
    handleSubmit,
    data,
    setData,
  };
}

export default useForm;
