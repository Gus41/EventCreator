import Link from 'next/link'

export default function Events(){
  return(
    <div className='container flex items-center flex-col'>
      <h1 className='mb-10'>Eventos acadêmicos</h1>
      <div>
        <ul>
          <li> <Link href="/events/name">Evento teste</Link> </li>
        </ul>
      </div>
    </div>
  )
}