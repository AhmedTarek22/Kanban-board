import Header from "./Components/Header";
import SideMenu from "./Components/SideMenu";
import Workspace from "./Components/Workspace";

function App() {
  return (
    <div className="flex flex-col font-jakarta h-screen">
      <Header />
      <div className="flex flex-1">
        <SideMenu />
        <Workspace />
      </div>
    </div>
  );
}

export default App;
