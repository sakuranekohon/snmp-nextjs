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
                    <Message title={"學號"} content={"S1054004"} />
                    <Message title={"姓名"} content={"許書瑋"} />
                </div>
                <div>
                    <span>我不知道譨做啥就簡單的查詢了</span>
                </div>
            </div>
        );
    } else {
        return (
            <div className={`${style.fontStyle} ${style.footerPos} ${style.footerContent}`}>
                <div>
                    創作者資訊
                    <Message title={"學號"} content={"S1054004"} />
                    <Message title={"姓名"} content={"許書瑋"} />
                </div>
            </div>
        );
    }
}