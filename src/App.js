import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./Sidebar";
const Dashboard = lazy(() => import("./Dashboard"));
const TicTacToe = lazy(() => import("./Projects/TicTacToe"));
const LRUCache = lazy(() => import("./Projects/LRUCache"));
const WhackAMole = lazy(() => import("./Projects/WhackAMole"));
const CountDown = lazy(() => import("./Projects/CountDown"));
const FileExplorer = lazy(() => import("./Projects/FileExplorer"));
const Pagination = lazy(() => import("./Projects/Pagination"));
const TextToSpeech = lazy(() => import("./Projects/TextToSpeech"));

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Suspense fallback={<div>Loading....</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tic-tac-toe" element={<TicTacToe />} />
              <Route path="/LRUCache" element={<LRUCache />} />
              <Route path="/whack-a-mole" element={<WhackAMole />} />
              <Route path="/count-down" element={<CountDown />} />
              <Route path="/file-explorer" element={<FileExplorer />} />
              <Route path="/pagination" element={<Pagination />} />
              <Route path="/text-to-speech" element={<TextToSpeech />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
