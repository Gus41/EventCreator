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
        <div>
            <h1>Create Event with Sessions</h1>

            <form onSubmit={createEvent}>
                <div className='createHeader'>
                    <div>
                        <label htmlFor="eventTitle">Event Title:</label>
                        <input
                            type="text"
                            id="eventTitle"
                            value={eventTitle}
                            onChange={handleEventTitleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="eventContent">Event Content:</label>
                        <textarea
                            id="eventContent"
                            value={eventContent}
                            onChange={handleEventContentChange}
                            required
                        />
                    </div>
                </div>
                <div id="sessions">
                    <h2>Sessions</h2>
                    
                    {sessions.map((session, index) => (
                        <div key={index} className="session">
                            <h3>Session {index + 1}</h3>
                            <div>
                                <label htmlFor={`sessionTitle${index}`}>Session Title:</label>
                                <input
                                    type="text"
                                    id={`sessionTitle${index}`}
                                    value={session.title}
                                    onChange={(e) => handleSessionTitleChange(index, e)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor={`sessionContent${index}`}>Session Content:</label>
                                <textarea
                                    id={`sessionContent${index}`}
                                    value={session.content}
                                    onChange={(e) => handleSessionContentChange(index, e)}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={addSessionField}>Add Another Session</button>
                <br /><br />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
}
