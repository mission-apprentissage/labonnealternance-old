function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export default function highlightItem(currentLabel, currentInputValue) {
  return currentLabel
    ? currentLabel.replace(new RegExp(escapeRegExp(currentInputValue), "gi"), (str) => `<strong>${str}</strong>`)
    : "";
}
