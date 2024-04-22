import { PropsWithChildren } from "react";
import { Task } from "./schemaTypes";
import TaskCard from "./TaskCard";

const TaskGroup = ({
  name,
  tasks,
  setSelectedTaskGroup
}: PropsWithChildren<TaskGroupProps>) => {

  const totalCount = tasks.length;
  const completeCount = tasks.filter(({ completedAt }) => completedAt !== null)
    .length;

  const handleTaskGroupClick = () => {
    setSelectedTaskGroup(name);
  };

  return (
    <TaskCard iconName="group" handleClick={handleTaskGroupClick}>
      <div className="task-group-title">{name}</div>
      <div className="task-group-subtitle">
        {completeCount} of {totalCount} tasks complete
      </div>
    </TaskCard>
  );
};

export interface TaskGroupProps {
  name: string;
  tasks: Task[];
  setSelectedTaskGroup: Function;
}

export default TaskGroup;