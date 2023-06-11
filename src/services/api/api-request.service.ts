import { ensureNotSlashEnds } from "@/utils/helpers/url.helper";
import axios from "axios";

const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
const ACCESS_TOKEN = "eyJraWQiOiIxdW9PQU1ucFJNS0VoQ05pVzRkZG0xdGFhTXZBUmw1UFBWSFVpeUFHd2VBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4NGJjODk4Mi1kY2FjLTQ0YTctYTdmMy1kOWM3MGU1OWYwMmYiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV84a01EakFLUGEiLCJjbGllbnRfaWQiOiI3anBydWNhdWlzZmQ1OHVwbHNlcHB1dHFtaSIsIm9yaWdpbl9qdGkiOiI1ZGYwNDBhZi05YWE5LTRhODctOWViMy0zOTJlNTIyMThlZDciLCJldmVudF9pZCI6IjYxZGFiZDJmLTdhNTgtNDRkMS04MWZiLWM2MmJmYWVhMjYzMSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODY0NDQ0NjcsImV4cCI6MTY4NjQ0ODA2NywiaWF0IjoxNjg2NDQ0NDY3LCJqdGkiOiIzZmVkMTM2MS1mMDM4LTQ5M2ItYmQzMS03NzE5Yjg1MTAyMDciLCJ1c2VybmFtZSI6Imdhc3Bhcm90dG8ifQ.L-xAAohHtYltEfYaG0Y170GWL2VRHKCzj48dJHgUB7EhBfthrxS0-a15nC82qQzZfxzzRhrxe8RZU3h6wCEeLnrI-zFmsMOr-kGF6-GCxC-PzfvwLhZrStS0ibEMbL3mTXe5ZrePc7dBnnSeo3CU_T8ovBTQzhy8FM4Q4Ej0SKsU6lihNRDELwHOT_-U8gBt0BSLqYtIikXaO2qd8UgEkG5c2tGR5lpgVKVD1D-ytevt-tqVBzC3e9L59NRWx6W6ABW3UKxFWQfDNYhgTHTLxSYaJGRxerXI01IWjpAdvvTgD_nB3rWnoEiPCd7cgPvfIl-Ubz7GaYh2jveXPTEIhA";

export const ApiRequestService = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "X-API-Key": API_KEY },
});

export const ApiAuthorizedRequestService = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "X-API-Key": API_KEY, "Authorization": "Bearer " + ACCESS_TOKEN },
});
