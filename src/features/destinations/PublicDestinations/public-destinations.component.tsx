import { SectionBase } from "@/ui";
import { Button, TextField } from "mars-ds";
import { useState } from "react";

import { TABS } from "./public-destinations.constants";
import { PublicDestinationsTab } from "./public-destinations-tab";

export function PublicDestinations() {
  const [searchName, setSearchName] = useState("");
  const [currentUniqueName, setCurrentUniqueName] = useState<string>(TABS[0].uniqueName);
  const [currentPage, setCurrentPage] = useState(1);
  const [infoMsg, setInfoMsg] = useState("O nome deve possuir no mínimo 3 letras");

  const handleTabSelection = (uniqueName: string) => {
    setCurrentUniqueName(uniqueName);
    setCurrentPage(1);
  };

  const handleChangeSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // @ts-ignore
    if (e.target.value.length >= 3) {
      setInfoMsg("Pressione 'Enter'");
      if (e.key === "Enter") {
        // @ts-ignore
        setSearchName(e.target.value);
      }
    } else setInfoMsg("O nome deve possuir no mínimo 3 letras");
  };

  return (
    <SectionBase
      className="public-destinations"
      heading="Destinos"
      style={{ color: "var(--color-brand-1)" }}
    >
      <br />
      <TextField
        info={infoMsg}
        minLength={3}
        label="Nossos destinos"
        rightIconButton={{ name: "search" }}
        value={searchName}
        onKeyUp={(e) => handleChangeSearch(e)}
      />
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
