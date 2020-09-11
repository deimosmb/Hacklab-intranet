import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NewParticipant from "./pages/NewParticipant";
import ParticapantProfilePage from "./pages/ParticapantProfilePage";
import ParticapantsPage from "./pages/Participants";
import { ParticipantsContextProvider } from "./context/participants-context";
import "./App.scss";

function App() {
  return (
    <Router>
      <header className="Header">
        <nav className="Header-nav">
          <Link to="/">
            <h1 className="fa fa-flask">HACKLAB</h1>
          </Link>
        </nav>
      </header>
      <main className="App">
        <ParticipantsContextProvider>
          <Switch>
            <Route path="/" exact component={ParticapantsPage} />
            <Route path="/deelnemer/:id" component={ParticapantProfilePage} />
            {/* <Route path="/" exact render={() => <h1>Hello there</h1>} /> */}
            <Route path="/nieuwedeelnemer" component={NewParticipant} />

            <Route
              render={() => (
                <>
                  <h1>404</h1>
                  <p>
                    De pagina die je probeert te bezoeken bestaat niet, of
                    bestaat niet meer!
                  </p>
                </>
              )}
            />
          </Switch>
        </ParticipantsContextProvider>
      </main>
    </Router>
  );
}

export default App;
