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
import "./Register.css";

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
        Name,
        Price: parseFloat(Price),
        Categoria,
        Descricao,
        Estoque: parseInt(Estoque),
        Disponivel,
        Image,
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
    if (Sucesso || Erro) {
      const timer = setTimeout(() => {
        setSucesso(false);
        setErro("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [Sucesso, Erro]);

  return (
    <Container className="container-register">
      <Typography variant="h4" gutterBottom textAlign="center" className="titulo">
        Cadastrar Produto
      </Typography>

      {Sucesso && (
        <Alert severity="success" className="alert">
          Produto cadastrado com sucesso!
        </Alert>
      )}
      {Erro && (
        <Alert severity="error" className="alert">
          {Erro}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} className="formulario">
        <TextField
          label="Nome do Produto"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
          className="campo"
          InputLabelProps={{ className: "label" }}
        />
        <TextField
          label="Preço"
          type="number"
          value={Price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="campo"
          inputProps={{ min: "0", step: "0.01" }}
          InputLabelProps={{ className: "label" }}
        />
        <TextField
          label="Categoria"
          value={Categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          className="campo"
          InputLabelProps={{ className: "label" }}
        />
        <TextField
          label="Descrição"
          value={Descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          multiline
          rows={4}
          className="campo"
          InputLabelProps={{ className: "label" }}
        />
        <TextField
          label="Quantidade em Estoque"
          type="number"
          value={Estoque}
          onChange={(e) => setEstoque(e.target.value)}
          required
          className="campo"
          inputProps={{ min: "0", step: "1" }}
          InputLabelProps={{ className: "label" }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={Disponivel}
              onChange={(e) => setDisponivel(e.target.checked)}
              className="checkbox"
            />
          }
          label="Disponível para venda"
          className="label"
        />
        <TextField
          label="URL da Imagem (opcional)"
          value={Image}
          onChange={(e) => setImage(e.target.value)}
          className="campo"
          InputLabelProps={{ className: "label" }}
        />
        {Image && (
          <img src={Image} alt="Preview" className="imagem-preview" />
        )}
        <Button type="submit" variant="contained" className="botao-cadastrar">
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
}
