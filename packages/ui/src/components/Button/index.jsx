import PropTypes from 'prop-types';
import React from 'react';
import './Button.css';

const Button = React.forwardRef(
  ({ color, size, type, className, children, ...props }, ref) => {
    const classes = ['btn', `btn-${color}`, `btn-${size}`];

    if (className) {
      classes.push(className);
    }

    return (
      <button
        type={type === 'submit' ? 'submit' : 'button'}
        className={classes.join(' ')}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Button.defaultProps = {
  color: 'default',
  size: 'sm',
  type: 'button',
};

export default Button;
