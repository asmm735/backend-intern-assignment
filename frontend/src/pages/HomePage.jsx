import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import { useState } from 'react';
import api from '../lib/axios';
import toast from "react-hot-toast";
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const endpoint = selectedCategory === 'All' 
          ? '/notes' 
          : `/notes?category=${selectedCategory}`;
        const res = await api.get(endpoint);
        
        console.log(res.data);
        setNotes(res.data)
        setIsRateLimited(false)
      }catch (error) {
        console.log("Error fetching notes");
        console.log(error);
        if(error.response?.status===429){
          setIsRateLimited(true)
        }else{
          toast.error("Failed to load notes")
        }
      }finally{
        setLoading(false)
      }
    };
    fetchNotes();
  },[selectedCategory]);
  return (
    <div className='min-h-screen'>
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {/* Category Filter */}
        <div className='flex justify-center mb-6'>
          <div className='btn-group'>
            {['All', 'Personal', 'Work', 'Others'].map((cat) => (
              <button
                key={cat}
                className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}
        {notes.length===0 && !isRateLimited && <NotesNotFound/>  }

        {notes.length>0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note =>(
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
