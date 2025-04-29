export function generateCd(prefix) {
    const now = Date.now().toString(); 
    const shortTimestamp = now.slice(-5); 
    const randomPart = Math.floor(Math.random() * 10); 
    return `${prefix}${shortTimestamp}${randomPart}`;
} 