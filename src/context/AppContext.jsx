// AppContext.js
import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState("params");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  const [method, setMethod] = useState("GET"); // Default method is GET
  const [paramsData, setParamsData] = useState([]);
  const [headersData, setHeadersData] = useState([]);

  const [tableHeadersData, setTableHeadersData] = useState([]);

  const [bodyData, setBodyData] = useState("");

  const onAddParams = (tableData) => {
    const queryParams = tableData
      .reduce((acc, curr) => {
        if (curr.id && curr.value) {
          acc.push(
            `${encodeURIComponent(curr.id)}=${encodeURIComponent(curr.value)}`
          );
        }
        return acc;
      }, [])
      .join("&");
    const newUrl = url.split("?");
    setUrl(`${newUrl[0]}?${queryParams}`);
    //setParamsData for remind the state after comeback
    setParamsData(tableData);
  };

 

  return (
    <AppContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        response,
        setResponse,
        isLoading,
        setIsLoading,
        error,
        setError,
        url,
        setUrl,
        method,
        setMethod,
        paramsData,
        setParamsData,
        onAddParams,
        tableHeadersData,
        setTableHeadersData,
        headersData,
        setHeadersData,
        bodyData,
        setBodyData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
