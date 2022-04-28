
const DescriptionDetail = ({ item }) => {

  const kind = item?.ideaType;

  return (
    <>
      Description.... {kind}
    </>
  );
};

export default DescriptionDetail;
