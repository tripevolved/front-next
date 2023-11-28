import { SelectFieldSimple, type SelectFieldSimpleProps } from "@/ui";

export const SelectFieldGender = (props: Omit<SelectFieldSimpleProps, "options">) => {
  return (
    <SelectFieldSimple
      name="gender"
      {...props}
      options={[
        { label: "Feminino", value: "female" },
        { label: "Masculino", value: "male" },
      ]}
      label="Sexo"
    />
  );
};
