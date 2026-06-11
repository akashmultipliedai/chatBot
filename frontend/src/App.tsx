import Chatwidget from "./components/ChatWidget";

import "./App.css";



function App() {

    return (

        <div className="website">

            {/* DUMMY WEBSITE */}

            <nav className="navbar">

                <h1>
                    <img className="logo" src="logo.jpeg" alt="" />
                </h1>

                <div className="nav-links">
                    <a href="#humantic">Humantic OS</a>
                    <a href="#solutions">Solutions</a>
                    <a href="#company">Company</a>
                    <button className="nav-btn">Book a demo</button>
                </div>

            </nav>



            <main className="multiplied-hero">
                <h1 className="hero-heading">
                    The operating<br />
                    system for frontline<br />
                    <em>human intelligence.</em>
                </h1>

                <p className="hero-subtext">
                    We connect AI to the point of decision,<br />
                    turning undocumented frontline<br />
                    knowledge into enterprise intelligence.
                </p>
            </main>



            {/* FLOATING CHAT */}

            <Chatwidget />

        </div>
    );
}

export default App;