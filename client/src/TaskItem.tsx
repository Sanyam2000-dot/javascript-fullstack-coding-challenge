import { PropsWithChildren } from "react";
import { Task } from "./schemaTypes";
import TaskCard from "./TaskCard";

const TaskItem = ({
  task: { task: taskName, id, completedAt, dependencyIds, group },
  findDependencies,
  toggleTask
}: PropsWithChildren<TaskItemProps>) => {
  const handleTaskItemClick = (id: number) => () => {
    toggleTask(group, id);
  };

  const taskStatus = findDependencies(group, dependencyIds)
    ? "locked"
    : completedAt
    ? "completed"
    : "incomplete";

  return (
    <TaskCard
      iconName={taskStatus}
      handleClick={taskStatus === "locked" ? () => {} : handleTaskItemClick(id)}
    >
      <div className={`task-group-title task-status-${taskStatus}`}>
        {taskStatus === "locked" ? "Locked Task" : taskName}
      </div>
    </TaskCard>
  );
};

export interface TaskItemProps {
  task: Task;
  findDependencies: Function;
  toggleTask: Function;
}

export default TaskItem;