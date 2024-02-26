import { AppContext } from "../context/AppContext";
import styles from "./paramsquery.module.css";
import { useContext,useState} from "react";
import toast, { Toaster } from "react-hot-toast";

const ParamsQuery = () => {

  const [bodyKey, setBodyKey] = useState("")
  const [bodyValue, setBodyValue] = useState("")


  const {
    bodyData,
    setBodyData,
  } = useContext(AppContext);




  const handleDeleteRow = (index) => {
    const filterData =[];
    bodyData.map((item,interanlIndex) => {
      if(index !== interanlIndex){
        filterData.push(item)
      }
     });
     setBodyData([...filterData]);
  };

  const handleSave = () => {

    if (!bodyKey.trim() && !bodyValue.trim()) {
      toast.error("Both fields are required");
      return;
    }
    setBodyData([...bodyData, { id: bodyKey, value: bodyValue }]);
    setBodyKey("");
    setBodyValue("");
  };

  return (
    <div className={styles.paramsQuery_container}>
      <Toaster/>
      <p>Body</p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bodyData?.map((item,index) => (
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
                value={bodyKey}
                onChange={(e) => {
                  setBodyKey(e.target.value);
                }}
                required
              />
            </td>
            <td>
              <input
                type='text'
                value={bodyValue}
                onChange={(e) => {
                  setBodyValue(e.target.value);
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
