import React, { useEffect, useState } from 'react';
import styles from "./apiresult.module.css";
import ReactJson from 'react-json-view';

const ApiResult = ({ response }) => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const parseJsonResponse = async () => {
      try {
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error parsing JSON response:', error);
      }
    };

    if (response) {
      parseJsonResponse();
    }
  }, [response]);

  if (!response) {
    return null; // Handle case when response is null or undefined
  }

  const contentType = response.headers.get("content-type");

  // Check if the response is HTML
  const isHTML = contentType && contentType.includes("text/html");

  // Check if the response is XML
  const isXML = contentType && contentType.includes("text/xml");

  return (
    <div className={styles.apiResult_container}>
      <h4>Result</h4>
      {isHTML && (
        <div
          className={styles.result}
          dangerouslySetInnerHTML={{ __html: response.text() }}
        />
      )}
      {isXML && (
        <div className={styles.result}>
          <pre>{response.text()}</pre>
        </div>
      )}
      {!isHTML && !isXML && jsonData && (
        <div className={styles.result}>
          <ReactJson src={jsonData} theme="bright:inverted" collapsed='1' />
        </div>
      )}
    </div>
  );
};

export default ApiResult;
