import Link from 'next/link'
export default function Home(){
  return(
    <div className='container h-screen items-center justify-center'>
      <div className=' mx-auto max-w-xs flex flex-col items-center h-screen justify-center w-6/12'>
        <Link className='hover:bg-gray-100 text-center bg-white w-full rounded shadow-lg p-3 mb-3' href='create/'>
          Criar Evento
        </Link>
          <Link className='hover:bg-gray-100 text-center bg-white w-full rounded shadow-lg p-3 mb-3' href='events/'>
            Visualizar Eventos
          </Link>
      </div>
    </div>
  )
}