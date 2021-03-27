import React, { Fragment } from 'react'

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
        <label htmlFor="search">{children}</label>&nbsp;
        <input id={id}
                type={type}
                ref={inputRef}
            value={value}
            onChange={onInputChange}
              />
    </Fragment>
    )
}

export default InputWithLabel;