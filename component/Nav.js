import Link from "next/link";
import style from "../styles/NavFooter.module.css"

export default function Nav({path}) {
    return (
        <nav className={style.navSize}>
            <Link href={path}>SNMP</Link>
            <Link href={"./rmon"}>RMON</Link>
        </nav>);
}