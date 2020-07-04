import React, { useContext, useState } from 'react';
import { InputGroup, Pagination, Button, Form } from 'react-bootstrap';
import { ListContext } from './Contexts';
import useForm from '../hooks/useForm';
import '../styles/settings.scss';

/**
 * component holding settings used to customize a list of items and how
 * they are displayed on a page
 *
 * @component
 * @example
 * return (
 *   <Settings />
 * )
 */
function Settings() {
  const [validated, setValidated] = useState(false);
  const { handleSubmit } = useForm(updateTaskView);
  const displayContext = useContext(ListContext);
  const [tasksToDisplay, setTasksToDisplay] = useState(
    displayContext.displayCount
  );

  /**
   * function that changes the number of results to display if "form submission is successful"
   * used as a callback to the useForm custom hook
   */
  function updateTaskView() {
    let newTasksPerPage = displayContext.displayCount;
    const parsedVal = parseInt(tasksToDisplay, 10);

    if (parsedVal) {
      newTasksPerPage = Math.min(
        Math.max(parsedVal, 1),
        displayContext.results.length
      );
    }

    setTasksToDisplay(newTasksPerPage);
    displayContext.setDisplayCount(newTasksPerPage);
  }

  /**
   * helper functions that handles enter key press in the number textbox
   * for results per page
   * @param {Object} e - event object
   */
  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      const canSubmit = handleSubmit(e);
      setValidated(!canSubmit);
    }
  }

  /**
   * function that handles increment and decrement button clicks
   * @param {Number} num
   */
  function handleClick(num) {
    setTasksToDisplay(num);
    displayContext.setDisplayCount(num);
    setValidated(false);
  }

  return (
    <div id="settings">
      <Form noValidate validated={validated}>
        <InputGroup className="task-count">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              Tasks per Page
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="number"
            className="no-arrows text-center"
            label="Tasks Per Page"
            value={tasksToDisplay}
            onChange={(e) => setTasksToDisplay(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <InputGroup.Append>
            <Button
              variant="info"
              className="task-count"
              onClick={() => handleClick(Math.max(tasksToDisplay - 1, 1))}
            >
              -
            </Button>
            <Button
              variant="info"
              className="task-count"
              onClick={() =>
                handleClick(
                  Math.min(tasksToDisplay + 1, displayContext.results.length)
                )
              }
            >
              +
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <div className="task-pages">
        <Pagination>
          <Pagination.Prev
            disabled={displayContext.pageIndex === 0}
            onClick={() => {
              displayContext.setPageIndex(displayContext.pageIndex - 1);
            }}
          >
            {'< Prev'}
          </Pagination.Prev>
          <Pagination.Item active>
            {displayContext.pageIndex + 1}
          </Pagination.Item>
          <Pagination.Next
            disabled={displayContext.onLastPage}
            onClick={() => {
              displayContext.setPageIndex(displayContext.pageIndex + 1);
            }}
          >
            {'Next >'}
          </Pagination.Next>
        </Pagination>
        <Form.Check
          type="checkbox"
          id="task-completed-checkbox-form"
          label="Show Completed Tasks"
          className="show-completed mt-2"
          checked={displayContext.showCompleted}
          onChange={(e) => displayContext.setShowCompleted(e.target.checked)}
        />
      </div>
    </div>
  );
}

export default Settings;
