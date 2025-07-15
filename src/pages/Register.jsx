import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://6862fe1b88359a373e93ab43.mockapi.io/Produtos";

export default function Register() {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Categoria, setCategoria] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [Estoque, setEstoque] = useState("");
  const [Image, setImage] = useState("");
  const [Disponivel, setDisponivel] = useState(true);
  const [Sucesso, setSucesso] = useState(false);
  const [Erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSucesso(false);
    setErro("");

    if (!Name || !Price || !Categoria || !Descricao || Estoque === "") {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (parseFloat(Price) <= 0) {
      setErro("O preço deve ser maior que zero.");
      return;
    }

    try {
      await axios.post(API_URL, {
        Name: Name,
        Price: parseFloat(price),
        Categoria: categoria,
        Descricao: descricao,
        Estoque: parseInt(estoque),
        Disponivel: disponivel,
        Image: Image,
      });

      setSucesso(true);
      setName("");
      setPrice("");
      setCategoria("");
      setDescricao("");
      setImage("");
      setEstoque("");
      setDisponivel(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setErro("Erro ao cadastrar produto.");
    }
  };

  useEffect(() => {
    if (sucesso || erro) {
      const timer = setTimeout(() => {
        setSucesso(false);
        setErro("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [sucesso, erro]);

  const inputStyles = {
    backgroundColor: "#222",
    borderRadius: 1,
    color: "#fff",
  };

  const labelStyles = {
    color: "#fff",
  };

  return (
    <Container sx={{ mt: 4, bgcolor: "#000", color: "#fff", borderRadius: 2, p: 3 }}>
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
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
          InputLabelProps={{ style: labelStyles }}
          InputProps={{ style: inputStyles }}
        />
        <TextField
          label="Preço"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          inputProps={{ min: "0", step: "0.01" }}
          InputLabelProps={{ style: labelStyles }}
          InputProps={{ style: inputStyles }}
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
          rows={4}
          InputLabelProps={{ style: labelStyles }}
          InputProps={{ style: inputStyles }}
        />
        <TextField
          label="Quantidade em Estoque"
          type="number"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
          required
          inputProps={{ min: "0", step: "1" }}
          InputLabelProps={{ style: labelStyles }}
          InputProps={{ style: inputStyles }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={disponivel}
              onChange={(e) => setDisponivel(e.target.checked)}
              sx={{ color: "#fff" }}
            />
          }
          label="Disponível para venda"
          sx={{ color: "#fff" }}
        />
        <TextField
          label="URL da Imagem (opcional)"
          value={Image}
          onChange={(e) => setImage(e.target.value)}
          InputLabelProps={{ style: labelStyles }}
          InputProps={{ style: inputStyles }}
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
