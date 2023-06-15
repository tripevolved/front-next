import type { RegisterCity } from "@/services/api/register/cities";

export interface RegisterCityFormProps {
    onSubmit: (city: RegisterCity) => void;
};