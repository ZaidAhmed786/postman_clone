import styles from "./paramsquery.module.css";
import { useState } from "react";

const ParamsQuery = ({onAddParam}) => {
  const [tableData, setTableData] = useState([]);
  const [newkey, setNewKey]=useState("")
  const [newValue, setnewValue]=useState("")






  const handleDeleteRow = (id) => {
    const filterData = tableData.filter((item) => item.id !== id)
    setTableData([...filterData]);
    onAddParam([...filterData])

  };

  return (
    <div className={styles.paramsQuery_container}>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { tableData?.map((item) => (
            <tr >
              <td>
                <span>
                  {item.id}
                </span>
              </td>
              <td>
              <span>
                  {item.value}
                </span>
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
                value={newkey}
                onChange={(e) => {
                  setNewKey(e.target.value)
                }}
              />
            </td>
            <td>
              <input
                type='text'
                value={newValue}
                onChange={(e) => {
                 setnewValue(e.target.value)

                }}
              />
            </td>
            <td>
            
                <button
                
                onClick={() => {
               
                  setTableData([...tableData,{id:newkey,value:newValue}])
                  onAddParam([...tableData,{id:newkey,value:newValue}])
                  setNewKey("")
                  setnewValue("")
                }}>Save</button>
              </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ParamsQuery;
