import { ensureNotSlashEnds } from "@/utils/helpers/url.helper";
import axios from "axios";

const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
const ACCESS_TOKEN = "eyJraWQiOiIxdW9PQU1ucFJNS0VoQ05pVzRkZG0xdGFhTXZBUmw1UFBWSFVpeUFHd2VBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4NGJjODk4Mi1kY2FjLTQ0YTctYTdmMy1kOWM3MGU1OWYwMmYiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV84a01EakFLUGEiLCJjbGllbnRfaWQiOiI3anBydWNhdWlzZmQ1OHVwbHNlcHB1dHFtaSIsIm9yaWdpbl9qdGkiOiJiMjk1Y2FhZi02ZTgzLTRmM2UtYTc2OS1kYzc0NjI1MjFjODAiLCJldmVudF9pZCI6IjQyN2NkY2ExLTgxYWUtNDIxNS1hZWNkLTAyZjkzMGU5NTNhYyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODY0MjMxMjEsImV4cCI6MTY4NjQyNjcyMSwiaWF0IjoxNjg2NDIzMTIxLCJqdGkiOiIyYTM3MDhlYS1iNmM4LTQ4YzUtYTI4MC1mZjQzZDI1NWU1NWQiLCJ1c2VybmFtZSI6Imdhc3Bhcm90dG8ifQ.Wdt6-noNLdTY6f17GSSUOVH8LWhC5FQxku3dUwxIcmwTbJjw3Tc_tneb_v4tiEzgK3WGhMW6kRaNIIRJa7gLlBhDOjFuag0nssJzdCFXC7FnN0AI-zUfwPR6adxaqyXygOtOY08xUGND4Um0qwmOP9xso5gHp0gbX9VWrbPgTcs-GIXZUppB8CmCkDeGgablG5gOE7-Mk0iLKSyA3eODccKisHC3jY59XiY0p1fN-mjFJGiozrEXL5mdAF_gNqrlWxh4AFojzj5-0piUd7oTlK5DwhMauaAKL7JslY5Kq7akb_Hk69cSD3-dVm5dp5y_qgYrBxlPHstbmcYVud4sdQ";

export const ApiRequestService = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "X-API-Key": API_KEY },
});

export const ApiAuthorizedRequestService = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "X-API-Key": API_KEY, "Authorization": "Bearer " + ACCESS_TOKEN },
});
