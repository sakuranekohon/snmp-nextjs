const snmp = require("net-snmp");

export default async function rmon(req, res) {
    if (req.method === "POST") {
        const { targetIP, OID } = req.body;
        console.log("IP Address : ", targetIP);
        console.log("search OID : ", OID);
    
        const session = snmp.createSession(targetIP, "public");
    
        session.getBulk({
            oid: OID,  // 基本的 OID
            nonRepeaters: 0,  // 非重複的 OID 數量
            maxRepetitions: 10,  // 重複的 OID 數量
        }, (error, varbinds) => {
            if (error) {
                console.error(error);
                res.status(500).end("SNMP request failed");
            } else {
                console.log("Result:", varbinds);
                const resultArray = Array.from(varbinds).map((element) => ({
                    oid: element.oid.toString(),
                    deviceName: element.value.toString(),
                }));
    
                res.status(200).json(resultArray);
            }
            session.close();
        });
      } else {
        res.status(405).end();
      }
};