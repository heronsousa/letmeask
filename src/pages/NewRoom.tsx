import { Link, useHistory } from 'react-router-dom';
import { FormEvent } from 'react';
import { useState } from 'react';

import { database } from '../services/firebase';
import { useAuth } from './../hooks/useAuth';

import { Button } from './../components/Button';
import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import '../styles/auth.scss'

export function NewRoom() {
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('')

    const history = useHistory();
    
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') return

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        history.push(`/rooms/${firebaseRoom.key}`);
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustration} alt="Perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logo} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala" 
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}