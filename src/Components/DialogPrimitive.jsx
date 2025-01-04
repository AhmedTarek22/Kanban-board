import * as Dialog from "@radix-ui/react-dialog";
// import TextField from "./TextField";
// import Button from "./Button";

const DialogPrimitive = ({
  title,
  triggerComponent,
  children,
  isOpen,
  setOpen,
}) => (
  <Dialog.Root open={isOpen} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>{triggerComponent}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
      <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
        <Dialog.Title className="mb-5 text-heading-xl font-jakarta">
          {title}
        </Dialog.Title>
        {children}
        {/* <fieldset className="mb-[15px] flex flex-col gap-2">
          <label className="w-full text-[15px] text-violet11" htmlFor="name">
            Name
          </label>
          <TextField placeholder="e.g. Web Design" />
        </fieldset>
        <fieldset className="mb-[15px] flex flex-col gap-2">
          <label className="w-full text-[15px] text-violet11" htmlFor="name">
            Columns
          </label>
          <div>
            <TextField placeholder="e.g. Web Design" />
          </div>
        </fieldset>
        <div className="mt-[25px] flex flex-col gap-3">
          <Button isFullWidth={true} variant={"secondary"} size={"sm"}>
            + Add New Column
          </Button>
          <Button isFullWidth={true} size={"sm"}>
            Create New Board
          </Button>
        </div> */}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogPrimitive;
