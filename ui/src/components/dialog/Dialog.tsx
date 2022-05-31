import { FC, ReactNode } from "react";
import "./Dialog.styles.css";

interface Props {
  isDialogActive: boolean;
  setDialogTypeActive: () => void;
  childrenComponents?: ReactNode;
}

const Dialog: FC<Props> = ({
  isDialogActive,
  setDialogTypeActive,
  childrenComponents,
}) => {
  return isDialogActive ? (
    <div className="dialog">
      <span className="exit" onClick={() => setDialogTypeActive()}>
        ❌
      </span>
      {childrenComponents}
    </div>
  ) : null;
};

export default Dialog;
