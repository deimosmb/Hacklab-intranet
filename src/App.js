import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import NewParticipant from "./pages/NewParticipant";
import NewLocationPage from "./pages/NewLocationPage";
import ParticapantProfilePage from "./pages/ParticapantProfilePage";
import ShowLocationPage from "./pages/ShowLocationPage";
import ParticapantsPage from "./pages/Participants";
import LocationsPage from "./pages/LocationsPage";
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
          <Link to="/locaties">Locaties</Link>
        </nav>
      </header>
      <main className="App">
        <Provider store={store}>
          <ParticipantsContextProvider>
            <Switch>
              <Route path="/" exact component={ParticapantsPage} />
              <Route path="/locaties" exact component={LocationsPage} />
              <Route path="/deelnemer/:id" component={ParticapantProfilePage} />
              <Route path="/locatie/:name" component={ShowLocationPage} />
              <Route path="/nieuwedeelnemer" component={NewParticipant} />
              <Route path="/nieuwelocatie" component={NewLocationPage} />

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
        </Provider>
      </main>
    </Router>
  );
}

export default App;
