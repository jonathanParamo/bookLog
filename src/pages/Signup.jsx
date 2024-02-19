import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { createUser } from '../redux/slices/thrunks';
import { useNavigate } from 'react-router-dom';

const SignupComponent = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await dispatch(createUser({ username, email, password }));
    try {
      console.log(result);

      if (result.data.success) {
        localStorage.setItem('token', result.data.token);
        navigate('/profile');
      } else {
        const errorMessage = result.error || "All fields are required";
        setError(`Error: ${errorMessage}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "already registered.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen bg-black flex justify-center items-center'>
      <div className='w-11/12 md:w-2/3 lg:w-2/6 bg-white rounded h-[600px] p-9 flex flex-col justify-center items-center'>
        <FaUserPlus size={80} className='text-gray-900 mb-6'/>
        <form className='w-full flex flex-col'>
          <label htmlFor='username' className='mb-2'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            className='mb-4 p-2 border border-stone-950 rounded-md'
          />

          <label htmlFor='email' className='mb-2'>Email:</label>
          <input
            type='text'
            id='email'
            placeholder='Email'
            required onChange={(e) => setEmail(e.target.value)}
            className='mb-4 p-2 border border-stone-950 rounded-md'
          />

          <label htmlFor='password' className='mb-2'>Password:</label>
          <input
            type='password'
            id='password' placeholder='Password'
            required onChange={(e) => setPassword(e.target.value)}
            className='mb-4 p-2 border border-stone-950 rounded-md'
          />

          <div className='flex items-center justify-center h-1 mt-4'>

          <button
            type='submit'
            onClick={(e) => handleSubmit(e)}
            className='w-full h-12 bg-blue-500 mt-4 text-white p-2 rounded-md'
          >
            {loading ? (
              <div className="flex items-center justify-center">
              <div className="border-t-4 border-white border-solid rounded-full h-6 w-6 animate-spin"></div>
            </div>
            ) : (
              "Signup"
            )}
          </button>
        </div>
        </form>
        <div className='w-full mt-12 text-center'>
          <p>Already have an account? <a href="/signin" className="text-blue-500">Signin</a></p>
        </div>
        {error && <p className='w-full text-center mt-9'>{error}</p>}
      </div>
    </div>
  );
};

export default SignupComponent;
