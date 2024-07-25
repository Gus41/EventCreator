import Link from 'next/link'
import { useEffect, useState } from 'react'

async function getEvents() {
  const response = await fetch('http://127.0.0.1:8000/api/events/');
  const events = await response.json();
  return events;
}

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data);
      console.log(data); // Log após a resolução da promessa
    }).catch((error) => {
      console.error('Error fetching events:', error); // Log em caso de erro
    });
  }, []);
  function renderEvents(){
    return events.map(e=>{
      return <li key={e.id}><Link href={`/events/${e.id}`} >{e.title}</Link></li>
    })
  }
  return(
    <div className='container flex items-center flex-col'>
      <h1 className='my-10 text-black'>Eventos acadêmicos</h1>
      <hr className='text-black bg-black w-full' />
      <div className='mt-5'>
        <ul>
          <li><Link key={1000} href="/events/name">Evento teste</Link> </li>
          {renderEvents()}
        </ul>
      </div>
    </div>
  )
}