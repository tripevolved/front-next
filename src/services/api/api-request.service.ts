import { ensureNotSlashEnds } from "@/utils/helpers/url.helper";
import axios from "axios";

const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
const ACCESS_TOKEN = "eyJraWQiOiIxdW9PQU1ucFJNS0VoQ05pVzRkZG0xdGFhTXZBUmw1UFBWSFVpeUFHd2VBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4NGJjODk4Mi1kY2FjLTQ0YTctYTdmMy1kOWM3MGU1OWYwMmYiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV84a01EakFLUGEiLCJjbGllbnRfaWQiOiI3anBydWNhdWlzZmQ1OHVwbHNlcHB1dHFtaSIsIm9yaWdpbl9qdGkiOiI2YWE3ZDc0OS02OTk3LTQxOTAtODlkMC1jN2U4MmNlOGZjNzYiLCJldmVudF9pZCI6ImRkNDc3ZDBjLWYwZDQtNGZhOC1hMWQ5LWMyZDg2NjBiMjI3MyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODYzNDgxMDgsImV4cCI6MTY4NjM1MTcwOCwiaWF0IjoxNjg2MzQ4MTA4LCJqdGkiOiI4M2I2OGQxYi05ZDNkLTRjOWUtYTEzOC00NTY4M2MwYWI3ZmMiLCJ1c2VybmFtZSI6Imdhc3Bhcm90dG8ifQ.DUE5ir32rF0Yj4IjG17gJlHl0zoLFUBiLPpvFIg7XiHzxVxJ_o1SD04SkklIeSUJf3z0B72Ox_g1wG9-BKeV3hHRfNdAP7hNZPvlDifRwdlvAQbsVnutsvgHLwAiqe9rGdHwWunWbfnnLxDKLypkOmzl5RWSW_yFp5bMSgN0j6YC6W9PnzJnDMpaF8iSKXjZQccLX96WqwNEYisq2aULnGpoHpMKtynXWY6bDCaU_RIZqktBabuf8ZowtbgKm4fWKmY9ICfIUrLVLWnaml5vpCfTyyTvlKnvtWXNLraI8jboon89CXKSiNrgsVhpR3Yt_ycPD_UZE8RR6gToT1GHsw";

export const ApiRequestService = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "X-API-Key": API_KEY },
});

export const ApiAuthorizedRequestService = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "X-API-Key": API_KEY, "Authorization": "Bearer " + ACCESS_TOKEN },
});
