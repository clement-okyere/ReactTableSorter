import React, { Fragment } from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label`
  border-top: 1px solid #171212;
  border-left: 1px solid #171212;
  padding-left: 5px;
  font-size: 24px;
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;
  font-size: 24px;
`;

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
        <StyledLabel htmlFor="search" >{children}</StyledLabel>&nbsp;
        <StyledInput id={id}
                type={type}
                ref={inputRef}
                value={value}
                onChange={onInputChange}
              />
    </Fragment>
    )
}

export default InputWithLabel;