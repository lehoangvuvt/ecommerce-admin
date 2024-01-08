"use client";

import { useState } from "react";

type TFormValues<T> = {
  [key in keyof T]: any;
};

const useForm = <T>(intialValues: TFormValues<T>) => {
  const [values, setValues] = useState<TFormValues<T>>(intialValues);

  const setValue = (value: any, key: keyof T) => {
    const updatedValues = structuredClone(values);
    updatedValues[key] = value;
    setValues(updatedValues);
  };

  return {
    values,
    setValue,
  };
};

export default useForm;
