import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = React.forwardRef(
  ({ color, size, className, children, ...props }, ref) => {
    const classes = ['btn', `btn-${color}`, `btn-${size}`];

    if (className) {
      classes.push(className);
    }

    return (
      <button type="button" className={classes.join(' ')} ref={ref} {...props}>
        {children}
      </button>
    );
  },
);

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
