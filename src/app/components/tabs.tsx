import { useState } from 'react';
import Memo from './memo';
import Reply from './reply';  

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (recentTab: string) => {
        setActiveTab(recentTab);
        localStorage.setItem('savedTab', recentTab);
    };

    return (
        <>
            <ul className='tab-list'>
                <li>
                    <div className={`MemoTab tab ${activeTab === 'tab1' && 'selected'}`} onClick={() => handleTabClick('tab1')}>
                        Memo
                    </div>
                </li>
                <li>
                    <div className={`ReplyTab tab ${activeTab === 'tab2' && 'selected'}`} onClick={() => handleTabClick('tab2')}>
                        Reply
                    </div>
                </li>
            </ul>
            {<div style={{display: activeTab === 'tab1' ? 'block':'none'}}><Memo /></div>}
            {<div style={{display: activeTab === 'tab2' ? 'block':'none'}}><Reply /></div>}
        </>
    );
}

export default Tabs;