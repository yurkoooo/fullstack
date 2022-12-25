import {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';   

function EditArticle({url}) {

    let location = useLocation();

    const [categories, setCategories] = useState([]);
    const [id, setId] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [minDesc, setMinDesc] = useState('');
    const [img, setImg] = useState('');
    const [category, setCategory] = useState(0);
    
    let navigation = useNavigate();
  
  const getDetailedArticle = () => {
    fetch(url, {
        method: 'POST',
        header : {
        'content-type' : "application/json"
        },
        body : JSON.stringify({route : 'detailed', id : location.pathname.slice(7)})
    })
    .then(response => response.json())
    .then((data) =>  {
      setId(data['id']);
      setTitle(data['title']);
      setMinDesc(data['descr_min']);
      setDescription(data['description']);
      setCategory(data['cid']);
    });
  }

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

  useEffect(() => {
    getDetailedArticle();
    getCategories();
  }, [])

  const editArticle = () => {
    let result = window.confirm('Are you sure?');
        if (result) {
          if(img == '') {
            const data = JSON.stringify({
              id : id,
              title : title,
              min_desc: minDesc,
              description: description,
              category : category,
            });
            const blob = new Blob([data], { type: 'application/json' });
            const file = new File([ blob ], 'edit.json');
            const formData = new FormData();
            formData.append('file', file, 'edit.json');
            fetch(`${url}/editArticle.php`, {
            method: 'POST',
            body : formData
        })
        .then(res => res.text())
        .then(data => console.log(data))
        } else {
          const data = JSON.stringify({
            id : id,
            title : title,
            min_desc: minDesc,
            description: description,
            category : category,
            });
            const blob = new Blob([data], { type: 'application/json' });
            const file = new File([ blob ], 'edit.json');
            const formData = new FormData();
            formData.append('img', img);
            formData.append('file', file, 'edit.json');
            fetch(`${url}/editArticle.php`, {
            method: 'POST',
            body : formData
            })
          .then(res => res.text())
          .then(data => console.log(data))
    }
    navigation('/admin');
  }
}

    return (
      <>
       <section className='w-[65%] order-2'>
            <div className="my-[50px] flex flex-col justify-center items-center w-[500px] min-h-[600px] mx-auto shadow-xl rounded-[22px]">
                <h2 className='text-center text-[35px] my-[25px] font-semibold'>Edit Article</h2>
                <p className='mb-[10px]'>Title</p>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='w-[60%] h-[40px] bg-[#F5F5F5] mb-[15px] pl-[10px] outline-none' />
                <p className='mb-[10px]'>Description</p>
                <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='w-[60%] h-[40px] bg-[#F5F5F5] pt-[10px] mb-[15px] pl-[10px] outline-none' />
                <p className='mb-[10px]'>Minimal Description</p>
                <textarea type="text" value={minDesc} onChange={(e) => setMinDesc(e.target.value)} className='w-[60%] h-[40px] bg-[#F5F5F5] pt-[10px] mb-[15px] pl-[10px] outline-none'/>
                <p className='mb-[10px]'>Image</p>
                <input type="file" className='block w-[60%] text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100' onChange={(e) => setImg(e.target.files[0])}/>
                <p className='my-[10px]'>Category</p>
                <select value={category} onChange={(e) => setCategory(e.target.value)}  className='w-[60%] h-[40px] bg-[#F5F5F5] mb-[15px] pl-[10px] outline-none'> 
                    {categories.map(elem => (
                        <>
                        <option value={elem.id}>{elem.title}</option>
                        </>
                    ))}
                </select>
                <button className='w-[60%] h-[40px] mb-[25px] bg-[#089FE0] transition ease-in-out hover:bg-black text-white mt-[25px] rounded-[10px]' onClick={editArticle}>Edit</button>
            </div>
        </section>
      </>
    );
  }
  
  export default EditArticle;