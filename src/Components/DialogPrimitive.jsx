import * as Dialog from "@radix-ui/react-dialog";

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
      <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[480px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-8 focus:outline-none">
        <Dialog.Title className="text-heading-l">{title}</Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogPrimitive;
