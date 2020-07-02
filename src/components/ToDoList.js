import React, { useState, useEffect, useContext } from 'react';
import TodoItem from './ToDoItem';
import { Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import If from './If';
import LoadingSpinner from './LoadingSpinner';
import { ListContext } from './Settings';

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
 *      ]
    />
 * )
 */
function ToDoList(props) {
  const displayData = useContext(ListContext);
  const [pageIndex, setPage] = useState(0);
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    const tasksToRender = [];

    if (props.tasks) {
      let i = 0 + pageIndex * displayData.displayCount;
      let max = Math.min(i + displayData.displayCount, props.tasks.length);

      for (i; i < max; i++) {
        const currTask = props.tasks[i];

        tasksToRender.push(
          <TodoItem
            key={currTask + i}
            task={currTask}
            index={i}
            editTask={props.editTask}
            deleteTask={props.deleteTask}
          />
        );
      }
    }

    setDisplayItems(tasksToRender);
  }, [
    props.tasks,
    pageIndex,
    displayData.displayCount,
    props.deleteTask,
    props.editTask,
  ]);

  return (
    <If condition={props.tasks}>
      <h2 className="mb-4">Tasks ToDo</h2>
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
        ) : displayItems.length ? (
          <div className="mt-4 mb-4 fade-in">
            <Pagination>
              <If condition={pageIndex - 1 >= 0}>
                <Pagination.Prev
                  onClick={(e) => {
                    e.target.disabled = pageIndex - 1 < 0;
                    setPage(pageIndex - 1);
                  }}
                >
                  {'< Prev'}
                </Pagination.Prev>
              </If>
              <Pagination.Item active>{pageIndex + 1}</Pagination.Item>
              <If condition={pageIndex + 1 < displayItems.length}>
                <Pagination.Next
                  onClick={(e) => {
                    setPage(pageIndex + 1);
                  }}
                >
                  {'Next >'}
                </Pagination.Next>
              </If>
            </Pagination>
            <>{displayItems}</>
          </div>
        ) : (
          <div className="no-tasks m-4">
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
    </If>
  );
}

export default ToDoList;
