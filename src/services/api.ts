import axios from "axios";

export const api = axios.create({
  baseURL: "https://whatsapi.webi9.com.br/",
})