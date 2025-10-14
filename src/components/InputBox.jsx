import React, { useId } from 'react'

function InputBox({
    amount,
    lable,
    handleAmount = () => { },
    isDisabled = false
}) {

    const id = useId()
    return (
        <div className='input-lable'>
            <label htmlFor={id}> {lable} </label>
            <input type="number"
                className='input'
                id={id}
                placeholder='0'
                value={amount}
                onChange={handleAmount}
                disabled={isDisabled}
            />
        </div>
    )
}

export default InputBox
