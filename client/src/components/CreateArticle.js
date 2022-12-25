import {useEffect, useState} from 'react';
import {
  useNavigate
} from "react-router-dom";

function CreateArticle({url}) {

    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [minDesc, setMinDesc] = useState('');
    const [img, setImg] = useState('');
    const [category, setCategory] = useState(1);

    let navigation = useNavigate();

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

    const createArticle = () => {
        let result = window.confirm('Are you sure?');
        if (result) {
            const data = JSON.stringify({
                title : title,
                min_desc: minDesc,
                description: description,
                category : category,
            })
            const blob = new Blob([data], { type: 'application/json' });
            const file = new File([ blob ], 'create.json');
            const formData = new FormData();
            formData.append('img', img);
            formData.append('file', file, 'create.json');
            fetch(`${url}/createArticle.php`, {
            method: 'POST',
            body : formData
            })
            navigation('/admin');
    }
        }

    return (
      <>
       <section className='w-[65%] order-2'>
            <div className="my-[50px] flex flex-col justify-center items-center w-[500px] min-h-[600px] mx-auto shadow-xl rounded-[22px]">
                <h2 className='text-center text-[35px] my-[25px] font-semibold'>Create Article</h2>
                <input type="text" value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} className='w-[60%] h-[40px] bg-[#F5F5F5] mb-[15px] pl-[10px] outline-none' />
                <textarea type="text" value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} className='w-[60%] h-[40px] bg-[#F5F5F5] pt-[10px] mb-[15px] pl-[10px] outline-none' />
                <textarea type="text" value={minDesc} placeholder='Minimal Description' onChange={(e) => setMinDesc(e.target.value)} className='w-[60%] h-[40px] bg-[#F5F5F5] pt-[10px] mb-[15px] pl-[10px] outline-none'/>
                <p className='mb-[10px]'>Image</p>
                <input type="file" className='block w-[60%] text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100' onChange={(e) => setImg(e.target.files[0])}/>
                <p className='my-[10px]'>Category</p>
                <select onChange={(e) => setCategory(e.target.value)} className='w-[60%] h-[40px] bg-[#F5F5F5] mb-[15px] pl-[10px] outline-none'> 
                    {categories.map(elem => (
                        <>
                        <option value={elem.id}>{elem.title}</option>
                        </>
                    ))}
                </select>
                <button className='w-[60%] h-[40px] mb-[25px] bg-[#089FE0] transition ease-in-out hover:bg-black text-white mt-[25px] rounded-[10px]' onClick={createArticle}>Create</button>
            </div>
        </section>
      </>
    );
  }
  
  export default CreateArticle;