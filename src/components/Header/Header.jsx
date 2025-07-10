import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "center",
          py: 2,
          ":hover": {
            color: "black",
            bgcolor: "darkgray",
          },
        }}
      >
        FSN5-Store
        <img src="../src/assets/FSN5-Store.png" height={80} width={80} alt="Logo FSN5-Store" />
        
        <Link to="/cadastrar" style={{ marginLeft: "20px", textDecoration: "none" }}>
          <button
            style={{
              backgroundColor: "#80f1fb",
              color: "#051212",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            + Cadastrar Produto
          </button>
        </Link>
      </Typography>
    </header>
  );
}
