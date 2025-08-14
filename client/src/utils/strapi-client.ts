import { getStrapiURL } from "./index";
import { strapi } from '@strapi/client';

const BASE_API_URL = getStrapiURL() + "/api";
const strapiClient = strapi({ baseURL: BASE_API_URL });
export { strapiClient };