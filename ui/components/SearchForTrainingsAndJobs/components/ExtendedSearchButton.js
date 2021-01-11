import React from "react";
import { Button } from "reactstrap";
import { useScopeContext } from "context/ScopeContext";

const ExtendedSearchButton = ({ title, handleExtendedSearch }) => {
  const handleClick = async () => {
    handleExtendedSearch();
  };

  const scopeContext = useScopeContext();

  return scopeContext.isJob ? (
    <Button className="submitButton" onClick={handleClick}>
      {title}
    </Button>
  ) : (
    ""
  );
};

export default ExtendedSearchButton;
