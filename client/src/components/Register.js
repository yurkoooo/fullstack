import {useEffect, useState} from 'react';
import {
  useNavigate
} from "react-router-dom";

function Register({url}) {

  const [login, setLogin] = useState('');
  const [isExist, setIsExist] = useState('');
  const [incorrectLogin, setIncorrectLogin] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [password, setPassword] = useState('');

  let navigation = useNavigate();

    const checkLogin = (e) => {
      let login = e.target.value.trim();
      if (login.length >= 4 && login.length < 30 ) {
        setLogin(login);
        setIncorrectLogin(false);
      } else {
        setIncorrectLogin(true);
      }
    }

    const checkPass = (e) => {
      let password = e.target.value.trim();
      if (password.length >= 4 && password.length < 30 ) {
        setPassword(password);
        setIncorrectPassword(false);
      } else {
        setIncorrectPassword(true);
      }
    }

    const onSubmit = () => {
      if (login !== '' && password !== '') {
          fetch(`${url}/register.php`, {
            method: 'POST',
            header : {
            'content-type' : "application/json"
            },
            body : JSON.stringify({'submit' : 'isLoginExist', 'login' : login})
          })
        .then(response => response.text())
        .then((data) => {
          setIsExist(data)
        });
        }
    }

    useEffect(() => {
      if (isExist !== 'exist' && isExist !== '') {
        createNewUser();
      }
    })

    const createNewUser = () => {
      if (login !== '' && password !== '' && isExist !== 'exist' && isExist !== '') {
        fetch(`${url}/register.php`, {
          method: 'POST',
          header : {
          'content-type' : "application/json"
          },
          body : JSON.stringify({'submit' : 'createNewUser', 'login' : login, 'password' : password})
        })
      .then(response => response.text())
      .then((data) => {
      });
      navigation('/login');
      }
    }

    
  
    return (
      <>
      <section className='w-[65%] order-2'>
          <div className="mt-[100px] mb-[50px] flex flex-col justify-center items-center w-[500px] h-[500px] my-0 mx-auto shadow-xl rounded-[22px]">
            <h2 className='text-center text-[35px] mb-[10px] font-semibold'>Create Account</h2>
            <p className='text-[18px] mb-[50px] cursor-pointer hover:opacity-50 transition-opacity' onClick={() => navigation('/login')}>Already have account?</p>
              <input type="text" name="login" placeholder='Login' onChange={checkLogin} className={`w-[60%] h-[40px] bg-[#F5F5F5] mb-[15px] pl-[10px] outline-none ${incorrectLogin ? 'border-[1px] border-[red]' : ''}`} required />
              <input type="password" name="password" placeholder='Password' onChange={checkPass} className={`w-[60%] h-[40px] bg-[#F5F5F5] mb-[15px] pl-[10px] outline-none ${incorrectPassword ? 'border-[1px] border-[red]' : ''} `} required />
              {isExist == 'exist' ? <p className='my-[10px] text-[red] w-[60%] text-center'>Login is exist, type another one</p> : null}
              {incorrectLogin || incorrectPassword ? <p className='my-[10px] text-[red] w-[60%] text-center'>Your login and password length must be more than 3 and less than 30 symbols</p> : null}
              <button onClick={onSubmit} className='w-[60%] h-[40px] bg-[#089FE0] transition ease-in-out hover:bg-black text-white mt-[25px] rounded-[10px]'>Sign Up</button>
            </div>
        </section>
      </>
    );
  }
  
  export default Register;