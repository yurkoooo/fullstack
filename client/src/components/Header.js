import Main from './Main';
import Login from './Login';
import Register from './Register';
import Detailed from './Detailed';
import Categories from './Categories';
import Category from './Category';
import Admin from './Admin';
import CreateArticle from './CreateArticle';
import EditArticle from './EditArticle';
import {
    Link,
    Routes,
    Route,
    useLocation,
  } from "react-router-dom";

import { useEffect, useState } from 'react';


function Header() {

  const [heading, setHeading] = useState('Main');
  const [url] = useState(process.env.REACT_APP_URL);
  let hasNumber = /\d/;



  useEffect(() => {
    if (heading != location.pathname) {
      if (location.pathname != '/') {
        if (hasNumber.test(location.pathname)) {
          if(location.pathname.includes('/categories/')) {
            setHeading('Category')
          } else {
            setHeading('Detailed Article');
          }
      } else {
        setHeading(location.pathname.slice(1));
      }
      } else {
        setHeading('Main');
      }
      
    }
  })

  let location = useLocation();

    return (
      <>
       <Routes>
        <Route exact path='/' element={<Main url={url}/>} />
        <Route path='/login' element={<Login url={url}/>} />
        <Route path='/register' element={<Register url={url}/>} />
        <Route path='/categories' element={<Categories url={url}/>} />
        <Route path='/categories/:id' element={<Category url={url}/>} />
        <Route path='/:id' element={<Detailed url={url}/>} />
        <Route path='/admin' element={<Admin url={url}/>} />
        <Route path='/admin/createArticle' element={<CreateArticle url={url}/>} />
        <Route path='/admin/:id' element={<EditArticle url={url}/>} />
        </Routes>
      <header className='min-h-[100vh] w-[35%] flex justify-center items-center flex-col bg-[darkcyan] order-1'>
        <div className='flex flex-col items-center fixed top-[40%]'>
        <h1 className='text-[30px] mb-[25px] text-[white] capitalize'>{heading} page</h1>
        <div className='flex justify-center items-center pb-[100px]'>
            {location.pathname != '/login' ?
             <button className='w-[100px] h-[40px] border-[1px] mr-[10px] text-[white] transition-colors hover:bg-black'><Link to='/login'>Login</Link></button> : null}
             {location.pathname != '/register' ?
             <button className='w-[100px] h-[40px] border-[1px] mr-[10px] text-[white] transition-colors hover:bg-black'><Link to='/register'>Register</Link></button> : null}
            {location.pathname != '/' ?
             <button className='w-[100px] h-[40px] border-[1px] text-[white] transition-colors hover:bg-black'><Link to='/'>Main</Link></button> : null}
        </div>
        </div>
    
      </header>
      </>
    );
  }
  
  export default Header;