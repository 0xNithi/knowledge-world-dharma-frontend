import PropTypes from 'prop-types';
import React from 'react';
import './Button.css';

function Button({ color, size, className, children, ...props }) {
  const classes = ['btn'];

  if (className) {
    classes.push(className);
  }

  return (
    <button
      type="button"
      {...props}
      className={[classes, `btn-${color}`, `btn-${size}`].join(' ')}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Button.defaultProps = {
  color: 'default',
  size: 'sm',
};

export default Button;
