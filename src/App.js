import { BodyComponent } from "./components/body/body.component";
import { HeaderComponent } from "./components/header/header.component";
import { Provider } from "./context/search.context";

function App() {
  return (
    <div className="App">
      <Provider>
        <HeaderComponent />
        <BodyComponent />
      </Provider>
    </div>
  );
}

export default App;
