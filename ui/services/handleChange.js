export function handleSelectChange(evt, setFieldValue, setThing, thing_str) {
  const value = evt.currentTarget.value;
  setThing(value);
  setTimeout(() => {
    setFieldValue(thing_str, value);
  }, 0);
};

export function handleButtonChange(evt, value, setFieldValue, setThing, thing_str) {
  console.log('evt', evt);
  console.log('evt.currentTarget.value', evt.currentTarget.value);
  console.log('value', value);
  setThing(value)
  setTimeout(() => {
    setFieldValue(thing_str, value);
  }, 0);
};
