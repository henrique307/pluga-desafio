import { useState } from "react";
import { BodyComponent } from "./components/body/body.component";
import { HeaderComponent } from "./components/header/header.component";

function App() {
  const [search, setSearch] = useState("")

  return (
    <div className="App">
      <HeaderComponent setSearch={setSearch} />
      <BodyComponent search={search} />
    </div>
  );
}

export default App;
