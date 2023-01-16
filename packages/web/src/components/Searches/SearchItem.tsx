import styles from '@/styles/Searches.module.css';

export type SearchItemType = {
  term: string;
  createdDate: number;
  scheduledDate: number;
  link: string | null;
}

function buildHeader(item: SearchItemType) {
  if (!item) {
    return;
  }
  return Object.keys(item)
    .map(
      (item) => item
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .split(' ')
        .map((char) => `${char[0].toUpperCase()}${char.slice(1)}`)
        .join(' ')
    );
}


export type SearchItemProps = SearchItemType & { header?: boolean };

export default function SearchItem({header = false, ...searchItem}: SearchItemProps) {
  const term: SearchItemType = searchItem;
  const headerItems = buildHeader(term);

  console.log({term, headerItems});
  if(!headerItems) {
    console.log({headerItems})
    return null;
  }

  const termDisplay = header ? headerItems[0] : term.term;
  const createdDateDisplay = header ? headerItems[1] : new Date(term.createdDate).toDateString();
  const scheduledDateDisplay = header ? headerItems[2] : new Date(term.scheduledDate).toDateString();
  const linkDisplay = header ? headerItems[3] : term.link;

  return (
    <div className={styles.itemContainer}>
      <div className={styles.item}>{termDisplay}</div>
      <div className={styles.item}>{createdDateDisplay}</div>
      <div className={styles.item}>{scheduledDateDisplay}</div>
      <div className={styles.item}>{linkDisplay}</div>
    </div>
  )
}