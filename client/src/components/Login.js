import {useEffect, useState} from 'react';
import {
  useNavigate
} from "react-router-dom";

function Login({url}) {

  const [login, setLogin] = useState('');
  const [incorrectLogin, setIncorrectLogin] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [password, setPassword] = useState('');
  const [ip, setIp] = useState(false);
  const [token, setToken] = useState([]);

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
  
  useEffect(() => {
    if (token.length > 0) {
      if (token[0]['hash']) {
        createCookie();
        console.log(token);
      } else {
        setIncorrect(true);
      }
    }
  })

  useEffect(() => {
    let cookie = document.cookie;
    if (cookie !== '') {
      navigation('/admin');
    }
  }, [])

  const onSubmit = () => {
    if (login !== '' && password !== '') {
        fetch(`${url}/login.php`, {
          method: 'POST',
          header : {
          'content-type' : "application/json"
          },
          body : JSON.stringify({'submit' : 'isCorrect', 'login' : login, 'password' : password, 'ip' : ip}),
        })
      .then(response => response.json())
      .then((data) => {
        setToken(data);
      });
    }
  }

  const createCookie = () => {
    if (token.length > 0) {
      if (token[0]['hash']) {
        if (ip) {
          let now = new Date();
          let time = now.getTime();
          let expireTime = time + 30000*36000;
          now.setTime(expireTime);
          document.cookie = `id=${token[0]['id']};expires=`+now.toUTCString()+';path=/';
          document.cookie = `hash=${token[0]['hash']};expires=`+now.toUTCString()+';path=/';
          navigation('/admin');
        } else {
          let now = new Date();
          let time = now.getTime();
          let expireTime = time + 1000*36000;
          now.setTime(expireTime);
          document.cookie = `id=${token[0]['id']};expires=`+now.toUTCString()+';path=/';
          document.cookie = `hash=${token[0]['hash']};expires=`+now.toUTCString()+';path=/';
          navigation('/admin');
        }
      }
    }
  }

    return (
      <>
       <section className='w-[65%] order-2'>
          <div className="mt-[100px] mb-[50px] flex flex-col justify-center items-center w-[500px] h-[500px] my-0 mx-auto shadow-xl rounded-[22px]">
            <h2 className='text-center text-[35px] mb-[10px] font-semibold'>Sign In</h2>
            <p className='text-[18px] mb-[50px] cursor-pointer hover:opacity-50 transition-opacity' onClick={() => navigation('/register')}>Don't have an account yet?</p>
              <input type="text" name="login" placeholder='Login' onChange={checkLogin} className={`w-[60%] h-[40px] bg-[#F5F5F5] mb-[15px] pl-[10px] outline-none ${incorrectLogin ? 'border-[1px] border-[red]' : ''}`} required />
              <input type="password" name="password" placeholder='Password' onChange={checkPass} className={`w-[60%] h-[40px] bg-[#F5F5F5] mb-[15px] pl-[10px] outline-none ${incorrectLogin ? 'border-[1px] border-[red]' : ''}`} required />
              <div className='flex'>
              <p className='mr-[10px]'>Remember me?</p>
              <input type='checkbox' onChange={e => setIp(e.target.checked)} />
              </div>
              {incorrectLogin || incorrectPassword ? <p className='my-[10px] text-[red] w-[60%] text-center'>Your login and password length must be more than 3 and less than 30 symbols</p> : null}
              {incorrect ? <p className='my-[10px] text-[red] w-[60%] text-center'>Your login or password are incorrect</p> : null}
              <button onClick={onSubmit} className='w-[60%] h-[40px] bg-[#089FE0] transition ease-in-out hover:bg-black text-white mt-[25px] rounded-[10px]'>Click</button>
            </div>
        </section>
      </>
    );
  }
  
  export default Login;