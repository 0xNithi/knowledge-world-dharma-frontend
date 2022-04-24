import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const Input = React.forwardRef(
  ({ id, type, label, size, className, ...props }, ref) => {
    const classes = ['input', `input-${size}`];

    if (className) {
      classes.push(className);
    }

    return (
      <>
        {label && (
          <label htmlFor={id} className={`input-label input-label-${size}`}>
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          className={classes.join(' ')}
          ref={ref}
          {...props}
        />
      </>
    );
  },
);

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password']),
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

Input.defaultProps = {
  type: 'text',
  size: 'sm',
};

export default Input;
