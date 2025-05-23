"use client"
import { useState } from 'react';
import '@/app/style/pagestyle.css';
import "@/app/style/tabstyle.css"

export default function Home() {
    const [activeTab, setActiveTab] = useState('tab1');

    if (typeof window !== 'undefined') {
        window.onload = function() {
            const invstp = localStorage.getItem('invstp');
            const cosd = localStorage.getItem('cosd');
            const nxtstp = localStorage.getItem('nxtstp');
            const isDisabled = document.getElementsByClassName("memo-isDisabled");

            const lsname = localStorage.getItem('usrname');
            const lscompname = localStorage.getItem('compname');
            const lssimpname = localStorage.getItem('simpname');
            const lsgreeting = localStorage.getItem('greeting');
            const lsanswer = localStorage.getItem('answer');
            const lsuse = localStorage.getItem('use');
            const lsisEn = localStorage.getItem('isEn');
            const lsspname = localStorage.getItem('spname');

            const step1: HTMLInputElement = document.getElementById("memo-textarea1") as HTMLInputElement;
            const step2: HTMLInputElement = document.getElementById("memo-textarea2") as HTMLInputElement;
            const step3: HTMLInputElement = document.getElementById("memo-textarea3") as HTMLInputElement;

            const name = document.getElementById("clientname") as HTMLInputElement;
            const compname = document.getElementById("compname") as HTMLInputElement;
            const simpname = document.getElementById("simpname") as HTMLInputElement;
            const greeting = document.getElementById("greeting") as HTMLInputElement;
            const isDisabledSelect = document.getElementById("greeting-select-disable") as HTMLInputElement;
            const answer = document.getElementById("answer") as HTMLInputElement;
            const isDisabledUnclear = document.getElementById("unclear") as HTMLInputElement;
            const use = document.getElementById("use") as HTMLInputElement;
            const isEn = document.getElementById("isEn") as HTMLInputElement;
            const spname = document.getElementById("spname") as HTMLInputElement;

            if (invstp) {
                step1.value = invstp;
            }
            if (cosd) {
                step2.value = cosd;
            }
            if (nxtstp) {
                step3.value = nxtstp;
            }
            for (let i = 0; i < isDisabled.length; i++) {
                const disableCheck = isDisabled[i] as HTMLInputElement;
                if (localStorage.getItem(disableCheck.id) == "true") {
                    disableCheck.checked = true;
                }
            }
            if (lsname) {
                name.value = lsname;
            }
            if (lscompname) {
                compname.value = lscompname;
            }
            if (lssimpname) {
                simpname.value = lssimpname;
            }
            if (lsgreeting) {
                greeting.value = lsgreeting;
            }
            if (lsanswer) {
                answer.value = lsanswer;
            }
            if (isDisabledSelect) {
                if (localStorage.getItem('greeting-select-disable') == "true") {
                    isDisabledSelect.checked = true;
                }
            }
            if (isDisabledUnclear) {
                if (localStorage.getItem('unclear') == "true") {
                    isDisabledUnclear.checked = true;
                }
            }
            if (lsuse == "true") {
                use.checked = true;
            }
            if (lsisEn == "true") {
                isEn.checked = true;
            }
            if (lsspname) {
                spname.value = lsspname;
            }
        }

        window.addEventListener('beforeunload', function() {
            const invstp = document.getElementsByTagName("textarea")[0].value;
            const cosd = document.getElementsByTagName("textarea")[1].value;
            const nxtstp = document.getElementsByTagName("textarea")[2].value;
            const isDisabled = document.getElementsByClassName("memo-isDisabled");
            const name = document.getElementById("clientname") as HTMLInputElement;
            const compname = document.getElementById("compname") as HTMLInputElement;
            const simpname = document.getElementById("simpname") as HTMLInputElement;
            const greeting = document.getElementById("greeting") as HTMLInputElement;
            const isDisabledSelect = document.getElementById("greeting-select-disable") as HTMLInputElement;
            const answer = document.getElementById("answer") as HTMLInputElement;
            const isDisabledUnclear = document.getElementById("unclear") as HTMLInputElement;
            const spname = document.getElementById("spname") as HTMLInputElement;
            const use = document.getElementById("use") as HTMLInputElement;
            const isEn = document.getElementById("isEn") as HTMLInputElement;

            localStorage.setItem('invstp', invstp);
            localStorage.setItem('cosd', cosd);
            localStorage.setItem('nxtstp', nxtstp);
            for (let i = 0; i < isDisabled.length; i++) {
                const disableCheck = isDisabled[i] as HTMLInputElement;
                if (disableCheck.checked) {
                    localStorage.setItem(disableCheck.id, "true");
                }
                else {
                    localStorage.setItem(disableCheck.id, "false");
                }
            }
            
            localStorage.setItem('usrname', name.value);
            localStorage.setItem('compname', compname.value);
            localStorage.setItem('simpname', simpname.value);
            localStorage.setItem('greeting', greeting.value);
            localStorage.setItem('answer', answer.value);
                        
            if (use.checked) {
                localStorage.setItem('use', "true");
            }
            else {
                localStorage.setItem('use', "false");
            }
            if (isEn.checked) {
                localStorage.setItem('isEn', "true");
            }
            else {
                localStorage.setItem('isEn', "false");
            }
            if (isDisabledSelect.checked) {
                localStorage.setItem('greeting-select-disable', "true");
            }
            else {
                localStorage.setItem('greeting-select-disable', "false");
            }
            if (isDisabledUnclear.checked) {
                localStorage.setItem('unclear', "true");
            }
            else {
                localStorage.setItem('unclear', "false");
            }
            localStorage.setItem('spname', spname.value);
        });

        const copybuttons = document.getElementsByClassName('aside-button');
        for ( let i=0; i<copybuttons.length; i++) {
            copybuttons[i].addEventListener('click', function(event) {
                if (event.target){                    
                    const target = event.target as HTMLElement;
                    const li = target.parentNode;
                    const templates = li?.querySelector('.template') as HTMLElement;
                    const template = templates.innerText;
                    navigator.clipboard.writeText(template);
                }
            });
        }
    }

    return (
        <>
            <ul className='tab-list'>
                <li>
                    <div className={`MemoTab tab ${activeTab === 'tab1' && 'selected'}`} onClick={() => setActiveTab('tab1')}>
                        Memo
                    </div>
                </li>
                <li>
                    <div className={`ReplyTab tab ${activeTab === 'tab2' && 'selected'}`} onClick={() => setActiveTab('tab2')}>
                        Reply
                    </div>
                </li>
            </ul>
            {<div style={{display: activeTab === 'tab1' ? 'block':'none'}}><Memo /></div>}
            {<div style={{display: activeTab === 'tab2' ? 'block':'none'}}><Reply /></div>}
        </>
    );
}

function Memo() {
    function memoClearFunc() {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.value = '';
        });
        const isDisabled = document.getElementsByClassName("memo-isDisabled");
        for (let i = 0; i < isDisabled.length; i++) {
            const disableCheck = isDisabled[i] as HTMLInputElement;
            disableCheck.checked = false;
        }
    }
    function memoCopyFunc() {
        let copyText = "#### [Internal Investigating Memo]\n";
        const textArea = document.getElementsByClassName("memo-section");
        for (let i = 0; i < textArea.length; i++) {
            const isDisable = textArea[i].getElementsByClassName("memo-isDisabled")[0] as HTMLInputElement;
            if (isDisable.checked) {
                continue;
            }
            const title = textArea[i].getElementsByClassName("title")[0] as HTMLHeadingElement;
            const textarea = textArea[i].getElementsByClassName("memo-text")[0] as HTMLTextAreaElement;
            copyText += title.innerText + "\n" + textarea.value + "\n";
        }
        navigator.clipboard.writeText(copyText);
    }
    return(
    <div className="tab-contents">
        <div className="tab-title">
            <h2 className='title'>[Internal Investigating Memo]</h2>
        </div>
        <div className="memo-tab-contents">
            <ul className="memo-section">
                <h4 className='title'>Investigations:</h4>
                <li>
                    <textarea typeof="text" className="memo-text" id='memo-textarea1'></textarea>
                </li>
                <li>
                    <label form="disable1">
                        Disable<input type="checkbox" className="memo-isDisabled" id="disable1" name="isDisabled" />
                    </label>
                </li>
            </ul>
            <ul className="memo-section">
                <h4 className='title'>Considerations:</h4>
                <li>
                    <textarea typeof="text" className="memo-text" id='memo-textarea2'></textarea>
                </li>
                <li>
                    <label form="disable2">
                        Disable<input type="checkbox" className="memo-isDisabled" id="disable2" name="isDisabled" />
                    </label>
                </li>
            </ul>
            <ul className="memo-section">
                <h4 className='title'>Conclusion and next steps:</h4>
                <li>
                    <textarea typeof="text" className="memo-text" id='memo-textarea3'></textarea>
                </li>
                <li>
                    <label form="disable3">
                        Disable<input type="checkbox" className="memo-isDisabled" id="disable3" name="isDisabled" />
                    </label>
                </li>
            </ul>
            <div className="funcBtn">
                <ul>
                    <li>
                        <button onClick={() => memoClearFunc()}>clear</button>
                    </li>
                    <li>
                        <button onClick={() => memoCopyFunc()}>copy</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    );
}
function Reply() {
    function replyClearFunc() {
        const name = document.getElementById("clientname") as HTMLInputElement;
        const greeting = document.getElementById("greeting") as HTMLInputElement;
        const answer = document.getElementById("answer") as HTMLInputElement;
        const use = document.getElementById("use") as HTMLInputElement;
        const isEn = document.getElementById("isEn") as HTMLInputElement;
        const isDisabledSelect = document.getElementById("greeting-select-disable") as HTMLInputElement;
        const isDisabledUnclear = document.getElementById("unclear") as HTMLInputElement;
        

        name.value = "";
        greeting.value = "お問い合わせいただき、誠にありがとうございます。";
        answer.value = "";
        use.checked = false;
        isEn.checked = false;
        isDisabledSelect.checked = false;
        isDisabledUnclear.checked = false;
    }
    function replyCopyFunc() {
        const name = document.getElementById("clientname") as HTMLInputElement;
        const compname = document.getElementById("compname") as HTMLInputElement;
        const simpname = document.getElementById("simpname") as HTMLInputElement;
        const greeting = document.getElementById("greeting") as HTMLInputElement;
        const answer = document.getElementById("answer") as HTMLInputElement;
        const use = document.getElementById("use") as HTMLInputElement;
        const isEn = document.getElementById("isEn") as HTMLInputElement;
        const spname = document.getElementById("spname") as HTMLInputElement;
        const isDisabledSelect = document.getElementById("greeting-select-disable") as HTMLInputElement;
        const isDisabledUnclear = document.getElementById("unclear") as HTMLInputElement;
        let clientName = "";
        let greetingText = "\n";
        let intcom = "";
        let copyText = "";
        let unclearText = "";
        if (use.checked) {
            intcom = "#### [Internal Comment for review]\n";
        }
         if (!isDisabledSelect.checked) {
            greetingText = greeting.value  + "\n\n";
        }
        if (isEn.checked) {
            if (name.value == "") {
                window.alert("Please enter the client name.");
            }
            copyText = intcom + "Hello " + name.value + ",\n\n" + 'Thank you for reaching out to us regarding the issue.\n\n' + answer.value + "\n\nIf you have any further question, please feel free to let us know.\nThank you for your cooperation.\n\nBest regards,\n" + spname.value;
        } else {
            if (name.value != "") {
                clientName = name.value + " 様\n\n"
            }
            if (!isDisabledUnclear.checked){
                unclearText = "\n\nご不明な点等ございましたらお知らせください。"
            }
            copyText = intcom + clientName + "いつもお世話になっております、" + compname.value + " サポートの" + simpname.value + "です。\n" + greetingText + answer.value + unclearText + "\n\n何卒よろしくお願いいたします。\n" + spname.value;
        }

        navigator.clipboard.writeText(copyText);
    }

    return(
    <div className="tab-contents">
        <div className="tab-title">
            <h2 className='title'>[Reply Draft]</h2>
        </div>
        <div className="reply-tab-contents">
            <div className="maintemp">
                <div className="greeting greeting-name">
                    <p><input type="text" id="clientname" name="clientname" />様</p>
                </div>
                <div className='greeting greeting1'>
                    <p>いつもお世話になっております、<input type="text" id="compname"/> サポートの<input type="text" id="simpname"/>です。</p>
                </div>
                <div className='greeting greeting-select'>
                    <select name="greeting" id="greeting">
                        <option>お問い合わせいただき、誠にありがとうございます。</option>
                        <option>前回のご案内内容を確認いただき、誠にありがとうございます。</option>
                        <option>調査にお時間をいただき、誠にありがとうございます。</option>
                        <option>ご対応いただき、誠にありがとうございます。</option>
                    </select>
                    <label htmlFor="greeting-select-disable">
                        Disabled:
                        <input type="checkbox" className="reply-isDisabled" id="greeting-select-disable" name="isDisabled" />
                    </label>
                </div>
                <textarea className="textarea" id="answer" typeof="text"></textarea>
                <div className='unclear'>
                    <p>ご不明な点等ございましたらお知らせください。</p>
                    <label htmlFor="unclear">
                        Disabled:<input type="checkbox" className="reply-isDisabled" id="unclear" name="isDisabled" />
                    </label>
                </div>
                <p>何卒よろしくお願いいたします。</p>
                <div className="signature">
                    エンジニア名：<input typeof="text" id="spname" name="spname"/><br />
                </div>
                <div className="funcBtn">
                    <ul>
                        <li>
                            <button onClick={() => replyClearFunc()}>clear</button>
                        </li>
                        <li>
                            <button onClick={() => replyCopyFunc()}>copy</button>
                        </li>
                        <li className="checkbox">
                            <label htmlFor="use">
                                <input type="checkbox" id="use" name="use" />Internal Comment for review
                            </label>
                            <label htmlFor="isEn">
                                <input type="checkbox" id="isEn" name="isEn" />English
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <aside className="sidebar">
                <div className="sidecontain">
                    <ul>
                        <li>
                            <h2>認識の確認</h2>
                            <div className="ask-for-confirm template">
                                現在ご希望の機能の調査にあたって、以下の認識に相違がないかご確認お願いいたします。<br />
                                - [Question]<br /><br />
                                
                                ご認識と齟齬がある場合はお知らせください。<br />
                            </div>
                            <button className="copy-ask-for-confirm aside-button">Copy</button>
                        </li>
                        <li>
                            <h2>詳細情報質問</h2>
                            <div className="ask-for-details template">
                                現在ご提示のエラーについての調査にあたって、以下の情報をご提供お願いいたします。<br />
                                1. 事象発生レコード：<br />
                                2. 事象再現手順：<br />
                                ※ログイン後の事象発生まで各画面での操作手順を可能な限り詳細にお願いいたします。<br /><br />
                                
                                大変お手数ですが、より正確な回答をするために上記情報をご提示いただけますと幸いです。
                            </div>
                            <button className="copy-ask-for-details aside-button">Copy</button>
                        </li>
                        <li>
                            <h2>ER 提案</h2>
                            <div className="er-hearing template">
                                大変恐れ入りますが、現状 [Description] 機能はご用意しておりません。<br /><br />

                                ご希望に沿うご案内ができず大変恐縮ですが、ご希望の機能を当サポートにて機能拡張（ER、Enhancement Request）として提出することも可能でございます。<br />
                                そうすることで今後のバージョンアップに伴い、機能として実装される可能性がございます。<br /><br />
                                
                                ご希望の際は遠慮なくお申し付けください。
                            </div>
                            <button className="copy-er-hearing aside-button">Copy</button>
                        </li>
                        <li>
                            <h2>ER 提出完了</h2>
                            <div className="er-done template">
                                ご要望の機能は管理番号 [PNumber] として ER を提出させていただきました。<br /><br />

                                なお、ER の採用可否の評価と決定、および採用される場合の実現時期の決定は、弊社単独で行います。<br />
                                恐れ入りますが、お客様からのエスカレーションは承っておりませんので、ご理解およびご了承ください。<br /><br />

                                それでは上記のご報告をもちまして、このチケットのステータスを SOLVED-Filed for Future Consideration といたします。<br />
                                貴重なご意見をいただき、ありがとうございました。
                            </div>
                            <button className="copy-er-done aside-button">Copy</button>
                        </li>
                        <li>
                            <h2>TFS 登録完了</h2>
                            <div className="copy-raise-tfs template">
                                この度はご不便をおかけして大変申し訳ございません。<br /><br />

                                本件は TFS 管理番号 [BUGnumber] として登録させていただきました。<br />
                                担当者から返答いただき次第ご報告いたします。<br /><br />

                                大変恐縮ですが、今しばらくお待いただくようお願い申し上げます。
                            </div>
                            <button className="copy-raise-tfs aside-button">Copy</button>
                        </li>
                        <li>
                            <h2>サービスリセット済み</h2>
                            <div className="reset-hv template">
                                [ServiceName] をリセットいたしました。<br /><br />
                                お手数ですが、一度ログアウトしていただき、再ログインしてからダッシュボードがロードされているかをご確認お願いいたします。<br />
                                ※ロードに時間がかかる場合もございます。
                            </div>
                            <button className="copy-reset-hv aside-button">Copy</button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>
    );
}
