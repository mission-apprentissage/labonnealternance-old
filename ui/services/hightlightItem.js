export default function highlightItem (currentLabel, currentInputValue) {

  return currentLabel.replace(
      new RegExp(currentInputValue, 'gi'),
      (str) => `<strong>${str}</strong>`
  );

}
