export const LazyLoad = (addUsers, setLoader, loading)=>{
    const handleScroll = () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.body.offsetHeight - 50;
        if (scrollPosition >= threshold) {
            setLoader()
            setTimeout(()=>{
                if (loading){
                    addUsers()
                }
            }, 200)
        }
    };
    window.addEventListener('scroll', handleScroll);
}