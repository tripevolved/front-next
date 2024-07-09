import React from "react";
import { Button, Icon } from "mars-ds";
import styles from "./filter-travel.module.scss";

export const FilterTravel = (props: Omit<any, "options">) => {
  return (
    <div className="box-filter-travel">
      <div className="select-wrapper">
        <Icon name="user" className="custom-icon-filter-travel" />
        <select>
          <option>Aventureiro</option>
        </select>
        <Icon name="chevron-down" className="custom-icon-chevron-down" />
      </div>
      <div className="select-wrapper">
        <Icon name="target" className="custom-icon-filter-travel" />
        <select>
          <option>Descansar</option>
        </select>
        <Icon name="chevron-down" className="custom-icon-chevron-down" />
      </div>
      <div className="select-wrapper">
        <Icon name="clock" className="custom-icon-filter-travel" />
        <select>
          <option>5 dias</option>
        </select>
        <Icon name="chevron-down" className="custom-icon-chevron-down" />
      </div>
      <div className="select-wrapper">
        <Icon name="dollar-sign" className="custom-icon-filter-travel" />
        <select>
          <option>Até R$5 mil</option>
        </select>
        <Icon name="chevron-down" className="custom-icon-chevron-down" />
      </div>
      <Button>
        Descobrir minha viagem
      </Button>
    </div>
  );
};
