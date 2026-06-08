import Chatwidget from "./components/chatwidget";

import "./App.css";



function App() {

    return (

        <div className="website">

            {/* DUMMY WEBSITE */}

            <nav className="navbar">

                <h1>
                    Multiplied AI
                </h1>

            </nav>



            <section className="hero">

                <h1>
                    The Operating System
                    for Frontline
                    Human Intelligence
                </h1>

                <p>
                    AI × Human Intelligence
                    {">"} AI Alone
                </p>

            </section>



            {/* FLOATING CHAT */}

            <Chatwidget />

        </div>
    );
}

export default App;