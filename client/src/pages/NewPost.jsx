import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function NewPost(){
  const [form, setForm] = useState({ title:'', body:'', tags:'' });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('body', form.body);
    fd.append('tags', form.tags);
    if (image) fd.append('image', image);

    try {
      const { data } = await api.post('/posts', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
      navigate(`/posts/${data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={submit}>
      <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" />
      <textarea value={form.body} onChange={e=>setForm({...form, body:e.target.value})} placeholder="Content" />
      <input value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} placeholder="comma,separated,tags" />
      <input type="file" onChange={e=>setImage(e.target.files[0])} />
      <button>Publish</button>
    </form>
  );
}
