import React, {FC, useEffect, useState} from 'react';
import './styles.css'

import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {categoryAction} from "../../redux";
import {ICategory} from "../../intarfaces";
import Logo from "../Logo/Logo";



const Home: FC = () => {
    const {category} = useAppSelector(state => state.categoryReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
     dispatch(categoryAction.getAll())
    }, [dispatch]);

    const [selectedCategory, setSelectedCategory] = useState<number>(9);

    const showCategory = () => {
        navigate(`/play/${selectedCategory}`);
    };

    const categoryId = category.trivia_categories.map(item => item.id);
    const randomCategory = () => {
        const randomId = categoryId[Math.floor(Math.random() * categoryId.length)];
        navigate(`/play/${randomId}`);
    }

    return (
        <div className='home'>
            <div className='logoContainer'>
                <div><Logo/></div>
            </div>
            <div className='playContainer'>
                <div className='statsButton'>
                    <button className='button' onClick={()=> navigate('/stats')}>Stats</button>
                </div>
                <div className='choose'>Choose category</div>
                <div className='selectForm'>
                    <select className='select' onChange={(e) => setSelectedCategory(Number(e.target.value))}>
                        {category.trivia_categories.map((item:ICategory)=> (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <div className='buttonDiv'>
                        <button className='button' type='button' onClick={showCategory}>Play</button>
                        <button className='button' type='button' onClick={randomCategory}>I'm lucky</button>
                    </div>
                </div>
            </div>
            <div className='exitContainer'>
            </div>

        </div>
    );
};

export default Home;