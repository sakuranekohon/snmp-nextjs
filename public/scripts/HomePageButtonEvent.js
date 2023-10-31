import { useState } from "react";

export function buttonEvent_lockIP() {
    const [currentState, changeState] = useState(false);
    const lockingBtnClick = () => {
        changeState(!currentState);
        const lockTargetIP = document.getElementById('targetIP');
        lockTargetIP.disabled = currentState;
        
    }
    return {currentState,lockingBtnClick};
}

export function deleteOIDBtn(){
    console.log()
}

export function createOIDBtn(){

}

export const searchBtnClick = () => {
    const targetIP = document.getElementById('targetIP').value;
    const OID = document.getElementsByName('OID');

    const sentData = {
        targetIP: targetIP,
        OID: OID[0].value
    };
    console.log(sentData);
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
            console.log("SNMP Result", response.result);
            displayData(response.result);
        })
        .catch(error => {
            console.error("ERROR FETCHING SNMP DATA :", error);
        });
};

const displayData = (result) => {
    const display = document.getElementById('result');
    display.innerText = result;
};