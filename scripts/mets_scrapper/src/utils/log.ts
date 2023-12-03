import kleur from 'kleur';

export const LOG = {
    HEADER: 'header',
    INFO: 'info',
} as const;

export function log(type: typeof LOG[keyof typeof LOG], message: string, color = kleur.white): void {
    switch (type) {
        case LOG.HEADER:
            console.log(color(`${message.toUpperCase()}`));
            break;
        default:
            console.log(color(message));
    }
}

export function logHeader(message: string, color = kleur.white): void {
    log(LOG.HEADER, `* ${message}`, color);
}

export function logInfo(message: string, color = kleur.white): void {
    log(LOG.INFO, `   - ${message}`, color);
}

export function logError(message: string): void {
    log(LOG.INFO, `${message}\n`, kleur.red);
}

export function logThinking(padding: string = '') {
    let indicator = '';
    let flashingInterval: NodeJS.Timeout;

    function startThinking(getThinkingMessage = () => '') {
        flashingInterval = setInterval(() => {
            const thinkingMessage = getThinkingMessage();

            if(thinkingMessage){
                process.stdout.write(`\r${padding}${thinkingMessage}`);
            }else{
                process.stdout.write(`\r${padding}${indicator}`);
                indicator += '.';
                if (indicator === '....') {
                    process.stdout.write(`\r${padding}     `);
                    process.stdout.write(`\r`);
                    indicator = '';
                }
            }
        }, 1000);
    }

    function stopThinking() {
        if (flashingInterval) {
            clearInterval(flashingInterval);
            process.stdout.clearLine(0); // Clear the line
            process.stdout.cursorTo(0); // Move the cursor to the beginning of the line
        }
    }

    return {startThinking, stopThinking};
}
