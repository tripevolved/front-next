import type { RegisterCity } from "@/services/api/register/cities";

export interface RegisterCityFormProps {
    onSubmit: (cityId: string) => void;
};