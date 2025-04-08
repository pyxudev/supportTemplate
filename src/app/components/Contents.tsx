import { useContext } from 'react';
import Menu from './Menu';
import { TabContext } from '@/app/page';
import Memo from '@/app/contents/Memo';
import Reply from '@/app/contents/Reply';

export default function () {
  const { tabIndex, setTabIndex } = useContext(TabContext);
  return (
    <>
      <Menu />
      {tabIndex === 0 && <Memo />}
      {tabIndex === 1 && <Reply />}
    </>
  );
}