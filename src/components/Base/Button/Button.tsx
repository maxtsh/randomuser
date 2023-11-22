import styles from "./Button.module.scss";
import type { Props } from "./Button.types";

const Button = ({ children, ...restProps }: React.PropsWithChildren<Props>) => {
  return (
    <button
      {...restProps}
      className={[styles.button, restProps.className].join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
