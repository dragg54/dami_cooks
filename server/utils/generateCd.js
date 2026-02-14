    import { randomUUID } from 'crypto';


export function generateCd(prefix) {
    const now = Date.now().toString(); 
    const shortTimestamp = now.slice(-6); 
    const randomPart = Math.floor(Math.random() * 10); 
    return `${prefix}${shortTimestamp}${randomPart}`;
} 

export function generateUniqueId() {
const guid = randomUUID();
return guid;    
}

generateUniqueId()