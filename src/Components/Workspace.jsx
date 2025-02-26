import { useContext } from "react";
import Column from "./Column";
import { DataContext } from "../DataContext";

/**
 *
 * @param {Object} props
 * @param {Array} props.columns
 * @param {Object} props.columns.id
 * @param {Array} props.columns.tasks
 * @param {String} props.columns.title
 * @returns {JSX.Element}
 */

const Workspace = () => {
  const { data, selectedBoardIndex } = useContext(DataContext);
  const columns = data[selectedBoardIndex]?.columns;

  return (
    <div className="flex h-[calc(100vh-97px)] flex-1 gap-4 overflow-auto bg-light-grey p-6">
      {columns?.length &&
        columns.map((item, index) => (
          <Column key={index} title={item.title} tasks={item.tasks} />
        ))}
      <button className="w-72 self-start rounded-lg bg-lines-light py-3 text-heading-m text-medium-grey">
        + New Column
      </button>
    </div>
  );
};

export default Workspace;
