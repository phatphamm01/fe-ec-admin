import "moment/locale/vi";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  );
};

export default App;
