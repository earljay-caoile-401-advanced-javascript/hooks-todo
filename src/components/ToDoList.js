import React, { useEffect, useState } from 'react';
import TodoItem from './ToDoItem';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import If from './If';

/**
 * component holding a list of ToDo items and some supplementary text elements
 * used as a child component of the ToDo component
 *
 * @component
 * @example
 * return (
 *   <TodoList
 *     tasks=[
 *        {
 *          description: 'cook green eggs and ham'
 *          assignedTo: 'Sam I Am',
 *          difficulty: 3,
 *          wasCompleted: false,
 *        },
 *        {
 *          description: 'take a shower',
 *          assignedTo: 'Bob Saget',
 *          difficulty: 1,
 *          wasCompleted: true,
 *        }
 *      ]
    />
 * )
 */
function ToDoList(props) {
  const [incompleteTasks, setIncompleteTasks] = useState(0);
  const [tasksToRender, setTasksToRender] = useState([]);

  useEffect(() => {
    const localTaskArr = [];
    let numIncomplete = 0;

    function updateOneCheckbox(checkStatus, index) {
      const renderToUpdate = localTaskArr[index];
      renderToUpdate.props.task.complete = checkStatus;
      if (checkStatus) {
        numIncomplete--;
      } else {
        numIncomplete++;
      }

      setIncompleteTasks(numIncomplete);
      setTasksToRender(localTaskArr);
    }

    if (props.tasks) {
      for (let i = 0; i < props.tasks.length; i++) {
        const currTask = props.tasks[i];

        localTaskArr.push(
          <TodoItem
            key={i}
            task={currTask}
            index={i}
            onChange={updateOneCheckbox}
          />
        );

        if (!currTask.complete) {
          numIncomplete++;
        }
      }

      setIncompleteTasks(numIncomplete);
      setTasksToRender(localTaskArr);
    }
  }, [props.tasks]);

  useEffect(() => {
    document.title = `ToDo: ${incompleteTasks} ${
      incompleteTasks === 1 ? 'task' : 'tasks'
    } incomplete`;
  }, [incompleteTasks]);

  return (
    <If condition={props.tasks}>
      <h2 className="mb-4">Tasks ToDo</h2>
      <div className="mt-4 mb-4">
        {tasksToRender.length ? (
          <div className="mt-4 mb-4">{tasksToRender}</div>
        ) : (
          <div className="mt-4 mb-4">
            <p className="mt-4 mb-4">
              No tasks to show! Please return to the home page to add a task to
              the todo list.
            </p>
            <Link to="/" className="mt-4 mb-4">
              <Button variant="info" className="btn-lg">
                Return to Form Page
              </Button>
            </Link>
          </div>
        )}
      </div>
    </If>
  );
}

export default ToDoList;
