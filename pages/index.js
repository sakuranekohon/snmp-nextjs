import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { searchBtnClick } from '../scripts/buttonEvent';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Snmp information</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <input type='text' placeholder='Target IP/port' id='targetIP' className={styles.textStyle}></input>
      <input type='text' placeholder='Search OID' id='OID' className={styles.textStyle}></input>
      <button className={styles.buttonStyle} id='Search' onClick={searchBtnClick}>Search</button>
      <label id='result' className={styles.labelStyle}></label>
    </div>
  );
}