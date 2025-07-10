import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";

const API_URL = "https://6862fe1b88359a373e93ab43.mockapi.io/Produtos";

export default function Register() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSucesso(false);
    setErro("");

    if (!nome || !preco || !categoria || !descricao) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (parseFloat(preco) <= 0) {
      setErro("O preço deve ser maior que zero.");
      return;
    }

    try {
      await axios.post(API_URL, {
        nome,
        preco,
        categoria,
        descricao,
        imagem,
      });
      setSucesso(true);
      setNome("");
      setPreco("");
      setCategoria("");
      setDescricao("");
      setImagem("");
    } catch (err) {
      setErro("Erro ao cadastrar produto.");
    }
  };

  const inputStyles = {
    backgroundColor: "#222",
    borderRadius: 1,
    color: "#fff",
  };

  const labelStyles = {
    color: "#fff",
  };

  return (
    <Container
      sx={{ mt: 4, bgcolor: "#000", color: "#fff", borderRadius: 2, p: 3 }}
    >
      <Typography variant="h4" gutterBottom textAlign="center" color="#fff">
        Cadastrar Produto
      </Typography>
      {sucesso && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Produto cadastrado com sucesso!
        </Alert>
      )}
      {erro && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {erro}
        </Alert>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Nome do Produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          InputLabelProps={{ style: labelStyles }}
          InputProps={{ style: inputStyles }}
        />
        <TextField
          label="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
          InputLabelProps={{ style: labelStyles }}
          InputProps={{ style: inputStyles }}
          inputProps={{ min: "0", step: "0.01" }}
        />
        <TextField
          label="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          InputLabelProps={{ style: labelStyles }}
          InputProps={{ style: inputStyles }}
        />
        <TextField
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          multiline
          InputLabelProps={{ style: labelStyles }}
          InputProps={{ style: inputStyles }}
          rows={4}
        />
        <TextField
          label="URL da Imagem (opcional)"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          InputLabelProps={{ style: labelStyles }}
          InputProps={{ style: inputStyles }}
        />
        {imagem && (
          <img
            src={imagem}
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
