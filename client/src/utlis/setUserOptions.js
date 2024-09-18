export const setUserOptions = (userOptions, newUsers) => {
    let options = {...userOptions}
    if (newUsers){
        options.page = 20;
    }
};