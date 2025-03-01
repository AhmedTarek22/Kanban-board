import { useContext } from "react";
import Card from "./Card";
import { DataContext } from "../DataContext";

/**
 * @param {Object} props
 * @param {String} props.title
 * @param {Array} props.tasks
 * @returns {JSX.Element}
 */

const Column = ({ id, title, tasks = [] }) => {
  const { selectedBoardIndex, setData, data } = useContext(DataContext);

  const createNewTask = () => ({
    id: Date.now(),
    title: "New Task",
  });

  const createNewColumnArray = (dataArray, boardIndex, newTask) => {
    return dataArray[boardIndex].columns.map((column) => {
      if (column.id === id) {
        return {
          ...column,
          tasks: [
            ...(Array.isArray(column.tasks) ? column.tasks : []),
            newTask,
          ],
        };
      }
      return column;
    });
  };

  const addNewTaskHandler = () => {
    const newTask = createNewTask();
    const newColumns = createNewColumnArray(data, selectedBoardIndex, newTask);
    setData((prev) => {
      const newData = [...prev];
      newData[selectedBoardIndex] = {
        ...newData[selectedBoardIndex],
        columns: newColumns,
      };
      return newData;
    });
  };

  const onDeleteHandler = () => {
    if (window.confirm(`Are you sure you want to delete this "${title}"?`)) {
      setData((prev) => {
        const newData = [...prev];
        newData[selectedBoardIndex] = {
          ...newData[selectedBoardIndex],
          columns: newData[selectedBoardIndex].columns.filter(
            (column) => column.id !== id,
          ),
        };
        return newData;
      });
    }
  };

  return (
    <div className="flex w-72 shrink-0 flex-col gap-4 self-start rounded-lg bg-lines-light px-2">
      <h2 className="group/column relative top-0 rounded bg-lines-light px-2 py-4 text-heading-s">
        {title} ({tasks.length})
        <button
          className="absolute bottom-0 right-0 top-0 p-2 text-body-m text-red opacity-0 duration-300 focus:opacity-100 group-hover/column:opacity-100"
          onClick={onDeleteHandler}
        >
          Delete
        </button>
      </h2>
      <div className="mb-5 flex flex-col gap-5">
        {tasks.map((item, index) => (
          <Card key={index} item={item} columnId={id} />
        ))}
      </div>
      <button
        onClick={addNewTaskHandler}
        className="-mx-2 mt-auto border-t border-light-grey px-2 py-4 text-heading-m text-medium-grey"
      >
        + Add New Task
      </button>
    </div>
  );
};

export default Column;
