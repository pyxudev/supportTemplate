export default function Memo() {
    if (typeof window !== 'undefined') {
        window.onload = function() {
            let invstp = localStorage.getItem('invstp');
            let cosd = localStorage.getItem('cosd');
            let nxtstp = localStorage.getItem('nxtstp');

            const step1: HTMLInputElement = document.getElementById("memo-textarea1") as HTMLInputElement;
            const step2: HTMLInputElement = document.getElementById("memo-textarea2") as HTMLInputElement;
            const step3: HTMLInputElement = document.getElementById("memo-textarea3") as HTMLInputElement;

            if (invstp) {
                step1.value = invstp;
                localStorage.removeItem('invstp');
            }
            if (cosd) {
                step2.value = cosd;
                localStorage.removeItem('cosd');

            }
            if (nxtstp) {
                step3.value = nxtstp;
                localStorage.removeItem('nxtstp');
            }
        }

        window.addEventListener('beforeunload', function() {
            let invstp = document.getElementsByTagName("textarea")[0].value;
            let cosd = document.getElementsByTagName("textarea")[1].value;
            let nxtstp = document.getElementsByTagName("textarea")[2].value;

            localStorage.setItem('invstp', invstp);
            localStorage.setItem('cosd', cosd);
            localStorage.setItem('nxtstp', nxtstp);
        });
    }

    function clearFunc() {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.value = '';
        });
    }
    function copyFunc() {
        let copyText = "#### [Internal Investigating Memo]\n";
        let textArea = document.getElementsByTagName("textarea");
        let textList = ["#### Investigations:", "#### Considerations:", "#### Conclusion and next steps:"];
        for (let i = 0; i< 3; i++) {
            copyText += textList[i] + "\n" + textArea[i].value + "\n";
        }
        navigator.clipboard.writeText(copyText);
    }
    return(
    <div className="tab-contents">
        <h2 className='title'>[Internal Investigating Memo]</h2>
        <div className="memo-tab-contents">
            <h4>Investigations:</h4>
            <textarea typeof="text" id="memo-textarea1"></textarea>
            <h4>Considerations:</h4>
            <textarea typeof="text" id="memo-textarea2"></textarea>
            <h4>Conclusion and next steps:</h4>
            <textarea typeof="text" id="memo-textarea3"></textarea>
            <div className="funcBtn">
                <ul>
                    <li>
                        <button onClick={() => clearFunc()}>clear</button>
                    </li>
                    <li>
                        <button onClick={() => copyFunc()}>copy</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    );
}