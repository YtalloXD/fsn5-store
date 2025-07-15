import { Container } from "@mui/material";
import GradProducts from "./components/GradProducts/GradProducts";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import EditarProduto from "./pages/Edit";
import Home from "./pages/Home";
import Register from "./pages/Register"

function App() {
  return (
    <BrowserRouter>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          width: '100vw',
          minHeight: '100vh',
          borderRadius: 0,
          backgroundColor: "white",
          padding: 0,
          margin: 0,
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<GradProducts />} />
          <Route path="/editar/:id" element={<EditarProduto />} />
          <Route path="/cadastrar" element={<Register />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
