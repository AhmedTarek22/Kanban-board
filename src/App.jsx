import Button from "./Components/Button";
import DialogPrimitive from "./Components/DialogPrimitive";
import DropdownPrimitive from "./Components/DropdownPrimitive";
import TextField from "./Components/TextField";

function App() {
  return (
    <>
      <Button variant="secondary" size="lg" isFullWidth="true">
        Ahmed
      </Button>
      <TextField defaultValue={"Ahmed"} />
      <DropdownPrimitive
        items={{
          edit: {
            label: "Edit board",
            onclick: () => console.log("Edit"),
          },
          delete: {
            label: "Delete board",
            onclick: () => console.log("Delete"),
          },
        }}
        triggerComponent={() => <button>action</button>}
      />
      <DialogPrimitive title={"ahmed"} isOpen={true}/>
    </>
  );
}

export default App;
