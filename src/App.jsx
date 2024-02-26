import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Home from './routes/Home';
import LayoutWithOutTopMenu from "./layouts/WithOutTopMenu";
import LayoutWithTopMenu from "./layouts/WithTopMenu";
import Search from './routes/Search';
import Detail from './routes/Detail';

import { useSelector } from "react-redux";
import { selectTheme } from "./redux/Theme/themeSlice";

function App() {
  const theme = useSelector(selectTheme);
  return (
    <Router>
      <div>
        <NavBar />
        <div className='site-wrapper'>
          <Sidebar />
          <div className={theme ? 'dark routes-wraper' : 'light routes-wraper'}>
            <Routes>
              <Route path="/" element={<LayoutWithTopMenu />}>
                <Route index element={<Home />} />
                <Route path='search' element={<Search />} />
              </Route>
              <Route path="/" element={<LayoutWithOutTopMenu />}>
                <Route path='detail' element={<Detail />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
