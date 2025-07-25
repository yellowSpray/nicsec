import "./styles/App.css";
import Footer from "./components/common/Footer.tsx";
import Header from "./components/common/Header.tsx";
import AppRouter from "./routes/AppRouter.tsx";

function App() {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
