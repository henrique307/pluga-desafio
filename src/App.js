import { useState } from "react";
import { BodyComponent } from "./components/body.component/body";
import { HeaderComponent } from "./components/header.component/header";

function App() {
  const [search, setSearch] = useState("")

  return (
    <div className="App">
      <HeaderComponent setSearch={setSearch} />
      <BodyComponent pesquisa={search} />
    </div>
  );
}

export default App;
