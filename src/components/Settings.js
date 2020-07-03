import React, { useContext, useState } from 'react';
import { InputGroup, FormControl, Pagination, Button } from 'react-bootstrap';
import { ListContext } from './Contexts';
import '../styles/settings.scss';

function Settings() {
  const displayContext = useContext(ListContext);
  const [tasksToDisplay, setTasksToDisplay] = useState(
    displayContext.displayCount
  );
  function handleKeySubmit(e) {
    let newTasksPerPage = displayContext.displayCount;
    if (e.key === 'Enter' && parseInt(tasksToDisplay, 10)) {
      newTasksPerPage = Math.max(parseInt(tasksToDisplay, 10), 1);
    }

    displayContext.setDisplayCount(newTasksPerPage);
  }

  function handleClick(num) {
    setTasksToDisplay(num);
    displayContext.setDisplayCount(num);
  }

  return (
    <div id="settings">
      <InputGroup className="task-count">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-default">
            Tasks per Page
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="number"
          className="no-arrows text-center"
          label="Tasks Per Page"
          value={tasksToDisplay}
          onChange={(e) => setTasksToDisplay(e.target.value)}
          onKeyPress={handleKeySubmit}
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
      </div>
    </div>
  );
}

export default Settings;
