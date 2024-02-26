import React, { useEffect, useState } from "react";
import styles from "./apiresult.module.css";
import ReactJson from "react-json-view";

const ApiResult = ({ response }) => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const parseJsonResponse = async () => {
      try {
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error("Error parsing JSON response:", error);
      }
    };

    if (response) {
      parseJsonResponse();
    }
  }, [response]);

  if (!response) {
    return null; 
  }

 
  return (
    <div className={styles.apiResult_container}>
      <h4>Result</h4>

      <div className={styles.result}>
        <ReactJson
          src={jsonData}
          theme='bright:inverted'
          collapsed='1'
        />
      </div>
    </div>
  );
};

export default ApiResult;
