import { useContext, useMemo } from "react";
import Column from "./Column";
import { DataContext } from "../DataContext";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

/**
 * @param {Object} props
 * @param {Array} props.columns
 * @param {Object} props.columns.id
 * @param {Array} props.columns.tasks
 * @param {String} props.columns.title
 * @returns {JSX.Element}
 */

const Workspace = () => {
  const { data, setData, selectedBoardIndex } = useContext(DataContext);
  const columns = data[selectedBoardIndex]?.columns;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const addNewColumnHandler = () => {
    const num = data[selectedBoardIndex].columns.length;
    setData((prev) => {
      const newData = [...prev];
      newData[selectedBoardIndex] = {
        ...newData[selectedBoardIndex],
        columns: [
          ...newData[selectedBoardIndex].columns,
          {
            id: Date.now(),
            title: `New Column ${num}`,
            tasks: [],
          },
        ],
      };
      return newData;
    });
  };

  const tasksIds = useMemo(() => {
    let tasksIds = [];
    if (!columns || columns.length === 0) return tasksIds;
    for (let column of columns) {
      if (column.tasks && Array.isArray(column.tasks)) {
        tasksIds = [...tasksIds, ...column.tasks.map((task) => task.id)];
      }
    }
    return tasksIds;
  }, [columns]);

  const onDragOverHandler = (event) => {
    const { active, over } = event;
    const activeId = active.id;

    const overColumnId = over?.data?.current?.columnId;
    const activeColumnId = active?.data?.current?.columnId;

    if (overColumnId && activeColumnId !== overColumnId) {
      const newColumns = columns.map((column) => {
        if (column.id === overColumnId) {
          const activeTask = columns
            .find((column) => column.id === activeColumnId)
            .tasks.find((task) => task.id === activeId);
          const tasks = [...column.tasks, activeTask];
          return { ...column, tasks };
        }
        if (column.id === activeColumnId) {
          const tasks = column.tasks.filter((task) => task.id !== activeId);

          return { ...column, tasks };
        }
        return column;
      });

      setData((prev) => {
        const newData = [...prev];
        newData[selectedBoardIndex] = {
          ...newData[selectedBoardIndex],
          columns: newColumns,
        };
        return newData;
      });
    }
  };

  const onDragEndHandler = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setData((prev) => {
      const newData = [...prev];
      const columns = newData[selectedBoardIndex].columns;

      for (let column of columns) {
        const activeIndex = column.tasks.findIndex(
          (task) => task.id === activeId,
        );
        const overIndex = column.tasks.findIndex((task) => task.id === overId);
        if (activeIndex !== -1 && overIndex !== -1) {
          column.tasks = arrayMove(column.tasks, activeIndex, overIndex);
          break;
        }
      }
      return newData;
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEndHandler}
      onDragOver={onDragOverHandler}
    >
      <div className="flex h-[calc(100vh-97px)] flex-1 gap-4 overflow-auto bg-light-grey p-6">
        <SortableContext
          items={tasksIds}
          strategy={verticalListSortingStrategy}
        >
          {columns?.length &&
            columns.map((item, index) => (
              <Column
                key={`${item.id}${item.title}`}
                id={item.id}
                title={item.title}
                tasks={item.tasks}
                columnIndex={index}
              />
            ))}
        </SortableContext>
        {data.length !== 0 && (
          <button
            onClick={addNewColumnHandler}
            className="w-72 self-start rounded-lg bg-lines-light py-3 text-heading-m text-medium-grey"
          >
            + New Column
          </button>
        )}
      </div>
    </DndContext>
  );
};

export default Workspace;
