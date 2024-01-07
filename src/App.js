import { useState } from "react";
import { BodyComponent } from "./components/body.component/body";
import { HeaderComponent } from "./components/header.component/header";

function App() {
  const [pesquisa, setPesquisa] = useState("")

  return (
    <div className="App">
      <HeaderComponent setPesquisa={setPesquisa} />
      <BodyComponent pesquisa={pesquisa} />
    </div>
  );
}

export default App;
