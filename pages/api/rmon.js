const snmp = require("net-snmp");

export async function rmonTree(req,res){
    if(req.method === "POST"){
        const {targetIP,OID} = req.body;
        console.log("IP Address :",targetIP);
        console.log("OID : ",OID);
        
        const session = snmp.createSession(targetIP,"public");

        session.subtree(OID,1000,rmonfeed,rmondone);
    }else{
        res.status(405).end();
    }
}

function rmonfeed(varbinds){
    console.log("Result :",varbinds);
    res.status(200).json({
        data:varbinds
    })
}

function rmondone(error){
    if(error){
        console.error(error);
        res.status(500).end("SNMP request failed");
    }
}