import Link from "next/link";
import style from "../styles/NavFoot.module.css"

export default function Nav({path}) {
    return (
        <nav className={style.navSize}>
            <Link href={path}>SNMP</Link>
        </nav>);
}