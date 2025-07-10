import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header/Header";
import GradProducts from "./components/GradProducts/GradProducts";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <Header />
      <Container
        sx={{
          bgcolor: "primary.main",
          minHeight: "100vh",
          width: "100%",
          py: 4,
        }}
      >
        <Routes>
          <Route path="/" element={<GradProducts />} />
          <Route path="/cadastrar" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
}
