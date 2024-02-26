import { AppContext } from "../context/AppContext";
import styles from "./paramsquery.module.css";
import { useEffect, useContext,useState} from "react";
import toast, { Toaster } from "react-hot-toast";

const ParamsQuery = () => {

  const [paramKey, setParamKey] = useState("")
  const [paramValue, setParamValue] = useState("")


  const {
    onAddParams,
    paramsData,
    tableData,
  } = useContext(AppContext);




  const handleDeleteRow = (index) => {
    const filterData =[];
    paramsData.map((item,interanlIndex) => {
      if(index !== interanlIndex){
        filterData.push(item)
      }
     });
    onAddParams([...filterData]);
  };

  const handleSave = () => {

    if (!paramKey.trim() && !paramValue.trim()) {
      toast.error("Both fields are required");
      return;
    }
    onAddParams([...paramsData, { id: paramKey, value: paramValue }]);
    setParamKey("");
    setParamValue("");
  };

  return (
    <div className={styles.paramsQuery_container}>
      <Toaster/>
      <p>Params</p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paramsData?.map((item,index) => (
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
                value={paramKey}
                onChange={(e) => {
                  setParamKey(e.target.value);
                }}
                required
              />
            </td>
            <td>
              <input
                type='text'
                value={paramValue}
                onChange={(e) => {
                  setParamValue(e.target.value);
                }}
                required
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

export default ParamsQuery;
