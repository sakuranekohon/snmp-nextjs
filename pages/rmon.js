import Footer from "../component/Footer";
import PageHead from "../component/Head";
import Nav from "../component/Nav";
import { getrmonTable } from "../public/scripts/rmonPageButtonEvent";
import styles from '../styles/Home.module.css';

export default function rmon() {
    return (
        <div className={styles.container}>
            <PageHead pageName={"RMON page"} />
            <Nav path={"./"} />
            <div className={`${styles.rmomMain} ${"pageCenter"} ${styles.rmonMainSet}`}>
                <div className={styles.rmonSearch}>
                    <input type="text" placeholder="Target IP" id="targetIP" className={styles.rmonText} />
                    <button onClick={getrmonTable}>Search</button>
                </div>
                <div>
                    <span>我不做表啦</span>
                </div>
            </div>
            <Footer isHomePage={false} />
            <style jsx>{`
                .pageCenter{
                    justify-content: center;
                }
            `}</style>
        </div>
    )
}