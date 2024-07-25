import React, { useState } from 'react';

export default function Create() {
    const [eventTitle, setEventTitle] = useState('');
    const [eventContent, setEventContent] = useState('');
    const [sessions, setSessions] = useState([{ title: '', content: '' }]);

    const handleEventTitleChange = (e) => setEventTitle(e.target.value);
    const handleEventContentChange = (e) => setEventContent(e.target.value);
    
    const handleSessionTitleChange = (index, e) => {
        const newSessions = [...sessions];
        newSessions[index].title = e.target.value;
        setSessions(newSessions);
    };
    
    const handleSessionContentChange = (index, e) => {
        const newSessions = [...sessions];
        newSessions[index].content = e.target.value;
        setSessions(newSessions);
    };

    const addSessionField = () => {
        setSessions([...sessions, { title: '', content: '' }]);
    };

    const createEvent = async (e) => {
        e.preventDefault();

        const eventData = { title: eventTitle, subtitle: eventContent };

        // First, create the event
        const eventResponse = await fetch('http://127.0.0.1:8000/api/events/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        });

        if (!eventResponse.ok) {
            console.error('Error creating event', eventResponse.status, eventResponse.statusText);
            return;
        }

        const event = await eventResponse.json();
        const eventId = event.id;
        console.log(eventId)

        // Then, create the sessions
        for (const session of sessions) {
            const sessionData = { post: eventId, ...session };
            const sessionResponse = await fetch('http://127.0.0.1:8000/api/sessions/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sessionData)
            });

            if (!sessionResponse.ok) {
                console.error('Error creating session', sessionResponse.status, sessionResponse.statusText);
            } else {
                const sessionData = await sessionResponse.json();
                console.log('Session created', sessionData);
            }
        }
    };

    return (
        <div className='min-w-full px-40 flex justify-center items-center flex-col'>
            <h1 className='my-10'>Create Event with Sessions</h1>

            <form className='bg-white p-4 rounded shadow-2xl min-w-full' onSubmit={createEvent}>
                <div className='d-flex flex-col border-b-2 '>
                    <div className='d-flex flex-col ' >
                        <label className='block ml-2' htmlFor="eventTitle">Título do Evento:</label>
                        <input
                            className='border w-5/6 roundend m-2 block'
                            type="text"
                            id="eventTitle"
                            value={eventTitle}
                            onChange={handleEventTitleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-col ' >
                        <label className='block ml-2' htmlFor="eventContent">Descrição</label>
                        <textarea
                            className='border w-5/6 block roundend m-2'
                            id="eventContent"
                            value={eventContent}
                            onChange={handleEventContentChange}
                            required
                        />
                    </div>
                </div>
                <div id="sessions">
                    <h2 className='text-center my-4'>Sessões</h2>
                    <div className='flex flex-row flex-wrap'>
                        {sessions.map((session, index) => (
                            <div key={index} className="session max-w-md bg-slate-200 mx-2 p-2 my-4 d-flex flex-col rounded shadow-xl">
                                <h3>Sessão {index + 1}</h3>

                                <div className='d-flex flex-col m-4' >
                                    <label className='block ml-2' htmlFor={`sessionTitle${index}`}>Título da Sessão:</label>
                                    <input
                                        className='rounded shadow border w-5/6 roundend m-2 block'
                                        type="text"
                                        id={`sessionTitle${index}`}
                                        value={session.title}
                                        onChange={(e) => handleSessionTitleChange(index, e)}
                                        required
                                    />
                                </div>
                                <div className='d-flex flex-col m-4' >
                                    <label className=' block ml-2' htmlFor={`sessionContent${index}`}>Conteúdo:</label>
                                    <textarea
                                        className='rounded shadow border min-w-72 block roundend m-2'
                                        id={`sessionContent${index}`}
                                        value={session.content}
                                        onChange={(e) => handleSessionContentChange(index, e)}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button 
                    className="session max-w-md bg-slate-200 mx-2 p-2 my-4 d-flex flex-col rounded shadow-xl"
                    type="button" onClick={addSessionField}>Adicionar Sessão</button>
                <br /><br />
                <div className='w-full flex items-center justify-center'>
                    <button
                        className="mx-auto session max-w-md bg-lime-400 mx-2 p-4 my-4 d-flex flex-col rounded shadow-xl"
                        type="submit">Criar Evento</button>
                </div>
            </form>
        </div>
    );
}
