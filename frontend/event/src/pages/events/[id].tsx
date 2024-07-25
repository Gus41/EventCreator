
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const eventMocked = {
  title : 'Evento teste',
  subtitle : 'Bento Gonçalves - Dia 29 de agosto de 2024, das 9h às 17h',
  sessions : [
    {
      title : 'Promoção',
      content : 'Campus Universitário da Região dos Vinhedos'
    },
    {
      title : 'Público-Alvo',
      content : 'Conteudo da Sessão '
    },
    {
      title : 'Objetivos',
      content : 'Proporcionar um contato mais próximo com as práticas jurídicas reais, aprendendo com a atuação de profissionais experientes das mais variadas carreiras que envolvem um júri.'
    },
    {
      title : 'Sessão 1',
      content : 'Conteudo da Sessão '
    },
  ]
  
}

async function getEvents(id : string | undefined | string[])  {
  const response = await fetch(`http://127.0.0.1:8000/api/events/${id}/`);
  const events = await response.json();
  return events;
}


export default function Name(){

    const [event, setEvent] = useState(eventMocked);
    const router = useRouter()

    useEffect(() => {
      
      if(router.isReady){
        let id  = router.query.id
      
        getEvents(id).then((data) => {
           setEvent(data);
           console.log(data); // Log após a resolução da promessa
         }).catch((error) => {
           console.error('Error fetching events:', error); // Log em caso de erro
         });
      }
    }, [router.isReady]);




  function renderSessionsInCol(){
    return event.sessions.map(s=>{
      return(
        <>
          <h2>{s.title}</h2>
          <p>{s.content}</p>
        </>
      )
    })
  }
  
  return(
    <div>
      <header className="bg-ft p-4">
        <div className="container mx-auto px-32 p-4">
          <p className="evento-acad"><b>Evento Acadêmico</b></p>
          <hr/>

          <h3>{event.title}</h3>
          <h4>{event.subtitle}</h4>

        </div>
      </header>
      <section>
        <div className="container mx-auto px-32">
          <div className="row">
            <div className="columns-2">
              {renderSessionsInCol()}
            </div> 
          </div> 
        </div> 
      </section>
    </div>
  )
}