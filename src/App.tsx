import React from 'react';
import {Route, Routes} from "react-router-dom";

import Play from "./components/Play/Play";
import Home from "./components/Home/Home";
import Finish from "./components/Finish/Finish";
import Statistics from "./components/Statistics/Statistics";


const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path='/stats' element ={<Statistics/>}/>
                <Route path='/play/:playCategory' element={<Play/>}/>
                <Route path='/finish' element={<Finish/>}/>
            </Routes>
        </div>
    );
};

export default App;