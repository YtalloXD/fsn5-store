import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

const API_URL = "https://6862fe1b88359a373e93ab43.mockapi.io/Produtos";

export default function Register() {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Categoria, setCategoria] = useState("");
  const [Estoque, setEstoque] = useState("");
  const [Image, setImage] = useState("");
  const [Disponivel, setDisponivel] = useState(true);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSucesso(false);
    setErro("");

    if (!Name || !Price || !Categoria) {
      setErro("Preencha os campos obrigatórios.");
      return;
    }

    if (parseFloat(Price) <= 0) {
      setErro("O preço deve ser maior que zero.");
      return;
    }

    try {
      await axios.post(API_URL, {
        Name,
        Price: parseFloat(Price),
        Categoria,
        Estoque: parseInt(Estoque) || 0,
        Disponivel,
        Image,
      });
      setSucesso(true);
      setName("");
      setPrice("");
      setCategoria("");
      setEstoque("");
      setImage("");
      setDisponivel(true);
    } catch (err) {
      setErro("Erro ao cadastrar produto.");
    }
  };

  return (
    <Container sx={{ mt: 4, bgcolor: "#000", color: "#fff", borderRadius: 2, p: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center" color="#fff">
        Cadastrar Produto
      </Typography>
      {sucesso && <Alert severity="success">Produto cadastrado com sucesso!</Alert>}
      {erro && <Alert severity="error">{erro}</Alert>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Nome do Produto"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { backgroundColor: "#222", color: "#fff" } }}
        />
        <TextField
          label="Preço"
          type="number"
          value={Price}
          onChange={(e) => setPrice(e.target.value)}
          required
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { backgroundColor: "#222", color: "#fff" } }}
        />
        <TextField
          label="Categoria"
          value={Categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { backgroundColor: "#222", color: "#fff" } }}
        />
        <TextField
          label="Estoque"
          type="number"
          value={Estoque}
          onChange={(e) => setEstoque(e.target.value)}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { backgroundColor: "#222", color: "#fff" } }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={Disponivel}
              onChange={() => setDisponivel(!Disponivel)}
              sx={{ color: "#fff" }}
            />
          }
          label="Disponível para venda"
          sx={{ color: "#fff" }}
        />
        <TextField
          label="URL da Imagem"
          value={Image}
          onChange={(e) => setImage(e.target.value)}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { backgroundColor: "#222", color: "#fff" } }}
        />
        {Image && (
          <img
            src={Image}
            alt="Preview"
            width={200}
            style={{
              borderRadius: 8,
              border: "1px solid #ccc",
              marginTop: 10,
            }}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#ddd" },
          }}
        >
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
}
