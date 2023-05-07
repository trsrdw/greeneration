import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/header';
import Home from './components/Home/home';
import Login from './components/Users/login';

import WasteList from './components/Waste/list';
import WasteCreate from './components/Waste/create';
import WasteEdit from './components/Waste/edit';

import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <div className="App">
      <Header />
      
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path='/wastelist' element={<WasteList />} />
            <Route path='/wastelist/create' element={<WasteCreate />}></Route>
            <Route path='/wastelist/edit/:wstid' element={<WasteEdit />}></Route>
          </Route>
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
