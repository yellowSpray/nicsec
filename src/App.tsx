import "./styles/App.css";
import Footer from "./components/common/Footer.tsx";
import Header from "./components/common/Header.tsx";
import AppRouter from "./routes/AppRouter.tsx";

function App() {
  return (
    <>
      <Header />
      <main className="w-full bg-white flex flex-col items-center">
        <AppRouter />
      </main>
      <Footer />
    </>
  );
}

export default App;
