import React, { useState, useEffect, useContext } from 'react';
import TodoItem from './ToDoItem';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { ListContext } from './Contexts';
import Settings from './Settings';

/**
 * component holding a list of ToDo items and some supplementary text elements
 * used as a child component of the ToDo component
 *
 * @component
 * @example
 * return (
 *   <TodoList
 *     tasks={[
 *        {
 *          text: 'cook green eggs and ham'
 *          assignee: 'Sam I Am',
 *          difficulty: 3,
 *          complete: false,
 *        },
 *        {
 *          text: 'take a shower',
 *          assignee: 'Bob Saget',
 *          difficulty: 1,
 *          complete: true,
 *        }
 *      ]}
    />
 * )
 */
function ToDoList(props) {
  const displayContext = useContext(ListContext);

  const [displayItems, setDisplayItems] = useState([]);

  /**
   * hook that handles data from display context to create the list of items to render
   * changes dynamically based on chosen user settings
   */
  useEffect(() => {
    const tasksToRender = [];
    let indexToUse = displayContext.pageIndex;

    const filteredTasks = displayContext.showCompleted
      ? displayContext.results
      : displayContext.results.filter((task) => !task.complete);

    if (
      filteredTasks &&
      displayContext.pageIndex &&
      displayContext.pageIndex * displayContext.displayCount >=
        filteredTasks.length
    ) {
      indexToUse = Math.max(0, displayContext.pageIndex - 1);
    }

    displayContext.setPageIndex(indexToUse);

    let i = 0 + displayContext.pageIndex * displayContext.displayCount;
    let max = Math.min(i + displayContext.displayCount, filteredTasks.length);

    displayContext.setOnLastPage(max === filteredTasks.length);

    for (; i < max; i++) {
      const currTask = filteredTasks[i];
      tasksToRender.push(
        <TodoItem key={currTask + i} data={currTask} index={i} />
      );
    }

    setDisplayItems(tasksToRender);

    return () => {
      setDisplayItems([]);
    };
  }, [displayContext]);

  /**
   * helper function that determines if all tasks are complete
   * used to determine content to display
   * @returns {Boolean} hasOnlyCompleteTasks - whether there are tasks to render, but all of them are complete
   */
  function hasOnlyCompleteTasks() {
    return (
      displayContext &&
      displayContext.results &&
      displayContext.results.length &&
      displayItems &&
      !displayItems.length
    );
  }

  return (
    <>
      <h2 className="text-center mb-4">Tasks ToDo</h2>
      <div className="mt-4 mb-4">
        {props.isLoading ? (
          <LoadingSpinner />
        ) : props.error ? (
          <div className="no-tasks m-4">
            <img src={require('../assets/broken-glass.jpg')} alt="error" />
            <h3 className="mt-5 mb-5 center error">
              Sorry, but our website is currently experiencing issues. Please
              try again later!
            </h3>
          </div>
        ) : displayItems && displayItems.length ? (
          <div className="mb-4 fade-in">
            <Settings />
            <>{displayItems}</>
          </div>
        ) : hasOnlyCompleteTasks() ? (
          <div className="no-tasks">
            <img src={require('../assets/graduated.jpg')} alt="graduated" />
            <p className="mt-4 mb-4 center">Hooray! All tasks are complete!</p>
            <Button
              variant="info"
              className="btn-lg btn-block"
              onClick={() => displayContext.setShowCompleted(true)}
            >
              Show Completed Tasks
            </Button>
          </div>
        ) : (
          <div className="no-tasks">
            <img
              src={require('../assets/empty-notebook.jpg')}
              alt="empty notebook"
            />
            <p className="mt-4 mb-4 center">
              No tasks to show! Please return to the home page to add a task to
              the todo list.
            </p>
            <Link to="/" className="no-underline m-4">
              <Button variant="info" className="btn-lg btn-block">
                Return to Form Page
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default ToDoList;
