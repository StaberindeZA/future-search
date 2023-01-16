import SearchItem, {SearchItemType} from "./SearchItem";

type SearchListProps = {
  items: SearchItemType[];
}

export default function SearchList({items}: SearchListProps) {
  if(!items.length) {
    return <>No search terms found</>;
  }

  return <div>
    <SearchItem 
      {...items[0]}
      header={true}
    />
    {items.map((item) => (
      <SearchItem
        key={item.createdDate}
        {...item}
      />
    ))}
  </div>
}