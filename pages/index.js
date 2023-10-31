import styles from '../styles/Home.module.css';
import PageHead from '../component/Head';
import Nav from '../component/Nav';
import { searchBtnClick } from '../public/scripts/buttonEvent';
import Foot from '../component/Footer';

export default function Home() {
  return (
    <div className={styles.container}>
      <PageHead pageName={"Home Page"} />
      <Nav path={"/"} />
      <div>
        <input type='text' placeholder='Target IP' id='targetIP' className={styles.textStyle}></input>
        <input type='text' placeholder='Search OID' id='OID' className={styles.textStyle}></input>
        <button className={styles.buttonStyle} id='Search' onClick={searchBtnClick}>Search</button>
        <label id='result' className={styles.labelStyle}></label>
      </div>
      <Foot isHomePage={true} />
    </div>
  );
}