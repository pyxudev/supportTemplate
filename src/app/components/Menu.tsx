import { useContext } from "react"
import  "@/app/style/tabstyle.css"
import { TabContext } from "@/app/page"

export default function () {
    const  {tabIndex, setTabIndex } = useContext(TabContext);
    return (
        <div style={{display: "flex"}}>
            <div onClick={() => setTabIndex(0)} className={`MemoTab tab ${tabIndex === 0 && "selected"}`}>Memo</div>
            <div onClick={() => setTabIndex(1)} className={`ReplyTab tab ${tabIndex === 1 && "selected"}`}>Reply</div>
        </div>
    );
}
