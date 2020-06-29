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
