import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { questAction } from "../../redux";
import Logo from "../Logo/Logo";
import './styles.css'
import Spinner from "../Spinner/Spiner";




const Play = () => {
    const { results } = useAppSelector((state) => state.questReducer.results);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {playCategory} = useParams<{playCategory: string}>();
    const category = playCategory ? parseInt(playCategory) : 9;


    const [showSpinner, setShowSpinner] = useState(true);
    const [questIndex, setQuestIndex] = useState(0);
    const [count, setCount] = useState(0);
    const [incCount, setIncCount] = useState(0);

    useEffect(() => {
        dispatch(questAction.filter(category))
    }, [dispatch, category]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setShowSpinner(false)
        }, 2000);
        return () => {
            clearTimeout(timerId);
        };
    }, []);


    const maxCount = 10;
    const maxIncCount = 10;
    const correctCount = useMemo(() => (count > maxCount ? maxCount : count), [count]);
    const incorrectCount = useMemo(() => (incCount > maxIncCount ? maxIncCount : incCount), [incCount]);



    const thisGameNum = parseInt(localStorage.getItem('totalGames') || '0')
    const playNum = () => {
        const newNum = thisGameNum + 1;
        localStorage.setItem('totalGames', newNum.toString())
    };

    const plusResult = () => {
        const xResult = parseInt(localStorage.getItem('yourResult') || '0')
        const yResult = parseInt(localStorage.getItem('totalResult') || '0');
        const add = yResult + xResult;
        localStorage.setItem('totalResult', add.toString());
    };
    // => this function for correct results


    const plusIncorrect = () => {
        const notCorrect = parseInt(localStorage.getItem('incorrectResult') || '0');
        const allNotCorrect = parseInt(localStorage.getItem('totalIncorrect') || '0');
        const addResults = notCorrect + allNotCorrect;
        localStorage.setItem('totalIncorrect', addResults.toString());
    };
    // => this function for incorrect results;


    const totalTime = parseInt(localStorage.getItem('totalTime') || '0');
    const startGame = useMemo(() => new Date().getTime(), []);
    const timeResult = () => {
        const endGame = new Date().getTime();
        const time = endGame - startGame;
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor(time / 1000 / 60);
        const resultTime = `${minutes} min ${seconds} sec`;
        const total = totalTime + time;
        localStorage.setItem('timeResult', resultTime);
        localStorage.setItem('totalTime', total.toString())

    };


    const finish = () => {
        localStorage.setItem('yourResult', correctCount.toString());
        localStorage.setItem('incorrectResult', incorrectCount.toString())
        plusResult();
        plusIncorrect();
        timeResult();
        playNum();
        navigate('/finish');
    };

    const exit = () => {
        navigate('/')
    }

    const changeQuest = (event:any) => {

        if (questIndex < results.length -1) {
            setQuestIndex(prevIndex => prevIndex +1)
        }
        if (event.target.getAttribute('data-correct') === 'true') {
            setCount(count + 1)
        }
        if (event.target.getAttribute('data-correct') === 'false') {
            setIncCount(incCount + 1)
        }
    };

    const currentQuest = results[questIndex]

    const answersCorrect: string = currentQuest ? currentQuest.correct_answer : '';
    const incorrectAnswer: string[] = currentQuest ? currentQuest.incorrect_answers : [];

    const shuffle = (array: string[]) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };
    const shuffledAnswers = shuffle([answersCorrect, ...incorrectAnswer]);


    return (
            <div className='play'>
                    <div className='container1'>
                        <div className='logoContainer'>
                            <div><Logo/></div>
                        </div>
                        {showSpinner ? (<Spinner/>) : (
                            <div className='playContainer'>
                                <div className='category'>
                                    {results[0] ? (
                                        <div>Category: {results[0].category}</div>
                                    ) : 'No Category'}
                                </div>
                                <div className='numQuestion'>Number of questions: {questIndex + 1 + '/10'}</div>
                                <div>
                                    {correctCount + incorrectCount === 10 ? (
                                        <div className='finish'>
                                            <div>
                                                <button className='buttonAnswer modified-buttonAnswer' onClick={finish}>finish</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                {currentQuest ? (
                                                    <div className='quest'>
                                                        <div className='questions'>{currentQuest.question}</div>
                                                        <div className='answer'>
                                                            <div className='answer1'>
                                                                {shuffledAnswers.map((answer, index) => (
                                                                    <button
                                                                        className='buttonAnswer'
                                                                        key={index}
                                                                        onClick={changeQuest}
                                                                        data-correct={answer === currentQuest.correct_answer ? 'true' : 'false'}
                                                                    >
                                                                        {answer}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>No questions available.</div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className='exitContainer'>
                            <div className='exitDiv'>
                                <div>
                                    <button className='buttonAnswer modified-buttonAnswer' onClick={exit}>Exit</button>
                                </div>
                                <p style={{ color: '#f1d99f' }}>If you click exit your result don't save</p>
                            </div>
                        </div>
                    </div>
            </div>

    );

};

export default Play;
