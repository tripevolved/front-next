import { SectionBase } from "@/ui";
import { Button, TextField } from "mars-ds";
import { useState } from "react";
import { SubmitHandler, handleFormSubmit } from "@/utils/helpers/form.helpers";

import { TABS, TIME_FOR_REQUEST_IN_MILISECONDS } from "./public-destinations.constants";
import { PublicDestinationsTab } from "./public-destinations-tab";
import ToggleButton from "@/ui/components/buttons/ToggleButton/toggle-button.component";
import { useSearchParams } from "next/navigation";

export function PublicDestinations() {
  const searchParams = useSearchParams();

  const profileId = searchParams.get("profileId");

  const [searchName, setSearchName] = useState("");
  const [currentUniqueName, setCurrentUniqueName] = useState<string>(
    profileId || TABS[0].uniqueName
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTabSelection = (uniqueName: string) => {
    setCurrentUniqueName(uniqueName);
    setCurrentPage(1);
  };

  const handleSearch: SubmitHandler<{ search: string }> = (values) => {
    if (values.search.length > 0 && values.search.length < 3) {
      setErrorMsg("O nome deve possuir no mínimo 3 letras");
      return;
    }

    setSearchName(values.search);
  };

  const handleChange = (value: string) => {
    if (value == "") {
      setTimeout(() => setSearchName(value), TIME_FOR_REQUEST_IN_MILISECONDS);
    }
  };

  return (
    <SectionBase
      className="public-destinations"
      heading="Destinos"
      style={{ color: "var(--color-brand-1)" }}
    >
      <br />
      <form onSubmit={handleFormSubmit(handleSearch)} className="flex gap-md">
        <TextField
          name="search"
          error={errorMsg}
          minLength={3}
          label="Nossos destinos"
          value={searchName}
          onChange={(e: any) => handleChange(e.target.value)}
        />
        <ToggleButton iconName="search" type="submit" title="Encontrar destino" variant="neutral" />
      </form>
      <br />
      <div className="public-destinations__tab">
        {TABS.map(({ label, uniqueName }) => (
          <Button
            className="public-destinations__tab-button"
            data-active={uniqueName === currentUniqueName}
            variant="text"
            key={uniqueName}
            style={{ minWidth: 115 }}
            size="sm"
            onClick={() => handleTabSelection(uniqueName)}
          >
            {label}
          </Button>
        ))}
      </div>
      <PublicDestinationsTab
        uniqueName={currentUniqueName}
        currentPage={currentPage}
        setPage={setCurrentPage}
        searchName={searchName}
      />
    </SectionBase>
  );
}
