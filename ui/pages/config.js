import React, { useState, useEffect } from "react";
import microAjax from "utils/microAjax";
import baseUrl from "utils/baseUrl";

const Config = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      microAjax({
        url: baseUrl + "/api/config",
        success: (res) => {
          //console.log("config", res);
          setConfig(JSON.parse(res).config);
        },
      });
    }
  }, []);
  return <div>{config ? <>Environnement : {config.env}</> : ""}</div>;
};

export default Config;
