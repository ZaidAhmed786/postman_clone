import { AppContext } from "../context/AppContext";
import styles from "./paramsquery.module.css";
import { useEffect, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const HeaderQuery = () => {
  const {
    onAddHeaders,
    headersData,
    headersNewkey,
    setHeadersNewkey,
    headersNewvalue,
    setHeadersNewvalue,
    tableHeadersData,
    setTableHeadersData
  } = useContext(AppContext);


  useEffect(() => {
    if (headersData && headersData.length > 0) {
      setTableHeadersData(headersData);
      setHeadersNewkey(headersData[headersData.length - 1]?.id.toString() || ""); // Default to empty string if headersData is empty
      setHeadersNewvalue(headersData[headersData.length - 1]?.value.toString() || ""); // Default to empty string if headersData is empty
    }
  }, [headersData, setTableHeadersData]);

  const handleDeleteRow = (id) => {
    const filterData = tableHeadersData.filter((item) => item.id !== id);
    setTableHeadersData([...filterData]);
    onAddHeaders([...filterData]);
  };

  const handleSave = () => {
    if (!headersNewkey || !headersNewvalue) {
      toast.error("Both fields are required");
      return;
    }

    setTableHeadersData([...tableHeadersData, { id: headersNewkey, value: headersNewvalue }]);
    // onAddHeaders([...tableHeadersData, { id: headersNewkey, value: headersNewvalue }]);
 
  };

  return (
    <div className={styles.paramsQuery_container}>
            <Toaster/>

      <p>Headers</p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableHeadersData?.map((item) => (
            <tr key={item.id}>
              <td>
                <span>{item.id}</span>
              </td>
              <td>
                <span>{item.value}</span>
              </td>
              <td>
                <button onClick={() => handleDeleteRow(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type='text'
                value={headersNewkey}
                onChange={(e) => {
                  setHeadersNewkey(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type='text'
                value={headersNewvalue}
                onChange={(e) => {
                  setHeadersNewvalue(e.target.value);
                }}
              />
            </td>
            <td>
              <button onClick={handleSave}>Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HeaderQuery;
