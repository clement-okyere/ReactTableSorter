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

type IInputLabelProps = {
  id: string;
  value: string;
  type?: string;
  isFocused?: boolean;
  children: React.ReactNode;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputWithLabel = ({ id,
    onInputChange,
    value,
    type = "text",
    isFocused,
    children }: IInputLabelProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null!);

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