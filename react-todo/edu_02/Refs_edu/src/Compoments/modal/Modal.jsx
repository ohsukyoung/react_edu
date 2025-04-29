import { useImperativeHandle, useRef } from "react";

export default function Alert({ children, ref }) {
  const onClickCloseButton = () => {
    ref.current.close();
  };

  // dialog를 제어할 별도의 ref를 생성.
  const currentRef = useRef();

  // 열고 닫는 함수를 통일시킨다.
  // ref props 에게 함수 객체를 할당함.
  useImperativeHandle(ref, () => {
    return {
      open() {
        console.log("currentRef", currentRef);
        console.log("currentRef.current", currentRef.current);
        currentRef.current.showModal();
      },
      close() {
        currentRef.current.close();
      },
    };
  });

  return (
    <dialog className="modal" ref={ref}>
      <div className="modal-body">
        <section className="modal-close-button" onClick={onClickCloseButton}>
          X
        </section>
        {children}
      </div>
    </dialog>
  );
}
