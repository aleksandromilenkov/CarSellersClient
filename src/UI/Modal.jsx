import {
    cloneElement,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import { createPortal } from "react-dom";
  import { HiXMark } from "react-icons/hi2";
  import styled from "styled-components";
  import useOutsideClick from "../Utils/Helpers/useOutsideClick";
  
  const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
        @media (max-width: 855px) {
      left:20%;
      transform: translate(0%, -50%);
    }
    @media (max-width: 600px) {
      left:10%;
      transform: translate(0%, -50%);
    }
  `;
  
  const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
  `;
  
  const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.5rem;
    right: 1.9rem;
  
    &:hover {
      background-color: var(--color-grey-100);
    }
  
    & svg {
      width: 2.4rem;
      height: 2.4rem;
      /* Sometimes we need both */
      /* fill: var(--color-grey-500);
      stroke: var(--color-grey-500); */
      color: var(--color-grey-500);
    }
  `;
  
  // version 1 modal :
  // export default function Modal({ children, onClose }) {
  //   return createPortal(
  //     <Overlay>
  //       <StyledModal>
  //         <Button onClick={onClose}>
  //           <HiXMark />
  //         </Button>
  //         <div>{children}</div>
  //       </StyledModal>
  //       ;
  //     </Overlay>,
  //     document.querySelector("body")
  //   );
  // }
  
  // version 2 modal ( Compound Model Component) :
  const ModalContext = createContext();
  
  const Modal = ({ children }) => {
    const [openName, setOpenName] = useState("");
    const close = () => {
      setOpenName("");
    };
    const open = setOpenName;
    return (
      <ModalContext.Provider value={{ openName, open, close }}>
        {children}
      </ModalContext.Provider>
    );
  };
  
  // cloneElement is allowing to pass a prop in the child too :
  
  const Open = ({ children, opens: opensWindowName }) => {
    const { open } = useContext(ModalContext);
  
    return cloneElement(children, { onClick: () => open(opensWindowName) });
  };
  
  function Window({ children, name }) {
    const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick({
    close: close || (() => console.warn("close is undefined")),
  });

  const handleUserKeyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && typeof close === "function") {
        close();
      }
    },
    [close]
  );
    useEffect(()=>{
      window.addEventListener("keydown",handleUserKeyPress)
      return ()=>{
        window.removeEventListener("keydown", handleUserKeyPress)
      }
    },[handleUserKeyPress])
  
    if (name !== openName) return null;
    return createPortal(
      <Overlay>
        <StyledModal ref={ref}>
          <Button onClick={close}>
            <HiXMark />
          </Button>
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </StyledModal>
        ;
      </Overlay>,
      document.querySelector("body")
    );
  }
  
  Modal.Open = Open;
  Modal.Window = Window;
  export default Modal;
  