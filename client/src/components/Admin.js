import Pagination from './Pagination';
import {useEffect, useState} from 'react';
import {
  useNavigate
} from "react-router-dom";


function Admin({url}) {

    const [articles, setArticles] = useState([]);
    const [change, setChange] = useState('');
    const [login, setLogin] = useState(''); 
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(5);
    const pageNumbers = [];
    
    for(let i = 1; i <= Math.ceil((articles.length / articlesPerPage)); i++) {
        pageNumbers.push(i);
    }

  let navigation = useNavigate();
  
  useEffect(() => {
    let token = document.cookie.split('; ').reduce((prev, current) => {
        const [name, ...value] = current.split('=');
        prev[name] = value.join('=');
        return prev;
      }, {});
    if (token.hash !== undefined) {
        getUser(token.id, token.hash);
    } else {
        navigation('/login');
    }
    getArticles();
  }, [])

  const getUser = (id, hash) => {
    fetch(`${url}/login.php`, {
          method: 'POST',
          header : {
          'content-type' : "application/json"
          },
          body : JSON.stringify({'submit' : 'getUser', id : id, hash : hash}),
        })
      .then(response => response.json())
      .then((data) => {
        setLogin(data[0]['login']);
      });
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
    if(document.cookie == '') {
        navigation('/login');
    }
  })

  const removeArticle = (e) => {
    let result = window.confirm('Are you sure?');
    if (result) {
      fetch(`${url}/admin.php`, {
      method: 'POST',
      header : {
      'content-type' : "application/json"
      },
      body : JSON.stringify({submit : 'removeArticle', id : e.target.dataset['id']})
    })
    document.location.reload();
    return false;
    }
    }

  const editArticle = (e) => {
    navigation(`/admin/${e.target.dataset['id']}`)
  }

  const createArticle = () => {
    navigation('/admin/createArticle')
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
                <h2 className='text-center text-[40px] font-semibold mb-[20px]'>Admin Panel</h2>
                <p className='mb-[20px] text-[18px]'>Hi, {login}</p>
                <button className='w-[180px] h-[50px] border-[1px] border-black text-[white]
                 bg-[black] rounded-[22px] mb-[20px] transition-colors hover:bg-white hover:text-black' onClick={createArticle}>Create new article</button>
                <div className='flex flex-col justify-center items-center w-[100%]'>
                    {currentArticles.map(elem => (
                        <>
                        <div className='w-[80%] h-[250px] flex items-center shadow-lg
                      border-[black] mb-[25px] cursor-pointer hover:shadow hover:scale-105 transition-shadow transition-transform'  id={elem.id}>
                            <img src={`/images/${elem.image}`} alt="" className='w-[150px] h-[150px] mx-[20px]'/>
                            <div className="flex flex-col justify-around h-[60%] w-[80%]">
                                <h2 className='font-semibold text-[24px]'>{elem.title}</h2>
                                <p className="w-[90%]">{elem.descr_min}</p>
                            </div>
                            <div className='mr-[25px] mt-[30px] flex self-start'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onClick={removeArticle}  strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-[5px] transition-[fill] hover:fill-[red]">
                              <path strokeLinecap="round" strokeLinejoin="round" data-id={elem.id} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onClick={editArticle}  strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transition-[fill] hover:fill-[yellow]">
                              <path strokeLinecap="round" strokeLinejoin="round" data-id={elem.id} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            </div>
                        </div>
                        </>
                    ))}
                </div>
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
  
  export default Admin;