import { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.post(`${window.location.origin}/api/users/login`, { email, password });
        const decodedUser = JSON.parse(atob(data.token.split('.')[1]));
        login({ ...decodedUser, token: data.token });
        
        localStorage.setItem('userEmail', decodedUser.email);
        
        
        window.location.reload();

        window.location.replace('/');
    } catch (error) {
        console.error('Login failed', error);
    }
};
  
  

  return (
    <>
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            autoComplete='email'
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
    </>
  );
}

export default Login;
