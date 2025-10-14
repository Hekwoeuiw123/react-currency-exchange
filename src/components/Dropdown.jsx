import React, { useId } from 'react'


function Dropdown({ handleDropdown ,  value ,data, isLoading, error  }) {
    const id = useId()
    

    if (isLoading) return <p>Loading currencies...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <label htmlFor={id}>Currency</label>
            <select id={id} onChange={handleDropdown} value={value}>
                {
                    data && (data["supported_codes"]).map(([currency ,c_contry]) => (
                        <option key={currency} value={currency}>
                           {currency} : {c_contry}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default Dropdown
