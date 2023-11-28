import * as React from "react";
import {makeStyles} from "tss-react/mui";
import {SearchBar} from "../components/SearchBar";
import {useStardog} from "../hooks/useStardog";
import {ResponseExample} from "../types/ResponsExample";
import {useQuery} from "../hooks/useQuery";


const useStyles = makeStyles()((theme) => ({
        root: {},
        body: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '0 200px'
        }
    })
);

export const SearchPage = () => {
    const {classes} = useStyles();
    const query = useQuery();
    const searchString = query.get('q') || '';
    const {
        results,
        getNextPage,
        currentPage,
        lastPage
    } = useStardog<ResponseExample>('select distinct ?s ?p ?o where { ?s ?p ?o }');

    const islastPage = currentPage === lastPage;


    return (
        <div className={classes.root}>

            <div className={classes.body}>
                <SearchBar width={'100%'}/>

                <button onClick={() => {
                    if (!islastPage) {
                        getNextPage();
                    }
                }}>Get next page
                </button>

            </div>
        </div>
    );
}
