export default function Reply() {
    if (typeof window !== 'undefined') {
        window.onload = function() {
            let lsname = localStorage.getItem('usrname');
            let lscompname = localStorage.getItem('compname');
            let lssimpname = localStorage.getItem('simpname');
            let lsgreeting = localStorage.getItem('greeting');
            let lsanswer = localStorage.getItem('answer');
            let lsuse = localStorage.getItem('use');
            let lsisEn = localStorage.getItem('isEn');
            let lsspname = localStorage.getItem('spname');

            let name = document.getElementById("clientname") as HTMLInputElement;
            let compname = document.getElementById("compname") as HTMLInputElement;
            let simpname = document.getElementById("simpname") as HTMLInputElement;
            let greeting = document.getElementById("greeting") as HTMLInputElement;
            let answer = document.getElementById("answer") as HTMLInputElement;
            let use = document.getElementById("use") as HTMLInputElement;
            let isEn = document.getElementById("isEn") as HTMLInputElement;
            let spname = document.getElementById("spname") as HTMLInputElement;

            if (lsname) {
                name.value = lsname;
                localStorage.removeItem('usrname');
            }
            if (lscompname) {
                compname.value = lscompname;
                localStorage.removeItem('compname');
            }
            if (lssimpname) {
                simpname.value = lssimpname;
                localStorage.removeItem('greeting');
            }
            if (lsgreeting) {
                greeting.value = lsgreeting;
            }
            if (lsanswer) {
                answer.value = lsanswer;
                localStorage.removeItem('answer');
            }
            if (lsuse == "true") {
                use.checked = true;
                localStorage.removeItem('use');
            }
            if (lsisEn == "true") {
                isEn.checked = true;
            }
            if (lsspname) {
                spname.value = lsspname;
                localStorage.removeItem('isEn');
            }            
        }
        window.addEventListener('beforeunload', function() {
            localStorage.removeItem('usrname');
            localStorage.removeItem('greeting');
            localStorage.removeItem('answer');
            localStorage.removeItem('use');
            localStorage.removeItem('isEn');
            
            let name = document.getElementById("clientname") as HTMLInputElement;
            let compname = document.getElementById("compname") as HTMLInputElement;
            let simpname = document.getElementById("simpname") as HTMLInputElement;
            let greeting = document.getElementById("greeting") as HTMLInputElement;
            let answer = document.getElementById("answer") as HTMLInputElement;
            let use = document.getElementById("use") as HTMLInputElement;
            let isEn = document.getElementById("isEn") as HTMLInputElement;
            let spname = document.getElementById("spname") as HTMLInputElement;
            
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
            localStorage.setItem('spname', spname.value);
        });
        const copybuttons = document.getElementsByClassName('aside-button');
        for ( let i=0; i<copybuttons.length; i++) {
            copybuttons[i].addEventListener('click', function(event) {
                if (event.target){                    
                    let target = event.target as HTMLElement;
                    let li = target.parentNode;
                    let templates = li?.querySelector('.template') as HTMLElement;
                    const template = templates.innerText;
                    navigator.clipboard.writeText(template);
                }
            });
        }
    
    }
    function clearFunc() {
        let name = document.getElementById("clientname") as HTMLInputElement;
        let greeting = document.getElementById("greeting") as HTMLInputElement;
        let answer = document.getElementById("answer") as HTMLInputElement;
        let use = document.getElementById("use") as HTMLInputElement;
        let isEn = document.getElementById("isEn") as HTMLInputElement;

        name.value = "";
        greeting.value = "お問い合わせいただき、誠にありがとうございます。";
        answer.value = "";
        use.checked = false;
        isEn.checked = false;
    }
    function copyFunc() {
        let name = document.getElementById("clientname") as HTMLInputElement;
        let compname = document.getElementById("compname") as HTMLInputElement;
        let simpname = document.getElementById("simpname") as HTMLInputElement;
        let greeting = document.getElementById("greeting") as HTMLInputElement;
        let answer = document.getElementById("answer") as HTMLInputElement;
        let use = document.getElementById("use") as HTMLInputElement;
        let isEn = document.getElementById("isEn") as HTMLInputElement;
        let spname = document.getElementById("spname") as HTMLInputElement;
        let intcom = "";
        let copyText = "";
        if (use.checked) {
            intcom = "#### [Internal Comment for review]\n";
        }
        if (isEn.checked) {
            copyText = intcom + "Hello " + name.value + ",\n\n" + 'Thank you for reaching out to us regarding the issue.\n\n' 
            + answer.value + "\n\nIf you have any further question, please feel free to let us know.\nThank you for your cooperation.\n\nBest regards,\n" + spname.value;
        } else {
            copyText = intcom + name.value + " 様\n\n" + "いつもお世話になっております、" + compname.value + " サポートの" + simpname.value + "です。\n" + greeting.value + "\n\n" + answer.value + "\n\nご不明な点等ございましたらお知らせください。\n何卒よろしくお願いいたします。\n\n" + spname.value;
        }

        navigator.clipboard.writeText(copyText);
    }

    return(
    <div className="tab-contents">
        <h2 className='title'>[Reply Draft]</h2>
        <div className="reply-tab-contents">
            <div className="maintemp">
                <div className="greeting">
                    <input type="text" id="clientname" name="clientname" />　様
                </div>
                <br />
                <div className="greeting">
                    いつもお世話になっております、<input type="text" id="compname"/> サポートの<input type="text" id="simpname"/>です。
                </div>
                <select name="greeting" id="greeting">
                    <option>お問い合わせいただき、誠にありがとうございます。</option>
                    <option>前回のご案内内容を確認いただき、誠にありがとうございます。</option>
                    <option>調査にお時間をいただき、誠にありがとうございます。</option>
                    <option>ご対応いただき、誠にありがとうございます。</option>
                </select>
                <textarea className="textarea" id="answer" typeof="text"></textarea>
                ご不明な点等ございましたらお知らせください。<br />
                何卒よろしくお願いいたします。<br />
                <div className="signature">
                    エンジニア名：<input typeof="text" id="spname" name="spname"/><br />
                </div>
                <div className="funcBtn">
                    <ul>
                        <li>
                            <button onClick={() => clearFunc()}>clear</button>
                        </li>
                        <li>
                            <button onClick={() => copyFunc()}>copy</button>
                        </li>
                        <li className="checkbox">
                            <input type="checkbox" id="use" name="use" />
                            <label htmlFor="use">Internal Comment for review</label>
                            <br />
                            <input type="checkbox" id="isEn" name="isEn" />
                            <label htmlFor="isEn">English</label>
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
                                ※AQX へログイン後の事象発生まで各画面での操作手順を可能な限り詳細にお願いいたします。<br /><br />
                                
                                大変お手数ですが、より正確な回答をするために上記情報をご提示いただけますと幸いです。
                            </div>
                            <button className="copy-ask-for-details aside-button">Copy</button>
                        </li>
                        <li>
                            <h2>ER 提案</h2>
                            <div className="er-hearing template">
                                大変恐れ入りますが、現状 Anaqua では [Description] 機能はご用意しておりません。<br /><br />

                                ご希望に沿うご案内ができず大変恐縮ですが、ご希望の機能を当サポートにて機能拡張（ER、Enhancement Request）として提出することも可能でございます。<br />
                                そうすることで今後のバージョンアップに伴い、機能として実装される可能性がございます。<br /><br />
                                
                                ご希望の際は遠慮なくお申し付けください。
                            </div>
                            <button className="copy-er-hearing aside-button">Copy</button>
                        </li>
                        <li>
                            <h2>ER 提出完了</h2>
                            <div className="er-done template">
                                ご要望の機能は管理番号 [P-number] として ER を提出させていただきました。<br /><br />

                                なお、ER の採用可否の評価と決定、および採用される場合の実現時期の決定は、Anaqua 単独で行います。<br />
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
                            <h2>HyperViewリセット済み</h2>
                            <div className="reset-hv template">
                                HyperView をリセットいたしました。<br /><br />
                                お手数ですが、一度ログアウトしていただき、再ログインしてからダッシュボードがロードされているかをご確認お願いいたします。<br />
                                ※ロードに時間がかかる場合もございます。
                            </div>
                            <button className="copy-reset-hv aside-button">Copy</button>
                        </li>
                        <li>
                            <h2>Upgrade Step1. Email Matt</h2>
                            <div className="upgrade-matt template">
                                @Matt Zinner<br /> 
                                Hi Matt, <br /><br />
                                
                                Thank you for addressing our clients' upgrade requests.<br />
                                [Clientname] requests AQX upgrade. <br />
                                Could you please check the request? <br /><br />
                                
                                Environment: [Production/QA]<br />
                                Current Client Version: [Version]<br />
                                Requested version: [Version]<br /><br />
                                
                                Best Regards,<br />
                                [Name]
                            </div>
                            <button className="copy-upgrade-matt aside-button">Copy</button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>
    );
}