import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
  Box,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GradProducts.css";

const API_URL = 'https://6862fe1b88359a373e93ab43.mockapi.io/Produtos';

export default function GradProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [categoria_selecionada, set_categoria_selecionada] = useState(null);
  const [menu_aberto, set_menu_aberto] = useState(false);
  const navigate = useNavigate();

  // Função para buscar produtos da API
  const fetchProducts = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        return res.json();
      })
      .then((data) => {
        console.log("Dados recebidos da API:", data); 
        

        console.log("=== DEBUG DOS PRIMEIROS PRODUTOS ===");
        data.forEach((produto, index) => {
          if (index < 5) { 
            console.log(`Produto ${index + 1}:`, produto);
            console.log(`- ID: ${produto.id} (tipo: ${typeof produto.id})`);
            console.log(`- Nome: ${produto.Name} (tipo: ${typeof produto.Name})`);
            console.log(`- Preço: ${produto.Price} (tipo: ${typeof produto.Price})`);
            console.log(`- Categoria: ${produto.Categoria} (tipo: ${typeof produto.Categoria})`);
            console.log("---");
          }
        });
        
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro detalhado:", err); 
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
    console.log("Editando produto com ID:", id); 
    navigate(`/editar/${id}`);
  };

  const handle_selecionar_categoria = (categoria) => {
    console.log("Categoria selecionada:", categoria); 
    if (categoria === "todas") {
      set_categoria_selecionada(null); 
    } else {
      set_categoria_selecionada(categoria);
    }
    set_menu_aberto(false);
  };

  const handleDeleteProduct = (id) => {
    console.log("Tentando deletar produto com ID:", id); 
    if (window.confirm("Tem certeza que deseja deletar este produto?")) {
      fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar produto");
        console.log("Produto deletado com sucesso!"); 
        fetchProducts(); 
      })
      .catch((err) => {
        console.error("Erro ao deletar:", err); 
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
      {/* Área com botão de filtro e botão de cadastrar */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2 
      }}>
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

        {/* Botão para cadastrar novo produto */}
        <Button 
          variant="contained" 
          onClick={() => navigate('/cadastrar')}
          color="primary"
          size="large"
          class="botao"
        >
          Cadastrar Novo Produto
        </Button>
      </Box>

      <Grid container spacing={5} justifyContent="center" alignContent="stretch">
        {produtos_filtrados.map((product, index) => {
          console.log(`Renderizando produto ${index + 1}:`, product);
          
          return (
            <Grid item key={product.id}>
              <Card className="cards">
                <CardContent>
                  <Typography className="product_Name" variant="h6" gutterBottom>
                    {product.Name ? product.Name.trim() : 'Nome não informado'}
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
                    R$ {product.Price ? Number(product.Price).toFixed(2) : "0,00"}
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
          );
        })}
      </Grid>
    </Container>
  );
};