import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GradProducts.css";

export default function GradProducts() {
  const [products, setProducts] = useState([]); // Estado para armazenar produtos da API
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [categoria_selecionada, set_categoria_selecionada] = useState(null);
  const [menu_aberto, set_menu_aberto] = useState(false);
  const navigate = useNavigate();

  // Função para buscar produtos da API
  const fetchProducts = () => {
    setLoading(true);
    fetch('https://6862fe1b88359a373e93ab43.mockapi.io/Produtos')
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setErro("Erro ao carregar produtos");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

   let produtos_filtrados;
  if (categoria_selecionada) {
    produtos_filtrados = products.filter(p => 
      p.Categoria === categoria_selecionada
    );
  } else {
    produtos_filtrados = products;
  }
  

  const handleEditProduct = (id) => {
    navigate(`/editar/${id}`);
  };

  const handle_selecionar_categoria = (categoria) => {
    if (categoria === "todas") {
      set_categoria_selecionada(null); 
    } else {
      set_categoria_selecionada(categoria);
    }
    set_menu_aberto(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Tem certeza que deseja deletar este produto?")) {
      fetch(`https://6862fe1b88359a373e93ab43.mockapi.io/Produtos/${id}`, {
        method: 'DELETE'
      })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar produto");
        fetchProducts();
      })
      .catch((err) => {
        alert("Erro ao deletar produto");
      });
    }
  };

  if (loading) {
    return (
      <Container className="container_grade">
        <Typography>Carregando produtos...</Typography>
      </Container>
    );
  }

  if (erro) {
    return (
      <Container className="container_grade">
        <Typography color="error">{erro}</Typography>
      </Container>
    );
  }

  return (
    <Container className="container_grade">
      <div style={{position: "relative" }}>
        <button className="botao" onClick={() => set_menu_aberto(!menu_aberto)}>
          Selecionar Peças
        </button>

        {menu_aberto && (
          <div className="menu">
            {["todas", "Camisas", "Calças", "Jaquetas", "Sapatos"].map((Categoria) => (
              <div className="selecionar" key={Categoria} onClick={() => handle_selecionar_categoria(Categoria)}>
                {Categoria}
              </div>
            ))}
          </div>
        )}
      </div>

      <Grid container spacing={3} justifyContent="center" alignContent="stretch">
        {produtos_filtrados.map((product) => (
          <Grid item key={product.id}>
            <Card className="cards">
              <CardContent>
                <Typography className="product_Name" variant="h6" gutterBottom>
                  {product.Name.trim()}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 1,
                    mt: 1,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.Image}
                    alt={product.Name}
                    sx={{ maxWidth: 150, borderRadius: 1 }}
                  />
                </Box>

                <Typography variant="subtitle1" color="secondary">
                  R$ {product.Price ? Number(product.Price).toFixed(2) : "--"}
                </Typography>
              </CardContent>
              
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Estoque: {product.Estoque}
                </Typography>

                <Box>
                  <IconButton aria-label="editar" onClick={() => handleEditProduct(product.id)}>
                    <EditIcon className="editar_cor" />
                  </IconButton>
                  <IconButton aria-label="deletar" onClick={() => handleDeleteProduct(product.id)}>
                    <DeleteIcon className="deletar_cor" />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};