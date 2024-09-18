export const LazyLoad = (addUsers, loading)=>{
    const handleScroll = () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.body.offsetHeight - 50;
        if (scrollPosition >= threshold) {
            if (!loading){
                window.scrollTo({
                    top: window.scrollY - 100
                });
                addUsers()
            }
        }
    };
    window.addEventListener('scroll', handleScroll);
}