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
          gap: 2,
          justifyContent: "center",
          py: 1,
        }}
      >
        FSN5-Store
        <img src="../src/assets/FSN5-Store.png" height={50} width={50} />
      </Typography>
    </header>
  );
}
