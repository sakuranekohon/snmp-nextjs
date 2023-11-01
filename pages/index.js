import styles from '../styles/Home.module.css';
import PageHead from '../component/Head';
import Nav from '../component/Nav';
import { searchBtnClick, buttonEvent_lockIP, deleteOIDBtn, buttonEvent_createOIDBtn } from '../public/scripts/HomePageButtonEvent';
import Foot from '../component/Footer';
import InputOID from '../component/InputOID';

export default function Home() {
  const { currentState, lockingBtnClick } = buttonEvent_lockIP();
  const { inputOIDList, createOIDBtn } = buttonEvent_createOIDBtn(styles);
  return (
    <div className={styles.container}>
      <PageHead pageName={"Home Page"} />
      <Nav path={"/"} />
      <div className={styles.main}>
        <div>
          <div>
            <input type='text' placeholder='Target IP' id='targetIP' className={styles.textStyle} />
            <button className={styles.blueButton} onClick={lockingBtnClick}>固定</button>
          </div>
          {inputOIDList}
          <div className={styles.createAndSent}>
            <button id='CreateOIDText' onClick={(event) => createOIDBtn(event, styles)}>Create</button>
            <button id='Search' onClick={searchBtnClick}>Search</button>
          </div>
        </div>
        <div>
          <ul id='infoList' className={styles.listStyle}>
            <li>
              <div className={styles.listSize}>
                <span>OID</span><span>OID Name</span><span>Information</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Foot isHomePage={true} />
    </div>
  );
}