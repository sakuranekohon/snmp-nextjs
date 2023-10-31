const snmp = require("net-snmp");

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { targetIP, length ,OIDs } = req.body;
        console.log("snmp.js",OIDs)
        const session = snmp.createSession(targetIP, "public"); //建立與設備的通訊

        session.get(OIDs, (error, varbinds) => {   //varbinds為OID所對應的資訊 如:sysName : ES-2108
            if (error) {
                console.error(error);
                res.status(500).end("SNMP request failed");
            } else {
                console.log("Result:", varbinds[0].value.toString());
                res.status(200).json({
                    result: varbinds[0].value.toString()
                });
            }
            session.close();    //結束通訊
        });
    } else {
        res.status(405).end();
    }
};