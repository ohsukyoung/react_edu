import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function Confirm({
  ref,
  children,
  okHandler = () => {},
  cancelHandler,
}) {
  const confirmRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        confirmRef.current.showModal();
      },
      close() {
        confirmRef.current.close();
      },
    };
  });

  const onClickCloseButton = () => {
    ref.current.close();
  };

  return createPortal(
    <dialog className="modal" ref={confirmRef}>
      <div className="modal-body">
        {children}
        <section className="modal-button-group">
          <button type="button" className="confirm-ok" onClick={okHandler}>
            OK
          </button>
          <button
            type="button"
            className="confirm-cancel"
            onClick={cancelHandler ?? onClickCloseButton}
          >
            Cancel
          </button>
        </section>
      </div>
    </dialog>,
    document.querySelector("#modals")
  );
}
