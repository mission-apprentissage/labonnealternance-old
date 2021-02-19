export default function (evt, setFieldValue, setDiploma) {
  const value = evt.currentTarget.value;
  setDiploma(value);
  setTimeout(() => {
    setFieldValue("diploma", value);
  }, 0);
};
