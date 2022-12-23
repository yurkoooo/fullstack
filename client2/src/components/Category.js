import Pagination from './Pagination';
import {useEffect, useState} from 'react';
import {
    useLocation,
    useNavigate
} from "react-router-dom";


function Category() {
    
    const [category, setCategory] = useState([]);
    const [nameCategory, setNameCategory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(5);

    let location = useLocation();

    useEffect(() => {
        getCategory();
        getNameCategory();
    }, [])

    const getCategory = () => {
        fetch('http://test3.ua', {
            method: 'POST',
            header : {
            'content-type' : "application/json"
            },
            body : JSON.stringify({route : 'category', id : location.pathname.slice(12)})
        })
        .then(response => response.json())
        .then((data) =>  setCategory(...category, data));
    }

    const getNameCategory = () => {
        fetch('http://test3.ua', {
            method: 'POST',
            header : {
            'content-type' : "application/json"
            },
            body : JSON.stringify({route : 'nameCategory', id : location.pathname.slice(12)})
        })
        .then(response => response.json())
        .then((data) =>  setNameCategory(...nameCategory, data));
    }

    const navigate = useNavigate();

    const getDetailedArticle = (e) => {
        return navigate(`/${e.currentTarget.id}`)
    }

    const lastPage = currentPage * articlesPerPage;
    const firstPage = lastPage - articlesPerPage;
    const currentArticles = category.slice(firstPage, lastPage);
  
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
    const prevPage = () => setCurrentPage(prev => currentPage <= 1 ? 4 : prev - 1);
  
    const nextPage = () => setCurrentPage(prev => currentPage >= 4 ? 1 : prev + 1);

    return (
      <>
      {console.log(nameCategory)}
       <section className='w-[65%] order-2'>
            {nameCategory !== null ?
            <>
            <div className='flex flex-col mt-[50px] items-center mb-[50px]'>
                <h2 className='text-center text-[25px] mb-[25px]'>{nameCategory.title}</h2>
                <p>{nameCategory.description}</p>
            </div>
            </> 
                :
                <>
                <h2 className='text-center mt-[50px] text-[25px] mb-[50px]'>Category</h2>
                </>
            }
            <div className='flex flex-col justify-center items-center'>
            {currentArticles.map(elem => (
                    <>
                        <div className='w-[80%] h-[250px] flex items-center shadow-lg
                      border-[black] mb-[25px] cursor-pointer hover:shadow hover:scale-105
                       transition-shadow transition-transform' onClick={getDetailedArticle} id={elem.id}>
                        <img src={`/images/${elem.image}`} alt="" className='w-[150px] h-[150px] mx-[20px]'/>
                        <div className="flex flex-col justify-around h-[60%]">
                            <h2 className="font-semibold text-[24px]">{elem.title}</h2>
                            <p className="w-[90%]">{elem.descr_min}</p>
                        </div>
                      </div>
                    </>
                    ))}
            </div>
            <Pagination 
            jobsPerPage={articlesPerPage}
            totalArticles={category}
            paginate={paginate}
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={currentPage}
            />
        </section>
      </>
    );
  }
  
  export default Category;