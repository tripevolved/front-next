const VIACEP_URL = "https://viacep.com.br/ws";

export interface ViaCepDTO {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export async function getAddressByCep(
  postalCode: string | number
): Promise<ViaCepDTO | null> {
  const cep = String(postalCode).replace(/\D/g, "");
  if (cep.length !== 8) return null;
  try {
    const res = await fetch(`${VIACEP_URL}/${cep}/json/`);
    if (!res.ok) return null;
    const data = (await res.json()) as ViaCepDTO & { erro?: boolean };
    if (data.erro) return null;
    return data;
  } catch {
    return null;
  }
}

export const ViaCepClient = {
  getAddress: getAddressByCep,
};
