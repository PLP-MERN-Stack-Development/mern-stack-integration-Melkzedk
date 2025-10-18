import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', form);
      login(data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={submit}>
      <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" />
      <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" />
      <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" />
      <button>Create account</button>
    </form>
  );
}
