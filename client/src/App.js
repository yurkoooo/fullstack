import Header from './components/Header';
import Main from './components/Main';

import {
  useLocation,
} from "react-router-dom";



function App() {
  
  let location = useLocation();

  return (
    <>
    <section className='flex justify-between'>
    <Header />
    </section>
    </>
  );
}

export default App;
