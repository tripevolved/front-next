import React, { useState, useEffect } from "react";
import { Button, Icon } from "mars-ds";
import { FilterTravelProps } from "./filter-travel.types";
import { getMatches } from "@/services/api/trip/matches";

export const FilterTravel = ({ options, buttonText }: FilterTravelProps) => {
  const [formData, setFormData] = useState({
    travelerType: "",
    travelPurpose: "",
    duration: "",
    budget: ""
  });

  const fetchMatchedDestinations = async () => {
    const response = await getMatches({
      travelerType: formData.travelerType,
      travelPurpose: formData.travelPurpose,
      duration: formData.duration,
      budget: formData.budget,
    });
  };

  useEffect(() => {
    if (options) {
      setFormData({
        travelerType: options.travelerTypes[0].value,
        travelPurpose: options.travelPurposes[0].value,
        duration: options.durations[0].value,
        budget: options.budgets[0].value
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="box-filter-travel">
      <div className="select-wrapper">
        <Icon name="user" className="custom-icon-filter-travel" />
        <select name="travelerType" value={formData.travelerType} onChange={handleChange}>
          {options.travelerTypes.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        <Icon name="chevron-down" className="custom-icon-chevron-down" />
      </div>
      <div className="select-wrapper">
        <Icon name="target" className="custom-icon-filter-travel" />
        <select name="travelPurpose" value={formData.travelPurpose} onChange={handleChange}>
          {options.travelPurposes.map((purpose) => (
            <option key={purpose.value} value={purpose.value}>{purpose.label}</option>
          ))}
        </select>
        <Icon name="chevron-down" className="custom-icon-chevron-down" />
      </div>
      <div className="select-wrapper">
        <Icon name="clock" className="custom-icon-filter-travel" />
        <select name="duration" value={formData.duration} onChange={handleChange}>
          {options.durations.map((duration) => (
            <option key={duration.value} value={duration.value}>{duration.label}</option>
          ))}
        </select>
        <Icon name="chevron-down" className="custom-icon-chevron-down" />
      </div>
      <div className="select-wrapper">
        <Icon name="dollar-sign" className="custom-icon-filter-travel" />
        <select name="budget" value={formData.budget} onChange={handleChange}>
          {options.budgets.map((budget) => (
            <option key={budget.value} value={budget.value}>{budget.label}</option>
          ))}
        </select>
        <Icon name="chevron-down" className="custom-icon-chevron-down" />
      </div>
      <Button onClick={fetchMatchedDestinations}>
        {buttonText || 'Descobrir minha viagem'}
      </Button>
    </div>
  );
};
