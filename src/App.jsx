import { useEffect, useState } from "react";
import Header from "./Components/Header";
import SideMenu from "./Components/SideMenu";
import Workspace from "./Components/Workspace";
import { DataContext } from "./DataContext";

function App() {
  const [dataState, setDataState] = useState();
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      setDataState(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (!dataState) return;

    localStorage.setItem("data", JSON.stringify(dataState));
  }, [dataState]);

  return (
    <DataContext.Provider
      value={{
        data: dataState || [],
        setData: setDataState,
        selectedBoardIndex,
        setSelectedBoardIndex,
      }}
    >
      <div className="flex h-screen flex-col font-jakarta">
        <Header />
        <div className="flex flex-1">
          <SideMenu />
          <Workspace />
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
