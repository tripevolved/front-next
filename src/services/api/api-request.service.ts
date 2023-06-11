import { ensureNotSlashEnds } from "@/utils/helpers/url.helper";
import axios from "axios";

const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
const ACCESS_TOKEN =
  "eyJraWQiOiIxdW9PQU1ucFJNS0VoQ05pVzRkZG0xdGFhTXZBUmw1UFBWSFVpeUFHd2VBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4NGJjODk4Mi1kY2FjLTQ0YTctYTdmMy1kOWM3MGU1OWYwMmYiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV84a01EakFLUGEiLCJjbGllbnRfaWQiOiI3anBydWNhdWlzZmQ1OHVwbHNlcHB1dHFtaSIsIm9yaWdpbl9qdGkiOiJmYTNmMzg0Yy0zZDE2LTRkOGQtODQ4Mi1iYmEzODQwOTAwMjgiLCJldmVudF9pZCI6ImZiY2IwYjI2LWRlOWEtNDRmMS1hNDBmLTkxNzFlMjdiMGM2YSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODY0MDE3MTUsImV4cCI6MTY4NjQwNTMxNSwiaWF0IjoxNjg2NDAxNzE1LCJqdGkiOiI2NzUzNDA3Yi02ZjY5LTRkNjktOWM0Yy1iMDYzNWZjMmFiY2YiLCJ1c2VybmFtZSI6Imdhc3Bhcm90dG8ifQ.kIcpjVpv8H69ep_FSzU3gQM-uECVIz3Y_6Y-1xabWifayEbA3MjPCjsXMwTOHxmA-wqzDfIonD8cmEjOc7WGmviqd8BTQcNrZuZhuA-Vq_QXBHL6ZD8LP-wsw0f9XZ_QxuzEMM7v0UijiUWWLen-B_KOrbUdwk5NLTYRsBnqH0pO_n1lS3LhHWQK81fK2y41wz4AxjluR-oT-EtNMRzKuLUVAOrS0sLRrrS6JTOsZsgJM3HBpVWfo99BOxF0uN00zx5TN12bRFNLdfGgYDqtK0n9lFhRVEnkb8ogm-Tq2yTgxF5vGkUjYhiScKva6z6oI2cEvQzRwjoXvq-n5tcOVg";

export const ApiRequestService = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "X-API-Key": API_KEY },
});

export const ApiAuthorizedRequestService = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "X-API-Key": API_KEY, "Authorization": "Bearer " + ACCESS_TOKEN },
});
