export default function highlightItem(currentLabel, currentInputValue) {
  return currentLabel
    ? currentLabel.replace(new RegExp(currentInputValue, "gi"), (str) => `<strong>${str}</strong>`)
    : "";
}
