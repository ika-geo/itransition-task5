export const LazyLoad = (addUsers)=>{
    const handleScroll = () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.body.offsetHeight - 50;
        if (scrollPosition >= threshold) {
            addUsers()
        }
    };
    window.addEventListener('scroll', handleScroll);
}