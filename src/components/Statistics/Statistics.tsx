import React from 'react';
import './styles.css'
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Legend, Tooltip} from "chart.js";
import {useNavigate} from "react-router-dom";
import Logo from "../Logo/Logo";

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
    const navigate = useNavigate();
    const totalGames = parseInt(localStorage.getItem('totalGames') || '0');
    const totalQuestions = totalGames * 10;

    const totalTime = parseInt(localStorage.getItem('totalTime') || '0')
    const averageTime = totalTime / totalGames;
    const seconds = Math.floor((averageTime / 1000) % 60);
    const minutes = Math.floor(averageTime / 1000 / 60);
    const resultTime = `${minutes} min ${seconds} sec`;

    const incorrect = parseInt(localStorage.getItem('totalIncorrect') || '0');
    const correct = parseInt(localStorage.getItem('totalResult') || '0');


    const data = {
        labels: ['Incorrect', 'Correct'],
        datasets: [
            {
                data: [incorrect, correct],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };

    return (
        <div>
            <div className='logoContainer'>
                <div><Logo/></div>
            </div>
            <div className='playContainer'>
                <div className='divForHome'>
                    <button className='buttonAnswer modified-buttonAnswer' onClick={()=> navigate('/')}>Home</button>
                </div>
                <div className='divStat'>Total games: {totalGames}</div>
                <div className='divStat'>Total questions: {totalQuestions}</div>
                <div className='divStat'>Average time: {resultTime}</div>

                <div className='diagram'>
                    <Doughnut data={data} />
                </div>
            </div>
            <div className='exitContainer'></div>

        </div>
    );
};

export default Statistics;