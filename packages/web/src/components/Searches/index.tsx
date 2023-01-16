import Tabs from "./Tabs";
import SearchList from "./SearchList";
import { useState } from "react";
import { SearchItemType } from "./SearchItem";

const tabs = ["Pending", "Past"];
const searchItems: SearchItemType[] = [
  {
    term: 'hello',
    createdDate: 0,
    scheduledDate: 0,
    link: 'http://',
  }
]

export default function Searches() {
  const [activeTab, setActiveTab] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);

  if(!loggedIn) {
    return <>
      To see your searches, please Log In
    </>
  }

  return <>
    <Tabs tabs={tabs} setActiveTab={setActiveTab} />
    <SearchList items={searchItems} />
  </>
}