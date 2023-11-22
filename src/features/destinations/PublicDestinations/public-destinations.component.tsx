import { SectionBase } from "@/ui";
import { Button, TextField } from "mars-ds";
import { useState } from "react";

import { TABS } from "./public-destinations.constants";
import { PublicDestinationsTab } from "./public-destinations-tab";

export function PublicDestinations() {
  const [searchName, setSearchName] = useState("");
  const [currentUniqueName, setCurrentUniqueName] = useState<string>(TABS[0].uniqueName);
  const [currentPage, setCurrentPage] = useState(1);

  const handleTabSelection = (uniqueName: string) => {
    setCurrentUniqueName(uniqueName);
    setCurrentPage(1);
  };

  return (
    <SectionBase
      className="public-destinations"
      heading="Destinos"
      style={{ color: "var(--color-brand-1)" }}
    >
      <br />
      <TextField
        label="Nossos destinos"
        rightIconButton={{ name: "search" }}
        value={searchName}
        onChange={(e: any) => setSearchName(e.target.value)}
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
