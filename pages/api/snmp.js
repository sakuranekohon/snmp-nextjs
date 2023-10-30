const snmp = require("net-snmp");

export default async function handler(req, res) {
    if (req.method === 'POST') { 
        const { targetIP, OID } = req.body;

        const session = snmp.createSession(targetIP, "public");
        const oid = OID; 

        session.get([oid], (error, varbinds) => {
            if (error) {
                console.error(error);
                res.status(500).end("SNMP request failed");
            } else {
                console.log("Result:", varbinds[0].value.toString());
                res.status(200).json({
                    result: varbinds[0].value.toString()
                });
            }
            session.close();
        });
    } else {
        res.status(405).end();
    }
};