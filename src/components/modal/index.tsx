import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";

type ModalProps = {
  children: ReactNode | ReactNode[];
  isVisible: boolean;
};

export const Modal = ({ children, isVisible }: ModalProps) => {
  return isVisible
    ? createPortal(
        <div className={styles.backdrop}>
          <div className={styles.modalContainer}>{children}</div>
        </div>,
        document.getElementById("portal")!
      )
    : null;
};
