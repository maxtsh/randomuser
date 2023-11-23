import styles from "./Skeleton.module.scss";
import type { Props } from "./Skeleton.types";

const Skeleton = ({ className, role, ...props }: Props) => {
  return (
    <div
      {...props}
      role={["progressbar", role || ""].join(" ")}
      className={[styles.skeleton, className].join(" ")}></div>
  );
};

export default Skeleton;
