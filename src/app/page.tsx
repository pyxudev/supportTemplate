"use client"
// import Image from "next/image";
// import styles from "./page.module.css";
import { createContext, useState } from 'react';
import Contents from '@/app/components/Contents';
import '@/app/style/pagestyle.css';

export const TabContext = createContext(
  {} as {
    tabIndex: number;
    setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  },
);

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <TabContext.Provider value={{ tabIndex, setTabIndex }}>
        <Contents />
      </TabContext.Provider>
    </>
  );
}