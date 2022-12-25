
import Pagination from './Pagination';
import {
  Link,
  useNavigate
} from "react-router-dom";

import { useEffect, useState } from 'react';

function Main({url}) {

  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);
  const pageNumbers = [];
    
    for(let i = 1; i <= Math.ceil((articles.length / articlesPerPage)); i++) {
        pageNumbers.push(i);
    }

  const getArticles = () => {
    fetch(url, {
      method: 'POST',
      header : {
      'content-type' : "application/json"
      },
      body : JSON.stringify({route : '/'})
    })
  .then(response => response.json())
  .then((data) =>  setArticles(...articles, data));
  }

  useEffect(() => {
    getArticles();
  },[])

  const navigate = useNavigate();
  
  const getDetailedArticle = (e) => {
    return navigate(`/${e.currentTarget.id}`)
  }

  const getCategories = () => {
    return navigate(`/categories`)
  }
  
  const lastPage = currentPage * articlesPerPage;
  const firstPage = lastPage - articlesPerPage;
  const currentArticles = articles.slice(firstPage, lastPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const prevPage = () => setCurrentPage(prev => currentPage <= 1 ? pageNumbers.length : prev - 1);

  const nextPage = () => setCurrentPage(prev => currentPage >= pageNumbers.length ? 1 : prev + 1);

    return (
      <>
        <section className='w-[65%] order-2'>
          <div className="mt-[50px] mb-[50px] flex flex-col justify-center items-center">
            <h2 className='text-center text-[40px] font-semibold mb-[20px]'>Articles</h2>
            <button className="w-[150px] pb-[50px] h-[40px] hover:scale-105 transition-transform" onClick={getCategories}>See categories</button>
          </div>
            <div className='flex flex-col justify-center items-center'>
                  {currentArticles.map(elem => (
                    <>
                      <div className='w-[80%] h-[250px] flex items-center shadow-lg
                      border-[black] mb-[25px] cursor-pointer hover:shadow hover:scale-105 transition-shadow transition-transform' onClick={getDetailedArticle} id={elem.id}>
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
            articlesPerPage={articlesPerPage}
            totalArticles={articles}
            paginate={paginate}
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={currentPage}
            />
        </section>
      </>
    );
  }
  
  export default Main;