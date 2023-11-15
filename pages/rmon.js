import Footer from "../component/Footer";
import PageHead from "../component/Head";
import Nav from "../component/Nav";
import styles from '../styles/Home.module.css';

export default function rmon(){
    return (
        <div className={styles.container}>
            <PageHead pageName={"RMON page"}/>
            <Nav path={"./"}/>
            <div className={styles.main}>
                
            </div>
            <Footer isHomePage={false}/>
        </div>
    )
}