import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      {...props}
    />
  );
};
