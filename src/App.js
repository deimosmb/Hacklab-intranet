import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import NewParticipant from "./pages/NewParticipant";
import NewLocationPage from "./pages/NewLocationPage";
import ParticapantProfilePage from "./pages/ParticapantProfilePage";
import ShowLocationPage from "./pages/ShowLocationPage";
import ParticapantsPage from "./pages/Participants";
import LocationsPage from "./pages/LocationsPage";
import SkillsPage from "./pages/SkillsPage";
import OrganizationsPage from "./pages/Organizationspage";
import WorkshopsPage from "./pages/WorkshopsPage";
import { Filter } from "./components/Filter";
import { Navigation } from "./components/Navigation";
import { ParticipantsContextProvider } from "./context/participants-context";
import "./App.scss";

function App() {
  const [isShown, setIsShown] = useState(false);

  return (
    <Router>
      <header className="Header">
        <Navigation setIsShown={setIsShown} />
      </header>
      <main className="App">
        <Provider store={store}>
          <Filter isShown={isShown} setIsShown={setIsShown} />
          <ParticipantsContextProvider>
            <Switch>
              <Route path="/" exact component={ParticapantsPage} />
              <Route path="/deelnemers" exact component={ParticapantsPage} />
              <Route path="/deelnemer/:id" component={ParticapantProfilePage} />
              <Route path="/nieuwedeelnemer" component={NewParticipant} />
              <Route path="/locaties" exact component={LocationsPage} />
              <Route path="/locatie/:name" component={ShowLocationPage} />
              <Route path="/nieuwelocatie" component={NewLocationPage} />
              <Route path="/vaardigheden" exact component={SkillsPage} />
              <Route path="/organisaties" exact component={OrganizationsPage} />
              <Route path="/lessen" exact component={WorkshopsPage} />

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
