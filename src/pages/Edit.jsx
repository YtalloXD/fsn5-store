import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/GradProducts/GradProducts.css";

export default function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`https://6862fe1b88359a373e93ab43.mockapi.io/Produtos/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao carregar produto");
          return res.json();
        })
        .then((data) => {
          setProduto(data);
          setLoading(false);
        })
        .catch(() => {
          setErro("Erro ao carregar produto");
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    setSalvando(true);
    fetch(`https://6862fe1b88359a373e93ab43.mockapi.io/Produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao salvar produto");
        return res.json();
      })
      .then(() => {
        setSalvando(false);
        navigate("/");
      })
      .catch(() => {
        setErro("Erro ao salvar produto");
        setSalvando(false);
      });
  };

  if (loading) {
    return (
      <Container className="container_grade">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (erro) {
    return (
      <Container className="container_grade">
        <Typography color="error">{erro}</Typography>
        <Button variant="contained" onClick={() => navigate("/")}>Voltar</Button>
      </Container>
    );
  }

  if (!produto) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Editar Produto</Typography>
      <form onSubmit={handleSalvar}>
        <TextField
          label="Nome"
          name="Name"
          value={produto.Name || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Imagem"
          name="Image"
          value={produto.Image || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Preço"
          name="Price"
          type="number"
          value={produto.Price || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Estoque"
          name="Estoque"
          type="number"
          value={produto.Estoque || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={salvando}
        >
          {salvando ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </Container>
  );
};