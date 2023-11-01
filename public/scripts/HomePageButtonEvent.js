import { useState } from "react";
import InputOID from "../../component/InputOID";
import InformationList from "../../component/InformationList";
import style from "../../styles/Home.module.css";
import ReactDOM from 'react-dom';

export function buttonEvent_lockIP() {
    const [currentState, changeState] = useState(false);
    const lockingBtnClick = () => {
        changeState(!currentState);
        const lockTargetIP = document.getElementById('targetIP');
        lockTargetIP.disabled = currentState;

    }
    return { currentState, lockingBtnClick };
}

export function deleteOIDBtn(element) {
    const parentElement = element.nativeEvent.target.closest("div");
    parentElement.remove();
}

export function buttonEvent_createOIDBtn(styles) {
    const [inputOIDList, setInputOIDList] = useState([]);
    const createOIDBtn = () => {
        setInputOIDList((prevList) => [
            ...prevList,
            <InputOID styles={styles} buttonClick={deleteOIDBtn} />
        ]);
    };
    return { inputOIDList, createOIDBtn }
}

export const searchBtnClick = () => {
    const targetIP = document.getElementById('targetIP').value;
    const OIDElement = document.getElementsByName('OID');
    const OID = Array.from(OIDElement).map((element)=>element.value);

    const sentData = {
        targetIP: targetIP,
        length: OIDElement.length,
        OIDs: OID
    };
    console.log(sentData);
    console.log(JSON.stringify(sentData));
    fetchData(sentData);

};

const fetchData = (data) => {
    fetch("../api/snmp", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(response => {
            displayData(response);
        })
        .catch(error => {
            console.error("ERROR FETCHING SNMP DATA :", error);
        });
};

const displayData = (result) => {
    console.log("DI : ", result);
    const infoList = document.getElementById("infoList");
    
    result.oid.forEach((element, index) => {
        const li = document.createElement('li');
        ReactDOM.render(<InformationList  style={style} OID={element} OIDName={"我好懶這建字典"} OIDinformation={result.deviceName[index]}/>,li);
        infoList.appendChild(li);
    });
};