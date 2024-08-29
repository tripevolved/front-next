import React, { useState, useEffect } from "react";
import { Button, Icon } from "mars-ds";
import { FilterTravelProps } from "./filter-travel.types";

export const FilterTravel = ({ options, buttonText, onFetchResults }: FilterTravelProps) => {
  const [formData, setFormData] = useState({
    travelerProfile: options.travelerProfiles[0]?.value || "",
    objectiveId: options.objectiveIds[0]?.value || "",
    days: options.days[0]?.value || "",
    budget: options.budgets[0]?.value || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFetchClick = () => {
    onFetchResults(formData);
  };

  return (
    <div className="box-filter-travel">
      <div className="select-wrapper">
        <Icon name="user" className="custom-icon-filter-travel" />
        <select name="travelerProfile" value={formData.travelerProfile} onChange={handleChange}>
          {options?.travelerProfiles.map((profile) => (
            <option key={profile.value} value={profile.value}>{profile.label}</option>
          ))}
        </select>
        <Icon name="chevron-down" className="custom-icon-chevron-down" />
      </div>
      <div className="select-wrapper">
        <Icon name="target" className="custom-icon-filter-travel" />
        <select name="objectiveId" value={formData.objectiveId} onChange={handleChange}>
          {options?.objectiveIds.map((objective) => (
            <option key={objective.value} value={objective.value}>{objective.label}</option>
          ))}
        </select>
        <Icon name="chevron-down" className="custom-icon-chevron-down" />
      </div>
      <div className="select-wrapper">
        <Icon name="clock" className="custom-icon-filter-travel" />
        <select name="days" value={formData.days} onChange={handleChange}>
          {options?.days.map((day) => (
            <option key={day.value} value={day.value}>{day.label}</option>
          ))}
        </select>
        <Icon name="chevron-down" className="custom-icon-chevron-down" />
      </div>
      <div className="select-wrapper">
        <Icon name="dollar-sign" className="custom-icon-filter-travel" />
        <select name="budget" value={formData.budget} onChange={handleChange}>
          {options?.budgets.map((budget) => (
            <option key={budget.value} value={budget.value}>{budget.label}</option>
          ))}
        </select>
        <Icon name="chevron-down" className="custom-icon-chevron-down" />
      </div>
      <Button onClick={handleFetchClick}>
        {buttonText || 'Descobrir minha viagem'}
      </Button>
    </div>
  );
};
