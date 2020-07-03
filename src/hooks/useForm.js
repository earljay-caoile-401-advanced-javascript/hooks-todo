import { useState } from 'react';

/**
 * custom React hook handles form change and submission of a form component
 * @param {Object} obj -  base object representing the fields the form should have
 * @param {Function} submitFunction -  function that really handles submit
 * @returns several variables and functions to be used elsewhere
 */
function useForm(callback, initObj) {
  const [data, setData] = useState(initObj || {});

  /**
   * event handler function of sorts that handles form change
   * takes in a key and val to add/edit to the current data object
   * @param {*} key - key/property to add/edit
   * @param {*} val - value to add/edit
   */
  function handleChange(key, val) {
    const newData = { ...data };
    newData[key] = val;
    setData(newData);
  }

  /**
   * event handler function that handles page submission
   * designed to work with HTML page form validation
   * @param {Object} event - event object (we weant to inspect the currentTarget property)
   */
  function handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      return false;
    } else {
      callback();
      return true;
    }
  }

  return {
    handleChange,
    handleSubmit,
    data,
    setData,
  };
}

export default useForm;
