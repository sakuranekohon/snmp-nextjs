import snmp from 'net-snmp';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { vlan } = req.query;
    const targetIP = '192.168.1.1';
    const community = 'public';

    const session = snmp.createSession(targetIP, community);

    const oids = [
      `1.3.6.1.2.1.2.2.1.10.${vlan}`,
      `1.3.6.1.2.1.2.2.1.16.${vlan}`,
    ];

    session.get(oids, (error, varbinds) => {
      if (error) {
        console.error('SNMP request failed:', error);
        res.status(500).json({ error: 'SNMP request failed' });
      } else {
        const inputTraffic = varbinds[0].value || 0;
        const outputTraffic = varbinds[1].value || 0;
        res.status(200).json({ inputTraffic, outputTraffic });
      }
      session.close();
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
