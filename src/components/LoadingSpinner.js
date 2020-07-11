import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

/**
 * component that displays while an API fetch function is taking place
 * uses Font Awesome to display the magic
 * @return  {object}  JSX content to be rendered
 */
function LoadingSpinner() {
  return (
    <div className="loading">
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  );
}

export default LoadingSpinner;
