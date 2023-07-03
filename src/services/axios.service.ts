import axios from "axios";
import {baseUrl} from "../constants";

const axiosService = axios.create({baseURL:baseUrl});

export {axiosService}