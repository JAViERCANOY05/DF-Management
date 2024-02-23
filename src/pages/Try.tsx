import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";

type Inputs = {
  example: string;
  exampleRequired: string;
  date: Date;
  deadLine: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("example")} />

      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}

      <Controller
        control={control}
        name="deadLine"
        defaultValue="2022-01-01" // Set your default value here
        rules={{ required: true }} //optional
        render={({
          field: { onChange, name, value },
          fieldState: { invalid, isDirty }, //optional
          formState: { errors }, //optional, but necessary if you want to show an error message
        }: any) => (
          <DatePicker
            value={value}
            onChange={(date: any) => {
              onChange(date?.isValid ? date : "");
            }}
            // Add margin and padding to the input field
            style={{ padding: "20px" }}
          />
        )}
      />
      <input type="submit" />
    </form>
  );
}
