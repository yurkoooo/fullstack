import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';    

function Detailed({url}) {

  const [detailed, setDetailed] = useState([]);
  let location = useLocation();
    useEffect(() => {
        getDetailedArticle();
    }, [])

    const getDetailedArticle = () => {
        fetch(url, {
            method: 'POST',
            header : {
            'content-type' : "application/json"
            },
            body : JSON.stringify({route : 'detailed', id : location.pathname.slice(1)})
        })
        .then(response => response.json())
        .then((data) =>  setDetailed(...detailed, data));
    }

  
    return (
      <>
       <section className='w-[65%] order-2'>
            <div className='flex flex-col items-center mb-[50px]'>
            {detailed !== null ?
            <>
              <h2 className='text-center mt-[50px] text-[40px] mb-[25px] w-[90%]'>{detailed.title}</h2>
              <img src={`images/${detailed.image}`} alt="" className='w-[400px] h-[400px] mb-[25px] shadow-lg rounded-[12px]' />
              <p className='text-[20px] w-[80%]'>{detailed.description}</p>
            </>
            :
            null
            }            
            </div>
        </section>
      </>
    );
  }
  
  export default Detailed;