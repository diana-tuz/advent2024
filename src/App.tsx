import "./App.css";
import { Calendar } from "./components/Calendar";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Calendar />
      </main>
      <Footer />
    </>
  );
}

export default App;
