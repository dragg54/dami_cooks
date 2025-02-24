export function getScreenSize(){
    const screenSize = window.innerWidth
    return {isMobile: screenSize < 600 , isDesktop: screenSize > 600}
}