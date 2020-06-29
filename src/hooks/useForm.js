/**
 * custom React hook handles form change and submission of a form component
 * @param {Object} obj -  base object representing the fields the form should have
 * @param {Function} submitFunction -  function that really handles submit
 * @returns several variables and functions to be used elsewhere
 */
function useForm(obj, submitFunction) {
  const data = obj || {};

  function handleChange(key, val) {
    data[key] = val;
  }

  function handleSubmit() {
    submitFunction();
  }

  return {
    handleChange,
    handleSubmit,
    data,
  };
}

export default useForm;
