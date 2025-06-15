import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { get } from '../service/http.service';

const Login:React.FC=()=>{
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>(''); 
   const navigate = useNavigate();



  //  const shandleSubmit = async (e: React.FormEvent) => {
  //    e.preventDefault();
  //    console.log('Login form submitted', { email, password });
  //    try{
  //     const users = (await httpService.get('/users', {
  //       params: { email, password }
  //     })).data;
      

  //     if(users.length > 0){

  //       const user = users[0];
  //       console.log("Logged in user:", user.role);
  //       localStorage.setItem('user', JSON.stringify(user));
  //       toast.success(`Welcome, ${user.name}!`);
  //       if(user.role === 'principal')
  //         navigate('/principal-dashboard');
  //        else if(user.role === 'teacher')
  //           navigate('/teacher-dashboard');
  //         else if(user.role === 'student')
  //             navigate('/student-dashboard');

  //    }else {
  //     toast.error('Invalid email or password');
  //   }
  // } catch (error) {
  //   console.error('Login failed', error);
  // }
    
     
  //  };




   const handleSubmit=(e:any)=>{
     e.preventDefault();
     try{
      let res = get('/users');
      console.log('res',res);
     }catch(err){
      console.log(err);
     }
   }

  return (
  <>
    <div className="login-container">
      <h1>Login</h1>
      <form className='login-form' onSubmit={
        handleSubmit
      }>
        <div className="form-group">
          {/* <label htmlFor="email">Email:</label> */}
          <input
            type="email"
            id="email"
            className='input-field'
            placeholder='Enter your email'  
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="password">Password:</label> */}
          <input
            type="password"
            className='input-field'
            placeholder='Enter your password'
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" >Login</button>
      </form>
    </div>


  
  </> 
  )
}

export default Login