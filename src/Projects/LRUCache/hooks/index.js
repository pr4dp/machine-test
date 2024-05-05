import { useRef } from "react";
import LRUCache from "../LRUCache";
const useLRUCache = (capacity) => {
  const cacheRef = useRef(new LRUCache(capacity));
  return {
    get: (key) => cacheRef.current.get(key),
    put: (key, val) => cacheRef.current.put(key, val),
  };
};

export default useLRUCache;
