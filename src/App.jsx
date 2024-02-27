/* eslint-disable no-unused-vars */
import { useContext } from "react";
import "./App.css";
import ApiSearch from "./components/ApiSearch";
import Header from "./components/Header";
import ApiFillter from "./components/ApiFillter";
import ParamsQuery from "./components/ParamsQuery";
import ApiResult from "./components/ApiResult";
import { AppContext } from "./context/AppContext";
import HeaderQuery from "./components/HeaderQuery";
import BodyParams from "./components/BodyQuery";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const {
    activeMenu,
    response,
    url,
    method,
    setIsLoading,
    setError,
    setResponse,
    headersData,
    bodyData,
  } = useContext(AppContext);
  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const options = {
        method: method,
      };

      // Add headers only if headers id has a value
      if (headersData) {
        const newHeaders = {};
        headersData.forEach((head) => {
          newHeaders[head.id] = head.value;
        });
        options.headers = newHeaders;
      }
     // Add body only if !GET then Ad id has a value
      if (method !== "GET" && bodyData.length > 0) {
        const formData = new FormData();
        bodyData.forEach((body) => {
          formData.append(body.id, body.value);
        });
        options.body = formData;
      }
      

      const res = await fetch(url, options);

      if (!res.ok) {
        toast.error(
          res.status === 404
            ? "404: Not Found"
            : `Failed to fetch data: ${res.status}`
        );
        return;
      }

      setResponse(res);
    } catch (error) {
      toast.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <Toaster />

      <Header />
      <div className='content'>
        <ApiSearch handleSendClick={handleSearch} />
        <ApiFillter />
        {activeMenu === "params" && <ParamsQuery />}
        {activeMenu === "headers" && <HeaderQuery />}
        {activeMenu === "body" && <BodyParams />}
        <ApiResult response={response} />
      </div>
    </div>
  );
}

export default App;
