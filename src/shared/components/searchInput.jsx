import React from 'react'

const SearchInput = ({label, placeholder, handleInputChangeCB}) => {

    return (
        <div>
            <div className="mb-6">
                <label 
                    htmlFor="search-input" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    {label}
                </label>
                <input 
                    id="search-input"
                    type="text"
                    placeholder={placeholder}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={e => handleInputChangeCB(e.target.value)}
                />
            </div>  
        </div>
    )
}

export default SearchInput