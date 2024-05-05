import { useState } from "react";
import List from "./components/List";
import Posts from "./components/Posts";
import Comments from "./components/Comments";
import Albums from "./components/Albums";
import Photos from "./components/Photos";
import Todos from "./components/Todos";
import useLRUCache from "./hooks";

const LRUCache = () => {
  const [currentTab, setCurrentTab] = useState("Posts");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("UNINIT");
  const { get, put } = useLRUCache(3);

  const TABS = {
    Posts: <Posts data={data} state={status} />,
    Comments: <Comments data={data} state={status} />,
    Albums: <Albums data={data} state={status} />,
    Photos: <Photos data={data} state={status} />,
    Todos: <Todos data={data} state={status} />,
  };

  const loadData = async (tab) => {
    setStatus("PENDING");
    const response = await fetch(`https://jsonplaceholder.typicode.com/${tab.toLowerCase()}`);
    const responseData = await response.json();
    setStatus("SUCCESS");
    put(tab, responseData);
    setData(responseData);
  };

  const handleTab = (tab) => {
    const cachedContent = get(tab);

    console.log("cachedContent ", cachedContent);
    if (cachedContent) {
      setData(cachedContent);
    } else {
      loadData(tab);
    }
    setCurrentTab(tab);
  };
  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {Object.keys(TABS).map((tab, idx) => (
            <List key={idx} name={tab} isActive={currentTab === tab} onClick={() => handleTab(tab)} />
          ))}
        </ul>
      </div>
      {TABS[currentTab]}
    </div>
  );
};

export default LRUCache;
