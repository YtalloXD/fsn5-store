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
import { useState } from "react";
import "./GradProducts.css";

const products = [
  {
    id: "shirt_Techwear",
    name: "Shirt Techwear",
    category: "camisas",
    stock: 10,
    image: '/imagens/shirt-techwear_16_58073545-4a93-4e97-8a49-8c0b2a8877a5.webp',
    price: 59.9,
  },
  {
    id: "black_cargo_pants",
    name: "Black Cargo Pants",
    category: "calças",
    stock: 8,
    image: '/imagens/Black_Cargo_Pants_Techwear.webp',
    price: 99.9,
  },
  {
    id: "red_techwear_jacket",
    name: "Red Techwear Jacket",
    category: "jaquetas",
    stock: 8,
    image: '/imagens/Red_Techwear_Jacket_2.webp',
    price: 99.9,
  },
]

export default function GradProducts() {
  const [categoria_selecionada, set_categoria_selecionada] = useState(null);
  const [menu_aberto, set_menu_aberto] = useState(false);

  let produtos_filtrados;

  if (categoria_selecionada) {
    produtos_filtrados = products.filter(p => p.category === categoria_selecionada);
  } else {
    produtos_filtrados = products;
  }

  const handle_selecionar_categoria = (categoria) => {
    if (categoria === "todas") {
      set_categoria_selecionada(null); 
    } else {
      set_categoria_selecionada(categoria);
    }
    set_menu_aberto(false);
  };

   return (
    <Container className="container_grade">
      <div style={{position: "relative" }}>
        <button className="botao" onClick={() => set_menu_aberto(!menu_aberto)}>
          Selecionar Peças
        </button>

        {menu_aberto && (
          <div className="menu">
            {["todas", "camisas", "calças", "jaquetas"].map((categoria) => (
              <div className="selecionar" key={categoria} onClick={() => handle_selecionar_categoria(categoria)}>
                {categoria}
              </div>
            ))}
          </div>
        )}
      </div>


      <Grid container spacing={5}>
        {produtos_filtrados.map((product) => (
          <Grid item key={product.id}>
            <Card className="cards">
              <CardContent>
                <Typography className="product_name" variant="h6" gutterBottom>
                  {product.name.trim()}
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
                    image={product.image}
                    alt={product.name}
                    sx={{ maxWidth: 150, borderRadius: 1 }}
                  />
                </Box>

                <Typography variant="subtitle1" color="secondary">
                  R$ {product.price.toFixed(2)}
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
                  Estoque: {product.stock}
                </Typography>

                <Box>
                  <IconButton aria-label="editar">
                    <EditIcon className="editar_cor" />
                  </IconButton>
                  <IconButton aria-label="deletar">
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
