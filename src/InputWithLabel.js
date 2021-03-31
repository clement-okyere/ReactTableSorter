import React, { Fragment } from 'react'
import styles from './App.module.css'

const InputWithLabel = ({ id,
    label,
    onInputChange,
    value,
    type = "text",
    isFocused,
    children }) => {
    const inputRef = React.useRef();

    React.useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused])
    return (
    <Fragment>
        <label htmlFor="search" className={styles.label}>{children}</label>&nbsp;
        <input id={id}
                type={type}
                ref={inputRef}
            value={value}
                onChange={onInputChange}
                className={styles.input}
              />
    </Fragment>
    )
}

export default InputWithLabel;