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
    headersNewkey,
    headersNewvalue,

    headersData,
    
    bodyData  } = useContext(AppContext);

  console.log(bodyData)

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const options = {
        method: method,
      };

      // Add headers only if headersNewkey has a value
      if (headersData) {

        const newHeaders = {}
        headersData.forEach((head)=>{
          newHeaders[head.id]=head.value
        })
        options.headers = newHeaders
      }

      
      if (method !== "GET" && bodyData) {
        const formData = new FormData();
      
        bodyData.forEach((body) => {
          console.log(body)
          formData.append(body.id, body.value);
        });
      
        options.body = formData;
      }

      const res = await fetch(url, options);

      // Make the API request with method and options
      if (!res.ok) {
        // Check if it's a 404 error
        if (res.status === 404) {
          toast.error("404: Not Found");
        } else {
          toast.error(`Failed to fetch data: ${res.status}`);
        }
        return;
      }
      // const data = await res.json();
      setResponse(res); // Set response data
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
      <div className="content">
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







