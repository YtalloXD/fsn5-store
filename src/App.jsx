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
          bgcolor: "#dee9ff",
          // minHeight: "100vh",
          width: "100vh",
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
