import axios from 'axios';
const API_URL = 'https://6862fe1b88359a373e93ab43.mockapi.io/Produtos';

export async function buscarProdutos() {
  const response = await fetch(API_URL);
  const data = await response.json();}

  