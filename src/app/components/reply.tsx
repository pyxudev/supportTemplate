import { useEffect, useState } from "react";

type Template = {
    title: string;
    content: string;
};

const Reply = () => {
    const [rplyData, setRplyData] = useState({
        name: '',
        compname: '',
        simpname: '',
        greeting: '',
        answer: '',
        unclear: '',
        use: false,
        isEn: false,
        spname: ''
    });

    useEffect(() => {
        const name = localStorage.getItem('name') as string;
        const compname = localStorage.getItem('compname') as string;
        const simpname = localStorage.getItem('simpname') as string;
        const greeting = localStorage.getItem('greeting') as string;
        const answer = localStorage.getItem('answer') as string;
        const unclear = localStorage.getItem('unclear') as string;
        const use = localStorage.getItem('use') === 'true';
        const isEn = localStorage.getItem('isEn') === 'true';
        const spname = localStorage.getItem('spname') as string;
        setRplyData({ name, compname, simpname, greeting, answer, unclear, use, isEn, spname });
    }, []);
    
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem('name', rplyData.name as string);
            localStorage.setItem('compname', rplyData.compname as string);
            localStorage.setItem('simpname', rplyData.simpname as string);
            localStorage.setItem('greeting', rplyData.greeting as string);
            localStorage.setItem('answer', rplyData.answer as string);
            localStorage.setItem('unclear', rplyData.unclear as string);
            localStorage.setItem('use', rplyData.use ? 'true' : 'false');
            localStorage.setItem('isEn', rplyData.isEn ? 'true' : 'false');
            localStorage.setItem('spname', rplyData.spname as string);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
    }, [rplyData]);
    function replyClearFunc() {
        const name = document.getElementById("clientname") as HTMLInputElement;
        const greeting = document.getElementById("greeting") as HTMLInputElement;
        const answer = document.getElementById("answer") as HTMLInputElement;
        const unclear = document.getElementById("unclear") as HTMLInputElement;
        const use = document.getElementById("use") as HTMLInputElement;
        const isEn = document.getElementById("isEn") as HTMLInputElement;
        
        name.value = "";
        greeting.value = "";
        answer.value = "";
        unclear.value = "";
        use.checked = false;
        isEn.checked = false;

        rplyData.name = "";
        rplyData.greeting = "お問い合わせいただき、誠にありがとうございます。";
        rplyData.answer = "";
        rplyData.unclear = "ご不明な点等ございましたらお知らせください。";
        rplyData.use = false;
        rplyData.isEn = false;
        setRplyData({...rplyData});
    }
    function replyCopyFunc() {
        const name = document.getElementById("clientname") as HTMLInputElement;
        const compname = document.getElementById("compname") as HTMLInputElement;
        const simpname = document.getElementById("simpname") as HTMLInputElement;
        const greeting = document.getElementById("greeting") as HTMLInputElement;
        const unclear = document.getElementById("unclear") as HTMLInputElement;
        const answer = document.getElementById("answer") as HTMLInputElement;
        const use = document.getElementById("use") as HTMLInputElement;
        const isEn = document.getElementById("isEn") as HTMLInputElement;
        const spname = document.getElementById("spname") as HTMLInputElement;
        let clientName = "";
        let greetingText = "\n";
        
        let copyText = "";
        let unclearText = "";

        const intcom =  use.checked ? "#### [Internal Comment for review]\n" : "";

        if (isEn.checked) {
            if (name.value == "") {
                window.alert("Please enter the client name.");
            }
            greetingText = greeting.value == "" ? "\n" : "\nThank you for reaching out to us regarding the issue.\n\n";
            unclearText = unclear.value == "" ? "" : "\n\nIf you have any further questions, please feel free to let us know.";
            copyText = intcom + "Hello " + name.value + ",\n" + greetingText + answer.value + unclearText + "\n\nBest regards,\n" + spname.value;
        } else {
            clientName = name.value == "" ? "" : name.value + " 様\n\n";
            greetingText = greeting.value == "" ? "\n" : greeting.value + "\n\n";
            unclearText = unclear.value == "" ? "" : "\n\nご不明な点等ございましたらお知らせください。";
            copyText = intcom + clientName + "いつもお世話になっております、" + compname.value + " サポートの" + simpname.value + "です。\n" + greetingText + answer.value + unclearText + "\n\n何卒よろしくお願いいたします。\n" + spname.value;
        }

        navigator.clipboard.writeText(copyText);
    }

    // Fetch templates from the server
    const [templates, setTemplates] = useState<Template[]>([]);
    useEffect(() => {
        async function template() {
            const res = await fetch('/api/template',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-forwarded-proto": "https"
                }
            });
            const data = await res.json();
            setTemplates(data.templates);
        }
        template();
    }, []);

    const handleCopy = (content: string) => {
        const text = content.replace(/\\n/g, "\n"); 
        navigator.clipboard.writeText(text);
    }

    return(
    <div className="tab-contents">
        <div className="tab-title">
            <h2 className='title'>[Reply Draft]</h2>
        </div>
        <div className="reply-tab-contents">
            <div className="maintemp">
                <div className="greeting greeting-name">
                    <p><input type="text" id="clientname" name="clientname" onChange={(e) => setRplyData({ ...rplyData, name: e.target.value })} value={rplyData.name} />様</p>
                </div>
                <div className='greeting greeting1'>
                    <p>いつもお世話になっております、<input type="text" id="compname" onChange={(e) => setRplyData({ ...rplyData, compname: e.target.value })} value={rplyData.compname} /> サポートの<input type="text" id="simpname" onChange={(e) => setRplyData({ ...rplyData, simpname: e.target.value })} value={rplyData.simpname} />です。</p>
                </div>
                <div className='greeting greeting-select'>
                    <select name="greeting" id="greeting" typeof="text" onChange={(e) => setRplyData({ ...rplyData, greeting: e.target.value })} value={rplyData.greeting}>
                        <option>お問い合わせいただき、誠にありがとうございます。</option>
                        <option>前回のご案内内容を確認いただき、誠にありがとうございます。</option>
                        <option>調査にお時間をいただき、誠にありがとうございます。</option>
                        <option>ご対応いただき、誠にありがとうございます。</option>
                        <option></option>
                    </select>
                </div>
                <textarea className="textarea" id="answer" typeof="text" onChange={(e) => setRplyData({ ...rplyData, answer: e.target.value })} value={rplyData.answer}></textarea>
                <div className='unclear'>
                    <select name="unclear" id="unclear" typeof="text" onChange={(e) => setRplyData({ ...rplyData, unclear: e.target.value })} value={rplyData.unclear}>
                        <option>ご不明な点等ございましたらお知らせください。</option>
                        <option>上記手順より事象が解決されない場合はお知らせください。</option>
                        <option></option>
                    </select>
                </div>
                <p>何卒よろしくお願いいたします。</p>
                <div className="signature">
                    エンジニア名：<input typeof="text" id="spname" name="spname" onChange={(e) => setRplyData({ ...rplyData, spname: e.target.value })} value={rplyData.spname} /><br />
                </div>
                <div className="funcBtn">
                    <ul>
                        <li className="reply-button">
                            <button onClick={() => replyClearFunc()}>clear</button>
                        </li>
                        <li className="reply-button">
                            <button onClick={() => replyCopyFunc()}>copy</button>
                        </li>
                    </ul>
                    <ul>
                        <li className="reply-checkbox">
                            <label htmlFor="use">
                                <input type="checkbox" id="use" name="use" onChange={(e) => setRplyData({ ...rplyData, use: e.target.checked })} checked={rplyData.use} />Internal Comment for review
                            </label>
                        </li>
                        <li className="reply-checkbox">
                            <label htmlFor="isEn">
                                <input type="checkbox" id="isEn" name="isEn" onChange={(e) => setRplyData({ ...rplyData, isEn: e.target.checked })} checked={rplyData.isEn} />English
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <aside className="sidebar">
                <div className="sidecontain">
                    <ul id="template-list">
                        <ul id="template-list">
                            {templates.map((template, index) => (
                                <li key={index}>
                                <h2>{template.title}</h2>
                                <div className="template" dangerouslySetInnerHTML={{ __html: template.content.replace(/\\n/g, "<br />") }} />
                                <button className="side-copy-button" onClick={() => handleCopy(template.content)}>
                                    Copy
                                </button>
                                </li>
                            ))}
                        </ul>
                    </ul>
                </div>
            </aside>
        </div>
    </div>
    );
};

export default Reply;
