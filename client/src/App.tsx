import React, { Fragment, useEffect, useState } from "react";

import TaskGroup from "./TaskGroup";
import TaskItem from "./TaskItem";

import { Task } from "./schemaTypes";
import { useQuery, useMutation } from "@apollo/client";
import { GetTasksDocument } from "./graphql/getTasks.generated";
import { ToggleTaskDocument } from "./graphql/toggleTask.generated";

interface TaskGroupInterface {
  [key: string]: Task[];
}

const App = () => {
  const { loading, data } = useQuery(GetTasksDocument);
  const [mutateTasks] = useMutation(ToggleTaskDocument);

  const [taskGroups, setTaskGroups] = useState<TaskGroupInterface>({});
  const [selectedTaskGroup, setSelectedTaskGroup] = useState<string>("");

  useEffect(() => {
    if (data) {
      let taskGroups: TaskGroupInterface = {};
      data.tasks.forEach((task: Task) => {
        if (!taskGroups[task.group]) {
          taskGroups[task.group] = [task];
        } else {
          taskGroups[task.group] = [...taskGroups[task.group], task];
        }
      });
      setTaskGroups(taskGroups);
    }
  }, [data]);

  const findDependencies = (group: string, dependencyIds: number[]) =>
    dependencyIds.reduce((a: boolean, v: number) => {
      const found = taskGroups[group].find(({ id }: Task) => id === v);
      return a || !!(found && found.completedAt === null);
    }, false);

  const toggleTask = (group: string, taskId: number) => {
    mutateTasks({
      variables: {
        toggleTaskToggleTaskInput: { taskId }
      }
    });
    setTaskGroups({
      ...taskGroups,
      [group]: taskGroups[group].map((task: Task) =>
        task.id !== taskId
          ? task
          : {
              ...task,
              completedAt:
                task.completedAt === null
                  ? new Date().toISOString().substring(0, 10)
                  : null
            }
      )
    });
  };

  const goToHome = () => {
    setSelectedTaskGroup("");
  };

  return (
    <Fragment>
      {loading ? (
        <div id="loading">Loading...</div>
      ) : (
        <Fragment>
          <div id="top-items">
            <div id="top-title">
              {!selectedTaskGroup ? "Things To Do" : selectedTaskGroup}
            </div>
            {selectedTaskGroup && (
              <div id="top-return" onClick={() => goToHome()}>
                All Groups
              </div>
            )}
          </div>
          <div className="task-cards">
            {!selectedTaskGroup
              ? Object.keys(taskGroups).map((group: string, key) => (
                  <TaskGroup
                    name={group}
                    key={key}
                    tasks={taskGroups[group]}
                    setSelectedTaskGroup={setSelectedTaskGroup}
                  />
                ))
              : taskGroups[selectedTaskGroup].map((task: Task, key) => (
                  <TaskItem
                    task={task}
                    key={key}
                    findDependencies={findDependencies}
                    toggleTask={toggleTask}
                  />
                ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default App;