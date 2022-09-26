export default function findExactItemRank({ value, items }) {
  let rank = 0;
  items.map((item, i) => {
    if (value.toLowerCase() === item.label.toLowerCase()) {
      rank = i;
    }
  });
  return rank;
};
