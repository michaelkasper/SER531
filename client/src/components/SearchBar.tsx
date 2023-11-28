import {IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useQuery} from "../hooks/useQuery";

type Props = {
    width?: number | string
}

export const SearchBar = ({width = 600}: Props) => {
    const navigate = useNavigate();
    const query = useQuery();
    const [searchString, setSearchString] = useState<string>(query.get('q') || '');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    }

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            doSearch();
        }
    }

    const doSearch = () => {
        if (searchString) {
            navigate('/search?q=' + searchString);
        }
    }

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
