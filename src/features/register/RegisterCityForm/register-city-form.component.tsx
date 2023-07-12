import type { RegisterCityFormProps } from "./register-city-form.types";

import { SubmitButton } from "mars-ds";
import { Picture, Text, AutoCompleteTextField } from "@/ui";
import { useState } from "react";
import { RegisterApiService } from "@/services/api";
import { HintData } from "@/ui";

export function RegisterCityForm({ onSubmit }: RegisterCityFormProps) {
  const [selectedCity, setSelectedCity] = useState('');

  const handleRegisterSubmit = () => {
    onSubmit(selectedCity);
  }

  const handleCityData = async (search: string) => {
    var cities = (await RegisterApiService.getCities(search))
      .map(({ id, name }, index) => {
        return { internalValue: id, shownValue: name } as HintData;
      });
    return cities;
  }

  const handleOnSetSelectedCity = (value: string) => {
    setSelectedCity(value);
  };

  return (
    <>
      <Text className="register-city-form__title" heading size="xs">
        Para te ajudar a construir a viagem ideal, vamos fazer mais algumas perguntas.
      </Text>
      <Text className="register-city-form__text" size="md">
        :check: Perfil do viajante
        :uncheck: Cidade
        :uncheck: Datas
        :uncheck: Orçamento
        :uncheck: Objetivo da viagem
      </Text>
      <Picture
        className="register-city-form__icon"
        alt="Ícone de pin de localização"
        style={{ height: 40, width: 48 }}
        src="/brand/logo-symbol-circle.svg"
      />
      <Text className="register-city-form__text" heading size="xs">
        Em que cidade você mora atualmente?
      </Text>
      <AutoCompleteTextField 
        getData={handleCityData}
        onSet={handleOnSetSelectedCity}
        className="mt-xl"
        type="text"
        name="city"
        label="Cidade"
        required
      />
      <SubmitButton
        variant="custom"
        color="white"
        backgroundColor="var(--color-brand-2)"
        hoverBackgroundColor="var(--color-secondary-900)"
        onClick={handleRegisterSubmit}>
          Continuar
      </SubmitButton>
    </>
  );
}
