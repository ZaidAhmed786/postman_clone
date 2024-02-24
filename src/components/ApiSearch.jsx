/* eslint-disable no-unused-vars */
import styles from "./apisearch.module.css";

const ApiFillter = ({
  handleSendClick,
  isLoading,
  selectMethod,
  setMethod,
  url,
  setUrl,
}) => {
  return (
    <div className={styles.apiSearch_container}>
      <select
        value={selectMethod}
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
        onClick={handleSendClick}
        disabled={isLoading}>
        {isLoading ? "Loading..." : "Send"}
      </button>
      
    </div>
  );
};

export default ApiFillter;
