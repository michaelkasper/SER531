export function formatElapsedTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let response = '';
    if (hours > 0) {
        response += `${hours}h `;
    }
    if (minutes > 0) {
        response += `${minutes}m `;
    }

    response += ` ${seconds}s`;
    return response.trim();
}
