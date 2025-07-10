import { Typography } from "@mui/material";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "center",
          py: 2,
        }}
      >
        FSN5-Store
        <img src="../src/assets/FSN5-Store.png" height={80} width={80} />
      </Typography>
    </header>
  );
}
