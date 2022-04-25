import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const Input = React.forwardRef(
  (
    { id, type, label, size, containerClassName, className, error, ...props },
    ref,
  ) => {
    const classes = ['input', `input-${size}`];
    const containerClasses = ['flex flex-col gap-1'];

    if (className) {
      classes.push(className);
    }

    if (containerClassName) {
      containerClasses.push(containerClassName);
    }

    return (
      <div className={containerClasses.join(' ')}>
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
        {error && (
          <div className="px-2 py-1.5 text-sm text-red-400 rounded bg-red-50">
            * {error}
          </div>
        )}
      </div>
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
