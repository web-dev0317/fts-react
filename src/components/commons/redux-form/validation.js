export const validate = (values) => {
  const errors = {};
  const requiredFields = ['iname', 'price', 'normallyAvailableQty'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};
