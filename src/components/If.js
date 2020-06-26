import React from 'react';

/**
 * Simple component that renders the children if true, else returns null;
 * @param   {object} props typical React props. Expects an output property
 * @return  {object}  JSX content to be rendered
 */
function If(props) {
  if (props.condition) return <>{props.children}</>;
  else return null;
}

export default If;
