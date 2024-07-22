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

export default function Name(){
  function renderSessionsInCol(){
    return eventMocked.sessions.map(s=>{
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

          <h3>{eventMocked.title}</h3>
          <h4>{eventMocked.subtitle}</h4>

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