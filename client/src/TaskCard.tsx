import { PropsWithChildren } from "react";
import Icon from "./icon";

const TaskCard = ({
  iconName,
  handleClick,
  children
}: PropsWithChildren<TaskCardProps>) => (
  <div className="task-card" onClick={handleClick}>
    <div className="task-icon">
      <Icon name={iconName} />
    </div>
    <div className="task-body">
      <div className="task-group">{children}</div>
    </div>
  </div>
);

export interface TaskCardProps {
  iconName: string;
  handleClick: (event: React.MouseEvent) => void;
}

export default TaskCard;