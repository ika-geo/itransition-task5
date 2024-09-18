import {getUsers, setOptions} from "../store/features/users";

const setState = (e, dispatch, stateOption) => {
    if (e.target.value) {
        dispatch(setOptions({[stateOption]: parseFloat(e.target.value)}))
    } else {
        dispatch(setOptions({[stateOption]: 0}))
    }
}

export const setDefaultOptions = (dispatch)=>{
    dispatch(setOptions({page: 1, pageSize:20}))
}

const generateRandomNumber = (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const setError = (e, dispatch) => {
    setState(e, dispatch, 'errorsPerRecord')
    dispatch(getUsers(true))
};

export const setSeed = (e, dispatch) => {
    setState(e, dispatch, 'seed')
    dispatch(getUsers(true))
}

export const setErrorInputOnFocus = (dispatch, errorsPerRecord, handleGetUsers) => {
    if (errorsPerRecord % 1 !== 0) {
        dispatch(setOptions({errorsPerRecord: Math.floor(errorsPerRecord)}))
    }
    handleGetUsers(true)
}

export const generateRandomSeed = (dispatch, ) => {
    let randomSeed = generateRandomNumber(1, 1000)
    dispatch(setOptions({seed: randomSeed}))
    dispatch(getUsers(true))
}

export const keyPress = (e) => {
    const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'
    ];
    if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
    }
    if (parseInt(e.target.value + e.key) > 1000) {
        alert("Max errors per record is 1000")
        e.preventDefault();
    }
};