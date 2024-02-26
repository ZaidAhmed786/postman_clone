import styles from "./apisearch.module.css";
import React, {useContext} from "react";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const ApiFillter = ({handleSendClick}) => {


  const {
    isLoading,
    url,
    setUrl,
    method,
    setMethod,
  } = useContext(AppContext);

  // for check empty url

  const validateUrl = () => {
    if (!url.trim()) {
      toast.error("URL cannot be empty");
      return false;
    }
// for check invaild url
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(url)) {
      toast.error("Enter a valid URL");
      return false;
    }
    return true;
  };

  const handleSendButtonClick = () => {
    if (validateUrl()) {
      handleSendClick();
    }
  };

  return (
    <div className={styles.apiSearch_container}>
      <Toaster />
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}>
        <option value='GET'>GET</option>
        <option value='POST'>POST</option>
        <option value='PATCH'>PATCH</option>
        <option value='DELETE'>DELETE</option>
      </select>
      <input
        type='text'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleSendButtonClick}
        disabled={isLoading}>
        {isLoading ? "Loading..." : "Send"}
      </button>
    </div>
  );
};

export default ApiFillter;
