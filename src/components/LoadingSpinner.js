import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

/**
 * Stretch goal component from lab 23 (displays while fetching API data)
 * @return  {object}  JSX content to be rendered
 */
function LoadingSpinner() {
  return (
    <div className="loading">
      Loading...&nbsp;
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  );
}

export default LoadingSpinner;
