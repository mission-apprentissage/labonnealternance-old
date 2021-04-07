export const getItemId = (item) => {
  return getItemIdAndType(item).itemId;
};

export const getItemIdAndType = (item) => {
  let itemId = item.id;
  let type = "training";
  if (item.ideaType === "peJob") {
    itemId = item.job.id;
    type = item.ideaType;
  } else if (item.ideaType === "matcha") {
    type = item.ideaType;
  } else if (item.ideaType !== "formation") {
    itemId = item.company.siret;
    type = item.ideaType;
  }

  return { itemId, type };
};

export const getItemQueryParameters = (item) => {
  const idAndType = getItemIdAndType(item);
  return `type=${idAndType.type}&itemId=${idAndType.itemId}`;
};
