import React, {useState} from 'react';
import axios from 'axios';
import './register.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:3000/register', formData);
//       setSuccess(res.data.message);
//       setFormData({ username: '', email: '', password: '' });
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   return (
//     <div className='wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
//       <div className='register'>
//         <h2 className='mb-3'>Registration</h2>
//         <form className='needs-validation' onSubmit={handleSubmit}>
//           {error && <p className='error'>{error}</p>}
//           {success && <p className='success'>{success}</p>}

//           <div className='form-group mb-2'>
//             <label htmlFor='username' className='form-label'>Username</label>
//             <input type='text' className='form-control' value={formData.username} onChange={handleChange} />
//           </div>

//           <div className='form-group mb-2'>
//             <label htmlFor='email' className='form-label'>Email</label>
//             <input type='email' className='form-control' value={formData.email} onChange={handleChange} required />
//           </div>

//           <div className='form-group mb-2'>
//             <label htmlFor='password' className='form-label'>Password</label>
//             <input type='password' className='form-control' value={formData.password} onChange={handleChange} required />
//           </div>

//           <div className='form-group form-check mb-2'>
//             <input type='checkbox' className='form-check-input' />
//             <label htmlFor='check' className='form-check-label'>Remember me</label>
//           </div>

//           <button type='submit' className='btn btn-success w-100 mt-2'>Register</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;


const Register = (props) => { 
  const [data, setdata] = useState({ Username: '', Email: '', Password: '' })  
  const apiUrl = "http://localhost:3000/register";  
  const Registration = (e) => {  
    e.preventDefault();  
    debugger;  
    const data1 = { Username: data.Username, Email: data.Email, Password: data.Password};  
    axios.post(apiUrl, data1)  
      .then((result) => {  
        debugger;  
        console.log(result.data);  
        if (result.data.Status === 'Invalid')  
          alert('Invalid User');  
        else  
          props.history.push('/Dashboard')  
      })  
  }  
  const onChange = (e) => {  
    e.persist();  
    debugger;  
    setdata({ ...data, [e.target.name]: e.target.value });  
  }  
  return (  
    <div className="container">  
      <div className="row">  
        <div className="col-sm-12 btn btn-primary" style={{ "margin": "6px" }}>  
          Your Details
       </div>  
      </div>  
      <div className="card o-hidden border-0 shadow-lg my-5" style={{ "marginTop": "5rem!important;" }}>  
        <div className="card-body p-0">  
          <div className="row">  
            <div className="col-lg-12">  
              <div className="p-5">  
                <div className="text-center">  
                  <h1 className="h4 text-gray-900 mb-4">Register User</h1>  
                </div>  
                <form onSubmit={Registration} class="user">  
                  <div className="form-group row">  
                    <div className="col-sm-6 mb-3 mb-sm-0">  
                      <input type="text" name="username" onChange={onChange} value={data.Username} className="form-control" id="exampleUserName" placeholder="Username" />  
                    </div>  
                    <div className="col-sm-6">  
                      <input type="email" name="Email" onChange={onChange} value={data.Email} className="form-control" id="exampleInputEmail" placeholder="Email" />  
                    </div>  
                  </div>  
                  <div className="form-group">  
                    <input type="text" name="password" onChange={onChange} value={data.Password} className="form-control" id="exampleInputPassword" placeholder="Password" />  
                  </div>  
                 
                  <button type="submit" className="btn btn-primary  btn-block">  
                    Register User  
                </button>  
                  <hr />  
                </form>  
                <hr />  
              </div>  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>  
  )  
}  
  
export default Register  
