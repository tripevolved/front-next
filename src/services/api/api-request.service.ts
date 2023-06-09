import { ensureNotSlashEnds } from "@/utils/helpers/url.helper";
import axios from "axios";

const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
const ACCESS_TOKEN = "eyJraWQiOiIxdW9PQU1ucFJNS0VoQ05pVzRkZG0xdGFhTXZBUmw1UFBWSFVpeUFHd2VBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4NGJjODk4Mi1kY2FjLTQ0YTctYTdmMy1kOWM3MGU1OWYwMmYiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV84a01EakFLUGEiLCJjbGllbnRfaWQiOiI3anBydWNhdWlzZmQ1OHVwbHNlcHB1dHFtaSIsIm9yaWdpbl9qdGkiOiI4Yjc5OTY3NS03NTE3LTRiMGUtOWU5NS0yZWExZTI2Yjc5YTgiLCJldmVudF9pZCI6IjUxZWU4MWE5LWQ2ZDctNDA2My1iODFjLTI1YWFlYzBhMjk3ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODYzMzYzMDYsImV4cCI6MTY4NjMzOTkwNiwiaWF0IjoxNjg2MzM2MzA2LCJqdGkiOiJlNGY5MGYxMy01YzQxLTQwYzMtYjQ2Ni02YzE3MDJhYzEzMGYiLCJ1c2VybmFtZSI6Imdhc3Bhcm90dG8ifQ.Qj2CnLxOYPahkmT5KZixcuVHKUjrLJyJ3t9mTbWWBS7p0R3QavZYLnsmTs6KMvB9Sp8G9KWdN0YeSyAG8JreZ7Nq5svnc_1__B_xPZJ1G_WbVrk8QfP7cXk6BeB_8WWWfxymszJH2r2SABhKTJG5cPZnBIYzGBrCaZ-hsUZbyFO2mG1xKfnTWWxbsZRFHDRv49kTmKGNhghY40V0bIiS8QxVx84OV-Gd_w2_TCJpFmqUtwSlPcBu2oq-3j9axEYjkx_KQhHLcuD-fzaAwGxC9FkVWoCcinPMwVOnbinqnJEaThezicJ__GvaIOseeQvda9geA1SdowzYjAYcTlAj9w";

export const ApiRequestService = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "X-API-Key": API_KEY },
});

export const ApiAuthorizedRequestService = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: { "X-API-Key": API_KEY, "Authorization": "Bearer " + ACCESS_TOKEN },
});
