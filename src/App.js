import CurrencyConverter from "./components/CurrencyConverter";
import NewsFeed from "./components/NewsFeed";

const App = () => {
  return (
    <div>
      <div className="app-wrapper">
        <CurrencyConverter />
        <NewsFeed />
      </div>
    </div>
  );
}

export default App;
