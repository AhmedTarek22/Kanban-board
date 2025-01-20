import Card from "./Card";

const Column = ({ title, tasks=[] }) => {
  const addNewTaskHandler = () => {};
  return (
    <div className="flex w-72 shrink-0 flex-col gap-4 self-start rounded-lg bg-lines-light px-2">
      <h2 className="group/column relative top-0 rounded bg-lines-light px-2 py-4 text-heading-s">
        {title} ({tasks.length})
      </h2>
      <div className="mb-5 flex flex-col gap-5">
        {tasks.map((item, index) => (
          <Card key={index} item={item} />
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
