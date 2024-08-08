import React, { useState } from "react";
import { FilterTravel } from "../../forms/FilterTravel";
import { LoaderTravel } from "./LoaderTravel";
import { SectionFilterTravelProps } from "./section-filter-travel.types";
import { FormData, getMatches } from "@/services/api/trip/matches";
import { ListTravel } from "./ListTravel";

export function SectionFilterTravel({ id, title, optionsFilter, buttonText }: SectionFilterTravelProps) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleFetchResults = async (formData: FormData) => {
    setLoading(true);
    try {
      const response: Response = await getMatches(formData);

      if (!response.ok) {
        setResults([1, 2]);
        return
      }

      const data = await response.json();
      setResults(data || []);
    } catch (error) {
      console.error("Erro ao buscar os resultados:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id={id}>
      <div className="box-container-filter">
        <div className="box-title">
          <div className="box-image-1"></div>
          <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
          <div className="box-image-2"></div>
        </div>
        <div className="box-filter">
          <FilterTravel options={optionsFilter} buttonText={buttonText} onFetchResults={handleFetchResults} />
        </div>
        <div className="box-title">
          <div className="box-image-3"></div>
        </div>
      </div>
      {(results && results.length > 0 || loading) && (
        loading ? (
          <div className="box-results-filter">
            <LoaderTravel />
          </div>
        ) : (
          results && <div>
            <div className="box-results-filter">
              <ListTravel />
            </div>
            <div className="box-form-travel">
              <div className="box-form-travel-container">
                <p>Descubra seu perfil de viajante<br /> e faça seu cadastro para receber recomendações<br /><span style={{ color: '#0AB9AD' }}> 100% personalizadas</span></p>
                <div className="box-buttons">
                  <button className="btn-form-travel-primary">Descobrir meu perfil de viajante</button>
                  <button className="btn-form-travel-second">Explorar destinos</button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
