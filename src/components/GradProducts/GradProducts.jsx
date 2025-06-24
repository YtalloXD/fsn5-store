import { Box, Container } from "@mui/material";
import "./GradProducts.css";

export default function GradProducts() {
  return (
    <>
      <Container
        sx={{
          display: "grid",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <ul>
          <Box sx={{ width: { sx: 1, md: 200 }, height: 320 }}>
            <li>
              <img
                src="src\assets\shirt-techwear_16_58073545-4a93-4e97-8a49-8c0b2a8877a5.webp"
                alt="SHIRT TECHWEAR"
                width={220}
                height={220}
              />
              SHIRT TECHWEAR R$240,95
            </li>
          </Box>
          <Box sx={{ width: { sx: 1, md: 200 }, height: 320 }}>
            <li>
              <img
                src="src\assets\Black_Cargo_Pants_Techwear.webp"
                alt=""
                width={220}
                height={220}
              />
              BLACK CARGO PANTS TECHWEAR <br />
              R$300,00
            </li>
          </Box>
          <Box sx={{ width: { sx: 1, md: 200 }, height: 320 }}>
            <li>
              <img
                src="src\assets\Red_Techwear_Jacket_2.webp"
                alt=""
                width={250}
                height={250}
              />
              RED TECHWEAR JACKET <br />
              R$350,00
            </li>
          </Box>
        </ul>
      </Container>
    </>
  );
}
