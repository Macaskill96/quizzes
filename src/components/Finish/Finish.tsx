import React from 'react';

import {useNavigate} from "react-router-dom";
import Logo from "../Logo/Logo";
import './styles.css'


const Finish = () => {
    const navigate = useNavigate();

    const result = parseInt(localStorage.getItem('yourResult') || '0');
    const yourTime = localStorage.getItem('timeResult');
    const percent = result * 10;

    const again = () => {
        navigate('/');
        localStorage.removeItem('yourResult')
    }
    return (
        <div>
            <div className='logoContainer'>
                <div><Logo/></div>
            </div>
            <div className='playContainer'>
               <div className='containerFinishResult'>
                   <div className='divFinishPage'>Your result: {result}</div>
                   <div className='divFinishPage'>Points: {result}</div>
                   <div className='divFinishPage'>Your time: {yourTime}</div>
                   <div className='divFinishPage'>Correct answer: {percent}%</div>
                   <div>
                       <button className='buttonAnswer modified-buttonAnswer' onClick={again}>Try again</button>
                   </div>
               </div>
            </div>
            <div className='exitContainer'>
            </div>
        </div>
    );
};

export default Finish;