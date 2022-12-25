import {useEffect, useState} from 'react';
import {
  useNavigate
} from "react-router-dom";

function Categories({url}) {
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = () => {
        fetch(url, {
            method: 'POST',
            header : {
            'content-type' : "application/json"
            },
            body : JSON.stringify({route : 'categories'})
        })
        .then(response => response.json())
        .then((data) =>  setCategories(...categories, data));
    }

    const navigate = useNavigate();

    const getCategory = (e) => {
      return navigate(`/categories/${e.currentTarget.id}`)
    }

    return (
      <>
       <section className='w-[65%] order-2'>
            <h2 className='text-center mt-[50px] font-semibold text-[35px] mb-[50px]'>Categories</h2>
            <div className='flex flex-col justify-center items-center'>
              {categories.map(elem => (
                <>
                <div className='w-[60%] h-[150px] flex flex-col justify-center items-center shadow-lg
                      border-[black] mb-[25px] cursor-pointer hover:shadow hover:scale-105
                       transition-shadow transition-transform' onClick={getCategory} id={elem.id}>
                <p className='text-[25px]'>{elem.title}</p>
                <p>{elem.description}</p>
                </div>
                </>
              ))}
            </div>
        </section>
      </>
    );
  }
  
  export default Categories;