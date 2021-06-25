import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../App'

import { Button } from './../components/Button';
import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'

import '../styles/auth.scss'


export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useContext(AuthContext);

    async function handleCreateNewRoom() {
        if (!user) await signInWithGoogle();

        history.push('/rooms/new')
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
                    <button onClick={handleCreateNewRoom} className="create-room">
                        <img src={googleIcon} alt="" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input type="text" placeholder="Digite o código da sala" />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}