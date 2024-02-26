import { AppContext } from "../context/AppContext";
import styles from "./paramsquery.module.css";
import { useEffect, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const HeaderQuery = () => {
  const {
    headersData,
    setHeadersData
  } = useContext(AppContext);

  const [headersKey, setHeadersKey] = useState("x-")
  const [headersValue, setHeadersValue] = useState("")




  const handleDeleteRow = (index) => {
    
    // const filterData =[];
    // tableHeadersData.map((item,interanlIndex) => {
    //   if(index !== interanlIndex){
    //     filterData.push(item)
    //   }
    //  });
    //  setTableHeadersData([...filterData]);

    // onAddParams([...filterData]);
  };
  

  const handleSave = () => {
    if (!headersKey || !headersValue) {
      toast.error("Both fields are required");
      return;
    }

    setHeadersData([...headersData, { id: headersKey, value: headersValue }]);
    setHeadersKey('x-');
    setHeadersValue('');
 
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
          {headersData?.map((item , index) => (
            <tr key={item.id}>
              <td>
                <span>{item.id}</span>
              </td>
              <td>
                <span>{item.value}</span>
              </td>
              <td>
                <button onClick={() => handleDeleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type='text'
                value={headersKey}
                onChange={(e) => {
                  setHeadersKey(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type='text'
                value={headersValue}
                onChange={(e) => {
                  setHeadersValue(e.target.value);
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
