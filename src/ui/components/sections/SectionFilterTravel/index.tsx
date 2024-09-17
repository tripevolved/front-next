import React, { useState } from "react";
import { useRouter } from "next/router";
import { FilterTravel } from "../../forms/FilterTravel";
import { LoaderTravel } from "./LoaderTravel";
import { SectionFilterTravelProps, TravelChoice } from "./section-filter-travel.types";
import { FormData, getMatches } from "@/services/api/trip/matches";
import { ListTravel } from "./ListTravel";

export function SectionFilterTravel({
  id,
  title,
  optionsFilter,
  buttonText,
}: SectionFilterTravelProps) {
  const [loading, setLoading] = useState(false);
  const [mainChoice, setMainChoice] = useState<TravelChoice | null>(null);
  const [otherChoices, setOtherChoices] = useState<TravelChoice[]>([]);
  const router = useRouter();

  const handleFetchResults = async (formData: FormData) => {
    setLoading(true);
    try {
      const response: any = await getMatches(formData);

      setMainChoice(response.mainChoice);
      setOtherChoices(response.otherChoices);
    } catch (error) {
      console.error("Erro ao buscar os resultados:", error);
      setMainChoice(null);
      setOtherChoices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileClick = () => {
    router.push("/perfil");
  };

  const handleExploreClick = () => {
    router.push("/destinos");
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
          <FilterTravel
            options={optionsFilter}
            buttonText={buttonText}
            onFetchResults={handleFetchResults}
          />
        </div>
        <div className="box-title">
          <div className="box-image-3"></div>
        </div>
      </div>
      {(mainChoice || loading) &&
        (loading ? (
          <div className="box-results-filter">
            <LoaderTravel />
          </div>
        ) : (
          mainChoice && (
            <div>
              <div className="box-results-filter">
                <ListTravel mainChoice={mainChoice} otherChoices={otherChoices} />
              </div>
              <div className="box-form-travel">
                <div className="box-form-travel-container">
                  <p>
                    Descubra seu perfil de viajante
                    <br /> e faça seu cadastro para receber recomendações
                    <br />
                    <span style={{ color: "#0AB9AD" }}> 100% personalizadas</span>
                  </p>
                  <div className="box-buttons">
                    <button className="btn-form-travel-primary" onClick={handleProfileClick}>
                      Descobrir meu perfil de viajante
                    </button>
                    <button className="btn-form-travel-second" onClick={handleExploreClick}>
                      Explorar destinos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
    </div>
  );
}
