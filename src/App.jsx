import { useState } from "react";
import Header from "./Components/Header";
import SideMenu from "./Components/SideMenu";
import Workspace from "./Components/Workspace";
import data from "./data.json";

function App() {
  const [dataState, setDataState] = useState(data);
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);

  return (
    <div className="flex h-screen flex-col font-jakarta">
      <Header />
      <div className="flex flex-1">
        <SideMenu
          data={dataState}
          selectedBoardIndex={selectedBoardIndex}
          setSelectedBoardIndex={setSelectedBoardIndex}
        />
        <Workspace columns={dataState[selectedBoardIndex]?.columns} />
      </div>
    </div>
  );
}

export default App;
