import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {Provider} from 'react-redux';
import {setupStore} from "./redux";
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
 <Provider store={store}>
     <BrowserRouter>
         <React.StrictMode>
             <App />
         </React.StrictMode>
     </BrowserRouter>
 </Provider>
);

