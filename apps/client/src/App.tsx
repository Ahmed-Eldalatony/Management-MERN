import Header from "./components/Header";
import { Route, Router } from "react-router-dom";
function App() {
  return (
    <div className="">
      {/* <Header /> */}
      <Router>
        <div>
            <Route  path="/" Component={Header} />
            {/* <Route path="/about" component={About} /> */}
            {/* <Route path="/contact" component={Contact} /> */}
            {/* <Route component={PageNotFound} /> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
