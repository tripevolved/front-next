import { ensureNotSlashEnds } from "@/utils/helpers/url.helper";
import axios from "axios";

const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
const ACCESS_TOKEN = "eyJraWQiOiIxdW9PQU1ucFJNS0VoQ05pVzRkZG0xdGFhTXZBUmw1UFBWSFVpeUFHd2VBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4NGJjODk4Mi1kY2FjLTQ0YTctYTdmMy1kOWM3MGU1OWYwMmYiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV84a01EakFLUGEiLCJjbGllbnRfaWQiOiI3anBydWNhdWlzZmQ1OHVwbHNlcHB1dHFtaSIsIm9yaWdpbl9qdGkiOiJhNzY1NWYyNS02NGJmLTRlYmUtYWVlMy05MzllYjc3YjE1YzgiLCJldmVudF9pZCI6ImY3OTVkM2EyLTQzMDEtNDIwZC1hMjM5LTBiYTg0ZmY0MzgzYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODYzMjYxMTksImV4cCI6MTY4NjMyOTcxOSwiaWF0IjoxNjg2MzI2MTE5LCJqdGkiOiIwMGEwZjZmOS05MGMyLTRiZTEtYTM0Ny02ZDI0YjliZDM2MTIiLCJ1c2VybmFtZSI6Imdhc3Bhcm90dG8ifQ.oybv32ernxoFZ5wzbdIwwkCk4hc-4dsLzHL6HbCQZeaUUFP-fkHvtVAPhVAU1a0MRO6XfUhXSfM7xixOG7QyMmKkosi_0oGfcryNIqYEAhbJ5QBmM0lO7OTxCRGfYuXG6srqPEoFUUMzL7gnherGN1peFcwMY3euFCBJd92QxbSdnJmZpzZVgQKOV1l9bOl53PRDQFnOTklQSpO1uvYFWWwNX2woPp2CKo91Kvnq-28zOaI-fKN52WM65lM6__aamAhwWnrE2fvSlGsxrCuYaCJAOzeoVs8eSUkBBIGr358TSBia3dPlHBu7h3i_8xSdL3T5ahOdOjtCGbY-TeeMFQ";

export const ApiRequestService = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "X-API-Key": API_KEY },
});

export const ApiAuthorizedRequestService = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "X-API-Key": API_KEY, "Authorization": "Bearer " + ACCESS_TOKEN },
});
