import React, { useEffect, useState } from 'react'
import "./Player.css"
import back_arrow_icon from "../../assets/back_arrow_icon.png"
import { useParams, useNavigate } from 'react-router-dom'

const Player = () => {
  const {id} =useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  }) 
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjJjZGQ3MmZkMzU0Yjk0MjNhNWViZjA0NzM5YTc0NCIsIm5iZiI6MTc1MjczNDU0Ny44NzksInN1YiI6IjY4Nzg5YjUzN2ZhYWQ0NzY3YTIwM2Q3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cTE5Vy4ZKJaKuF0CNL7ursuSioD8WoafY_vj5Dj9BOc'
    }
  }; 

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  }, []);
  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back Arrow" onClick={()=>{navigate(-2)}}/>
      <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>

      </div>
      
    </div>
  )
}

export default Player