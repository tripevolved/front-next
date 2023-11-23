import { SectionBase } from "@/ui";
import { Button, TextField } from "mars-ds";
import { useState } from "react";
import { SubmitHandler, handleFormSubmit } from "@/utils/helpers/form.helpers";

import { TABS } from "./public-destinations.constants";
import { PublicDestinationsTab } from "./public-destinations-tab";

export function PublicDestinations() {
  const [searchName, setSearchName] = useState("");
  const [currentUniqueName, setCurrentUniqueName] = useState<string>(TABS[0].uniqueName);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTabSelection = (uniqueName: string) => {
    setCurrentUniqueName(uniqueName);
    setCurrentPage(1);
  };

  const handleSearch: SubmitHandler<{ search: string }> = (values) => {
    if (values.search.length < 3) {
      setErrorMsg("O nome deve possuir no mínimo 3 letras");
      return;
    }

    setSearchName(values.search);
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
        />
        <Button iconName="search" type="submit" style={{ color: "var(--color-gray-4)" }}></Button>
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
