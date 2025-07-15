import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const API_URL = "https://6862fe1b88359a373e93ab43.mockapi.io/Produtos";

export default function Register() {
  const [produto, setProduto] = useState({
    Name: "",
    Price: "",
    Estoque: "",
    Image: "",
  });
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSucesso(false);
    setErro("");

    if (!produto.Name || !produto.Price || produto.Estoque === "") {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (parseFloat(produto.Price) <= 0) {
      setErro("O preço deve ser maior que zero.");
      return;
    }

    try {
      await axios.post(API_URL, {
        Name: produto.Name,
        Price: parseFloat(produto.Price),
        Estoque: parseInt(produto.Estoque),
        Image: produto.Image,
      });

      setSucesso(true);
      setProduto({
        Name: "",
        Price: "",
        Estoque: "",
        Image: "",
      });

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

  return (
    <Container className="container-register">
      <Typography variant="h4" gutterBottom textAlign="center" className="titulo">
        Cadastrar Produto
      </Typography>

      {sucesso && (
        <Alert severity="success" className="alert">
          Produto cadastrado com sucesso!
        </Alert>
      )}
      {erro && (
        <Alert severity="error" className="alert">
          {erro}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} className="formulario">
        <TextField
          label="Nome do Produto"
          name="Name"
          value={produto.Name}
          onChange={handleChange}
          required
          className="campo"
          InputLabelProps={{ className: "label" }}
        />
        <TextField
          label="Imagem"
          name="Image"
          value={produto.Image}
          onChange={handleChange}
          className="campo"
          InputLabelProps={{ className: "label" }}
        />
        <TextField
          label="Preço"
          name="Price"
          type="number"
          value={produto.Price}
          onChange={handleChange}
          required
          className="campo"
          inputProps={{ min: "0", step: "0.01" }}
          InputLabelProps={{ className: "label" }}
        />
        <TextField
          label="Estoque"
          name="Estoque"
          type="number"
          value={produto.Estoque}
          onChange={handleChange}
          required
          className="campo"
          inputProps={{ min: "0", step: "1" }}
          InputLabelProps={{ className: "label" }}
        />
        {produto.Image && (
          <img src={produto.Image} alt="Preview" className="imagem-preview" />
        )}
        <Button type="submit" variant="contained" className="botao-cadastrar">
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
}