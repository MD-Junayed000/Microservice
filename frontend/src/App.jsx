import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';   // ← named export, no default

export default function App() {
  const [form,   setForm]   = useState({ name: '', email: '', password: '' });
  const [token,  setToken]  = useState('');
  const [loading,setLoading]= useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:3001/auth/register',
        form
      );
      setToken(data.token);
      alert('Registration successful!');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:3001/auth/login',
        { email: form.email, password: form.password }
      );
      setToken(data.token);
      alert('Login successful!');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const payload = token ? jwtDecode(token) : null;   // ← use jwtDecode

  return (
    <div style={{ maxWidth: 420, margin: '3rem auto', fontFamily: 'sans-serif' }}>
      <h2>Auth demo</h2>

      <input name="name"     placeholder="name"     value={form.name}     onChange={handle} /><br/>
      <input name="email"    placeholder="email"    value={form.email}    onChange={handle} /><br/>
      <input name="password" type="password" placeholder="password" value={form.password} onChange={handle} /><br/>

      <button onClick={register} disabled={loading}>
        {loading ? 'Please wait…' : 'Register'}
      </button>{' '}
      <button onClick={login} disabled={loading}>
        {loading ? 'Please wait…' : 'Login'}
      </button>

      {token && (
        <>
          <h3>JWT</h3>
          <textarea readOnly value={token} style={{ width:'100%', height:120 }} />
          <h3>Decoded payload</h3>
          <pre style={{ background:'#222', color:'#8f8', padding:'1rem' }}>
            {JSON.stringify(payload, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
