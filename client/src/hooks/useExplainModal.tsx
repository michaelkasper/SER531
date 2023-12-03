import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {ExplainModal} from "../components/ExplainModal";
import {StardogExplained} from "../types/StardogExplained";

type Context = {
    openExplain: (explainTitle: string, explained: StardogExplained) => void;
};

export const ExplainModalContext = createContext<Context>({
    openExplain: (explainMessage) => null
});


export const ExplainModalProvider = ({children}: PropsWithChildren<unknown>) => {
    const [explainTitle, setExplainTitle] = useState('');
    const [explain, setExplain] = useState<StardogExplained | null>(null);
    const [open, setOpen] = useState(false);

    const handelOpen = (explainTitle: string, explained: StardogExplained) => {
        setExplainTitle(explainTitle);
        setExplain(explained);
        setOpen(true);
    }

    const handelClose = () => {
        setOpen(false);
    }

    return (
        <ExplainModalContext.Provider
            value={{
                openExplain: handelOpen
            }}
        >
            {children}
            <ExplainModal
                title={explainTitle}
                open={open}
                onClose={handelClose}
                explained={explain}
            />
        </ExplainModalContext.Provider>);
};


export const useExplainModal = (): Context => useContext(ExplainModalContext)
