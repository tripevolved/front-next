export type SubmitData<P = any> = Record<keyof P, string>;
export type SubmitHandler<P = any> = (data: SubmitData<P>) => any;

export const handleFormSubmit =
  (callback: SubmitHandler): React.FormEventHandler<HTMLFormElement> =>
  (event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const formObject = Object.fromEntries(formData.entries());
    return callback(formObject as SubmitData);
  };

export const sendFormData = async <T = any>(url: string, data: SubmitData<T>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, value as string));
  return fetch(url, { body: formData, method: "post", redirect: "manual" });
};
