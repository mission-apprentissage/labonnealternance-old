import React from "react";
import { Button } from "reactstrap";
import { useScopeContext } from "context/ScopeContext";

const ExtendedSearchButton = ({ title, hasJob, handleExtendedSearch }) => {
  const handleClick = async () => {
    handleExtendedSearch();
  };

  const scopeContext = useScopeContext();

  const gtmClass = function() {
    let res = '';
    if (hasJob == "true") {
      res = 'gtmExtendSelect gtmExtendSelectHasJob'
    } else if (hasJob == "false") {
      res = 'gtmExtendSelect gtmExtendSelectNoJob'
    }
    return res;
  }

  return scopeContext.isJob ? (
    <Button className={`${gtmClass()} submitButton`} onClick={handleClick}>
      {title}
    </Button>
  ) : (
    ""
  );
};

export default ExtendedSearchButton;
