import Column from "./Column";

const Workspace = () => {
  return (
    <div className="p-6 flex overflow-auto flex-1 h-[calc(100vh-97px)] bg-light-grey gap-4">
      <Column />
      <Column />
    </div>
  );
};

export default Workspace;