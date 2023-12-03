import React, {useEffect} from "react";
import {IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUrlQuery} from "../hooks/useUrlQuery";

type Props = {
    width?: number | string
}

export const SearchBar = ({width = 600}: Props) => {
    const navigate = useNavigate();
    const query = useUrlQuery();
    const urlQuerySting = query.get('q') || '';
    const [searchString, setSearchString] = useState<string>(urlQuerySting);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchString(e.target.value);
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            doSearch();
        }
    }

    const doSearch = () => {
        if (searchString) {
            navigate('/search?q=' + searchString);
        }
    }

    useEffect(() => {
        setSearchString(urlQuerySting)
    }, [urlQuerySting]);

    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: width}}
        >
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Search"
                inputProps={{'aria-label': 'search'}}
                name="search"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                value={searchString}
            />
            <IconButton type="button" sx={{p: '10px'}} aria-label="search" onClick={doSearch}>
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}
