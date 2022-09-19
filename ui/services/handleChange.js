export function handleSelectChange(evt, setFieldValue, setThing, thing_str) {
  const value = evt.currentTarget.value;
  setThing(value);
  setTimeout(() => {
    setFieldValue(thing_str, value);
  }, 0);
};

export function handleButtonChange(evt, setFieldValue, setThing, thing_str) {
  console.log('evt', evt);
};
