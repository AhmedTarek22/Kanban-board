/**
 * @param {Object} props
 * @param {Object} props.item
 * @returns {JSX.Element}
 */

import { useContext, useState } from "react";
import { DataContext } from "../DataContext";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

const Card = ({ item, columnId }) => {
  const { setData, selectedBoardIndex } = useContext(DataContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
      data: { columnId },
    });

  const onDeleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      setData((prev) => {
        const newData = [...prev];
        const newColumns = newData[selectedBoardIndex].columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== item.id),
            };
          }
          return column;
        });
        newData[selectedBoardIndex] = {
          ...newData[selectedBoardIndex],
          columns: newColumns,
        };
        return newData;
      });
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(true);
  };

  const onFocusHandler = (e) => {
    e.target.select();
  };

  const onBlurHandler = (e) => {
    setIsEditMode(false);
    if (e.target.value.trim() === item.title) return;
    setData((prev) => {
      const newData = [...prev];
      const newColumns = newData[selectedBoardIndex].columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: column.tasks.map((task) => {
              if (task.id === item.id) {
                return {
                  ...task,
                  title: e.target.value.trim(),
                };
              }
              return task;
            }),
          };
        }
        return column;
      });
      newData[selectedBoardIndex] = {
        ...newData[selectedBoardIndex],
        columns: newColumns,
      };
      return newData;
    });
  };

  const onKeyDownHandler = (e) => {
    e.key === "Enter" && e.target.blur();
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="group/card relative min-h-16 overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {isEditMode ? (
        <textarea
          className="h-full resize-none text-heading-m outline-light-grey"
          defaultValue={item.title}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onKeyDown={onKeyDownHandler}
          autoFocus
        ></textarea>
      ) : (
        <button
          onClick={toggleEditMode}
          className="peer h-full text-start text-heading-m"
        >
          {item.title}
        </button>
      )}
      {/* <p>{item.description}</p> */}
      <button
        className="absolute bottom-0 right-0 top-0 bg-white p-2 text-body-m text-red opacity-0 shadow duration-300 focus:opacity-100 group-hover/card:opacity-100 peer-focus:opacity-100"
        onClick={onDeleteHandler}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
