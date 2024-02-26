import { AppContext } from "../context/AppContext";
import styles from "./paramsquery.module.css";
import { useEffect, useContext} from "react";
import toast, { Toaster } from "react-hot-toast";

const ParamsQuery = () => {
  const {
    onAddParams,
    paramsData,
    tableData,
    setTableData,
    paramsNewkey,
    setParamsNewkey,
    paramsNewvalue,
    setParamsNewvalue,
  } = useContext(AppContext);


  useEffect(() => {
    if (paramsData && paramsData.length > 0) {
      setTableData(paramsData);
      setParamsNewkey(paramsData[paramsData.length - 1].id); // Make sure it's a string
      setParamsNewvalue(paramsData[paramsData.length - 1].value); // Make sure it's a string
    }
  }, [paramsData, setTableData,setParamsNewkey,setParamsNewvalue]);

  const handleDeleteRow = (id) => {
    const filterData = tableData.filter((item) => item.id !== id);
    setTableData([...filterData]);
    onAddParams([...filterData]);
  };

  const handleSave = () => {
    if (!paramsNewkey.trim() && !paramsNewvalue.trim()) {
      toast.error("Both fields are required");
      return;
    }

    setTableData([...tableData, { id: paramsNewkey, value: paramsNewvalue }]);
    onAddParams([...tableData, { id: paramsNewkey, value: paramsNewvalue }]);
    setParamsNewkey("");
    setParamsNewvalue("");
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
          {tableData?.map((item) => (
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
                value={paramsNewkey}
                onChange={(e) => {
                  setParamsNewkey(e.target.value);
                }}
                required
              />
            </td>
            <td>
              <input
                type='text'
                value={paramsNewvalue}
                onChange={(e) => {
                  setParamsNewvalue(e.target.value);
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
