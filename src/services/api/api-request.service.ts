import { ensureNotSlashEnds } from "@/utils/helpers/url.helper";
import axios from "axios";

const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

export const ApiRequestService = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "X-API-Key": API_KEY },
});
