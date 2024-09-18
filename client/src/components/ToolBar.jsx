import React from 'react';

import {useDispatch, useSelector} from "react-redux";
import { FaRandom } from 'react-icons/fa';

import {countries, getUsers, setOptions} from "../store/features/users";
import {generateRandomSeed, keyPress, setError, setErrorInputOnFocus, setSeed} from "../utlis/handleInputs";
import DownloadCSV from "./downloadCSV";


const ToolBar = ({handleGetUsers}) => {
    const dispatch = useDispatch()
    let loading = useSelector(state => state.user.loading)
    let users = useSelector(state => state.user.users)
    let userOptions = useSelector(state => state.user.userOptions)
    let errorsPerRecord = userOptions.errorsPerRecord
    let seed = userOptions.seed

    console.log(userOptions)

    const handleCountryChange = async (e) => {
        let countryId = e.target.value
        dispatch(setOptions({"country": countryId}))
        dispatch(getUsers(true))
    }

    const handleKeyPress = (e) => {
        keyPress(e)
    };

    const handleErrorChange = (e) => {
        setError(e, dispatch, loading)
    };

    const handleSeedChange = (e) => {
        setSeed(e, dispatch)
    }

    const handleErrorInputFocus = () => {
        setErrorInputOnFocus(dispatch, errorsPerRecord, handleGetUsers)
    }

    const handleGenerateRandomSeed = ()=>{
        generateRandomSeed(dispatch, handleGetUsers)
    }

    return (
        <div className='flex items-center justify-between mb-5'>
            <div>
                <span className='mr-4'>
                    Region:
                </span>
                <select className='input'
                        onChange={(e) => handleCountryChange(e)}
                        value={userOptions.country}>

                    {
                        countries.map(country =>
                            <option key={country.id} value={country.id}>{country.name}</option>
                        )
                    }
                </select>
            </div>


            <div className='flex items-center'>
                <span className='mr-4'>Errors: </span>
                <input className='input mr-4'
                       placeholder='errors per record'
                       value={errorsPerRecord}
                       onChange={(e) => handleErrorChange(e)}
                       onFocus={handleErrorInputFocus}
                       onKeyDown={handleKeyPress}
                       type="text"/>

                <input className='input mr-4'
                       placeholder='Errors per record'
                       value={errorsPerRecord}
                       onChange={(e) => handleErrorChange(e)}
                       min={0} max={10} step={0.25}
                       type="range"/>
            </div>

            <div>
                <span className='mr-4'>Seed:</span>
                <input className='input mr-2'
                       placeholder='seed'
                       value={seed}
                       onChange={(e) => handleSeedChange(e)}
                       type="text"/>

                <button
                    className='bg-gray-400 text-white p-2 rounded'
                    onClick={handleGenerateRandomSeed}
                >
                    <FaRandom />
                </button>
            </div>

            <DownloadCSV
                data={users}
            />

        </div>
    );
};

export default ToolBar;