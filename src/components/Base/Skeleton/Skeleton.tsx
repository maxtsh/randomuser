import styles from "./Skeleton.module.scss";
import type { Props } from "./Skeleton.types";

const Skeleton = ({ className, ...props }: Props) => {
  return (
    <div {...props} className={[styles.skeleton, className].join(" ")}></div>
  );
};

export default Skeleton;
