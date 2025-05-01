import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function Alert({ ref, children }) {
  const alertRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        alertRef.current.showModal();
      },
      close() {
        alertRef.current.close();
      },
    };
  });

  const onClickCloseButton = () => {
    ref.current.close();
  };

  return createPortal(
    <dialog className="modal" ref={alertRef}>
      <div className="modal-body">
        <section className="modal-close-button" onClick={onClickCloseButton}>
          X
        </section>
        {children}
      </div>
    </dialog>,
    document.querySelector("#modals")
  );
}
