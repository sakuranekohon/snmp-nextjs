export default function InputOID({styles,buttonClick}){
    return(
        <div><input type='text' placeholder='Search OID' name='OID' className={styles.textStyle} /><button className={styles.redButton} onClick={buttonClick}>刪除</button></div>
    );
}