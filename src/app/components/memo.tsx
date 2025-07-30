import { useEffect, useState } from 'react';

const Memo = () => {
    const [memoData, setMemoData] = useState({
        invstp: '',
        cosd: '',
        nxtstp: ''
    });
    
    useEffect(() => {
        const invstp = localStorage.getItem('invstp') as string;
        const cosd = localStorage.getItem('cosd')  as string;
        const nxtstp = localStorage.getItem('nxtstp') as string;
        setMemoData({ invstp, cosd, nxtstp });
    }, []);
    
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem('invstp', memoData.invstp as string);
            localStorage.setItem('cosd', memoData.cosd as string);
            localStorage.setItem('nxtstp', memoData.nxtstp as string);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
    }, [memoData]);

    function memoClearFunc() {
        const memo1 = document.getElementById("memo-textarea1") as HTMLInputElement;
        const memo2 = document.getElementById("memo-textarea2") as HTMLInputElement;
        const memo3 = document.getElementById("memo-textarea3") as HTMLInputElement;
        memo1.value = "";
        memo2.value = "";
        memo3.value = "";
        memoData.invstp = "";
        memoData.cosd = "";
        memoData.nxtstp = "";
        setMemoData({ ...memoData });
    }
    function memoCopyFunc() {
        let copyText = "#### [Internal Investigating Memo]\n";
        const memo1 = (document.getElementById("memo-textarea1") as HTMLInputElement).value;
        const memo2 = (document.getElementById("memo-textarea2") as HTMLInputElement).value;
        const memo3 = (document.getElementById("memo-textarea3") as HTMLInputElement).value;

        const sections = [
            { title: "Investigations:", value: memo1 },
            { title: "Considerations:", value: memo2 },
            { title: "Conclusion and next steps:", value: memo3 },
        ];
        for (const section of sections) {
            if (section.value === "") continue;
            copyText += "#### " + section.title + "\n" + section.value + "\n";
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
                    <textarea
                        typeof="text"
                        className="memo-text"
                        id='memo-textarea1'
                        value={memoData.invstp}
                        onChange={(e) => setMemoData({ ...memoData, invstp: e.target.value })}></textarea>
                </li>
            </ul>
            <ul className="memo-section">
                <h4 className='title'>Considerations:</h4>
                <li>
                    <textarea
                        typeof="text"
                        className="memo-text"
                        id='memo-textarea2'
                        value={memoData.cosd}
                        onChange={(e) => setMemoData({ ...memoData, cosd: e.target.value })}></textarea>
                </li>
            </ul>
            <ul className="memo-section">
                <h4 className='title'>Conclusion and next steps:</h4>
                <li>
                    <textarea
                        typeof="text"
                        className="memo-text"
                        id='memo-textarea3'
                        value={memoData.nxtstp}
                        onChange={(e) => setMemoData({ ...memoData, nxtstp: e.target.value })}></textarea>
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

export default Memo;