import TextField from "./TextField";
import Button from "./Button";
import iconCross from "../assets/icon-cross.svg";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../DataContext";

const AddNewBoardForm = ({
  boardId,
  columns = [{ id: Date.now() }],
  title,
  toggleDialog,
}) => {
  const { setData, setSelectedBoardIndex } = useContext(DataContext);
  const [columnArray, setColumnArray] = useState(columns);

  const removeColumnHander = (id) => {
    setColumnArray((prev) => prev.filter((column) => column.id !== id));
  };

  const addNewColumnHander = () => {
    setColumnArray((prev) => [...prev, { id: Date.now() }]);
  };

  const createNewColumnsArray = (formData, columnArray, boardId) => {
    return columnArray.map((column) => {
      const tasksArray = boardId ? columnArray.tasks : [];
      return {
        id: column.id,
        title: formData.get(column.id),
        tasks: tasksArray,
      };
    });
  };

  const updateData = (boardId, boardName, newColumnsArray, setData) => {
    setData((prev) => {
      let newData;
      if (boardId) {
        newData = prev.map((item) => {
          if (item.id === boardId) {
            return {
              ...item,
              title: boardName,
              columns: newColumnsArray,
            };
          }
          return item;
        });
      } else {
        newData = [
          ...prev,
          {
            id: Date.now(),
            title: boardName,
            columns: newColumnsArray,
          },
        ];
        setSelectedBoardIndex(prev.length);
      }
      return newData;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const boardName = formData.get("boardName");
    const newColumnsArray = createNewColumnsArray(
      formData,
      columnArray,
      boardId,
    );

    updateData(boardId, boardName, newColumnsArray, setData);
    toggleDialog(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <h3 className="pb-2 pt-6 text-body-m text-medium-grey">Name</h3>
        <TextField
          placeholder="e.g. Web Design"
          defaultValue={title}
          name="boardName"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="pt-6 text-body-m text-medium-grey" htmlFor="name">
          Columns
        </h3>
        {columnArray.map((obj) => (
          <div key={obj.id} className="flex items-center justify-between gap-3">
            <TextField
              placeholder="e.g. Web Design"
              name={obj.id}
              defaultValue={obj.title}
              required
            />
            <button type="button" onClick={() => removeColumnHander(obj.id)}>
              <img src={iconCross} alt="icon cross" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-[25px] flex flex-col gap-3">
        <Button
          onClick={() => addNewColumnHander()}
          isFullWidth={true}
          variant={"secondary"}
          size={"sm"}
        >
          + Add New Column
        </Button>
        <Button isFullWidth={true} size={"sm"}>
          {boardId ? "Update Board" : "Create New Board"}
        </Button>
      </div>
    </form>
  );
};

export default AddNewBoardForm;
