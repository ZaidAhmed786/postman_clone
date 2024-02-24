/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import ApiSearch from "./components/ApiSearch";
import Header from "./components/Header";
import ApiFillter from "./components/ApiFillter";
import ParamsQuery from "./components/ParamsQuery";
import ApiResult from "./components/ApiResult";

function App() {
  const [activeMenu, setActiveMenu] = useState("params");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET"); // Default method is GET



  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const options = {
        method: method, // Use selected method
   
      };

      const res = await fetch(url, options); 

      // Make the API request with method and options
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      // const data = await res.json();
      setResponse(res); // Set response data
    } catch (error) {
      console.log(error)
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <Header />
      <ApiSearch
        handleSendClick={handleSearch}
        selectMethod={method}
        setMethod={setMethod}
        url={url}
        setUrl={setUrl}
        isLoading={isLoading}
      />
      <ApiFillter
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      {activeMenu === "params" && <ParamsQuery onAddParam={(tableData)=>{
         const queryParams = tableData.reduce((acc, curr) => {
          if (curr.id && curr.value) {
            acc.push(`${encodeURIComponent(curr.id)}=${encodeURIComponent(curr.value)}`);
          }
          return acc;
        }, []).join("&");
        const newUrl = url.split('?')
        setUrl(`${newUrl[0]}?${queryParams}`);
      }} />}
      <ApiResult response={response} />
    </div>
  );
}

export default App;
