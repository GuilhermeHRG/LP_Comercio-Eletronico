import React from 'react';
import LandingPage from './components/LandingPage';
import Login from "./Login";
import AdminPanel from "./AdminPanel";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/admin" component={AdminPanel} />
      <LandingPage />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
