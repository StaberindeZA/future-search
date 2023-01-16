import styles from '@/styles/Searches.module.css';

type TabsProps = {
  tabs: string[];
  setActiveTab: (tab: string) => void;
}

export default function Tabs({tabs, setActiveTab}: TabsProps) {
  return <ul className={styles.tabsContainer}>
      {tabs.map((tab) => (
        <li key={tab}>
          <button onClick={() => setActiveTab(tab)}>{tab}</button>
        </li>
      ))}
    </ul>
}