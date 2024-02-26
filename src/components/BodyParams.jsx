import React,{useContext} from 'react'
import styles from "./bodyparams.module.css";
import { AppContext } from '../context/AppContext';

const BodyParams = () => {
  const {
    bodyData,
    setBodyData
   } = useContext(AppContext);
  return (
    <div className={styles.bodyParama_container}>
      <p>JSON</p>
      <select
        // value={method}
        // onChange={(e) => setMethod(e.target.value)}
        >
        <option value='JSON'>JSON</option>
        <option value='XML'>XML</option>
        <option value='PLANTEXT'>PLAN-TEXT</option>
      </select>
      <textarea value={bodyData} onChange={(e)=>setBodyData(e.target.value)}/>
    </div>
  )
}

export default BodyParams