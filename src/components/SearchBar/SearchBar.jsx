import React, { useEffect, useRef, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');

    const navigate = useNavigate();
    const handleSearchOnEnter = e => {
        if (e.keyCode === 13 && searchValue) {
            navigate(`products/search/${searchValue}`);
        }
    };

    return (
        <div className="search">
            <input
                placeholder="What Are You Looking For ?"
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={handleSearchOnEnter}
                tabIndex="0"
            />
            <span className="search-icon"
                onClick={() => {
                    if (searchValue) navigate(`products/search/${searchValue}`);
                }}>
                <MdSearch />
            </span>
        </div>
    );
};

export default SearchBar;
