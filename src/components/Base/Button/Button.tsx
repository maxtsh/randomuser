import styles from "./Button.module.scss";
import type { Props } from "./Button.types";

const Button = ({ children, className, ...restProps }: Props) => {
  return (
    <button {...restProps} className={[styles.button, className].join(" ")}>
      {children}
    </button>
  );
};

export default Button;
