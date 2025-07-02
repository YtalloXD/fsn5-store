import { Container } from "@mui/material";
import GradProducts from "./components/GradProducts/GradProducts";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <>
      <Container
        sx={{
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
        backgroundColor: "white"
      }}
      >
        <Header />
        <GradProducts />
      </Container>
      <Home />
    </>
  );
}

export default App;
