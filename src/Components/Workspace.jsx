import Column from "./Column";

const Workspace = ({ columns }) => {
  return (
    <div className="flex h-[calc(100vh-97px)] flex-1 gap-4 overflow-auto bg-light-grey p-6">
      {columns.map((item, index) => (
        <Column key={index} title={item.title} tasks={item.tasks} />
      ))}
      <button className="w-72 self-start rounded-lg bg-lines-light py-3 text-heading-m text-medium-grey">
        + New Column
      </button>
    </div>
  );
};

export default Workspace;
