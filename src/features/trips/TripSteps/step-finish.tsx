import type { StepComponentProps } from "@/features";

import { useState } from "react";

import { IncrementField, Text } from "@/ui";
import { Grid, SubmitButton } from "mars-ds";

import { formatToPlural } from "@/utils/helpers/number.helpers";

const DEFAULT_ADULTS = 2;
const BASE_CHILDREN_AGE = 6;

export function StepFinish({ onNext, numAdults = DEFAULT_ADULTS, numChildren, childrenAgeInfo }: StepComponentProps) {
  console.log(numChildren);
  console.log(childrenAgeInfo);

  const [submitting, setSubmitting] = useState(false);
  const [adults, setAdults] = useState(numAdults);
  const [children, setChildrenInternal] = useState(numChildren ?? 0);
  const [childrenAges, setChildrenAges] = useState((childrenAgeInfo ?? []) as number[]);

  const handleSubmit = () => {
    setSubmitting(true);
    const travelers = { adults, children, childrenAges };
    onNext({ travelers });
  };

  const setChildren = (value: number) => {
    if (value <= 0) {
      setChildrenAges([]);
    } else if (value > children) {
      setChildrenAges(
        [
          ...childrenAges,
          BASE_CHILDREN_AGE
        ]
      )
    } else {
      setChildrenAges(childrenAges.slice(0, value));
    }
    setChildrenInternal(value);
  };

  const handleSetChildrenAges = (index: number, value: number) => {
    const childrenAgeInformation = childrenAges.map((a, i) => {
      if (i === index) {
        return value;
      } else {
        return childrenAges[i];
      }
    });

    setChildrenAges(childrenAgeInformation);
  };

  return (
    <Grid gap={24}>
      <div>
        <Text heading size="xs" className="mt-md">
          Quantas pessoas vão viajar?
        </Text>
        <Text className="color-text-secondary mt-sm" size="md">
          Máximo de 8 adultos (Incluindo você mesmo)
        </Text>
      </div>
      <IncrementField
        className="slider--with-steps"
        name="adults"
        formatter={formatToPlural("adulto", "adultos")}
        min={1}
        max={8}
        defaultValue={adults}
        onSelect={setAdults}
        step={1}
        disabled={submitting}
      />
      <IncrementField
        className="slider--with-steps"
        name="children"
        formatter={formatToPlural("criança", "crianças")}
        min={0}
        max={8}
        defaultValue={children}
        onSelect={setChildren}
        step={1}
        disabled={submitting}
      />
      {children > 0 ? (
        <>
          <Text heading size="xs">Qual a idade {(children === 1 ? "da criança" : "das crianças")}?</Text>
          <Grid columns={{"sm": 1, "md": 2}}>
            {childrenAges?.map((childrenAge, index) => 
              <IncrementField
                key={index}
                className="slider--with-steps"
                name={`childrenAge[${index}]`}
                formatter={formatToPlural("ano", "anos")}
                min={0}
                max={17}
                defaultValue={childrenAge}
                onSelect={(value) => handleSetChildrenAges(index, value)}
                step={1}
                disabled={submitting}
              />
            )}
          </Grid>
        </>) 
        : <></>}
      <SubmitButton
        className="mt-md"
        variant="tertiary"
        disabled={submitting}
        submitting={submitting}
        onClick={handleSubmit}
      >
        Receber minha recomendação
      </SubmitButton>
    </Grid>
  );
}
