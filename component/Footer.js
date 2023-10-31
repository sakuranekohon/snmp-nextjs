import style from "../styles/NavFooter.module.css"

function Message({ title, content }) {
    return (<div>{title + " : " + content}</div>);
}

export default function Footer({ isHomePage }) {
    if (isHomePage === true) {
        return (
            <div className={`${style.fontStyle} ${style.footerPos} ${style.footerContent}`}>
                <div>
                    創作者資訊
                    <Message title={"Github"} content={"sakuranekohon"} />
                    <Message title={"Mail"} content={"stanly92012525@gmail.com"} />
                </div>
                <div>
                    <span>透過Next.js此全端網頁框架來完成的前後端分離小頁面，此專案內容為查詢及修改網路設備資訊，並顯示出來其內容，另外也當做學習Next.js的小道路</span>
                </div>
            </div>
        );
    } else {
        return (
            <div className={`${style.fontStyle} ${style.footerPos} ${style.footerContent}`}>
                <div>
                    創作者資訊
                    <Message title={"Github"} content={"sakuranekohon"} />
                    <Message title={"Mail"} content={"stanly92012525@gmail.com"} />
                </div>
            </div>
        );
    }
}