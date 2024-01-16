import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import InputMask, { Props } from "react-input-mask";
import styles from "./styles.module.scss";

type TextInputProps<T extends FieldValues> = Omit<Props, "mask"> & {
  name: FieldPath<T>;
  label: string;
  control: Control<T>;
  mask?: Props["mask"];
};

export const TextInput = <T extends FieldValues>({
  name,
  control,
  label,
  mask = "",
  ...props
}: TextInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <div className={styles.container}>
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
          <InputMask
            id={name}
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            maskChar={null}
            mask={mask}
            {...field}
            {...props}
            inputRef={ref}
          />
          {error?.message ? (
            <span className={styles.error}>{error?.message}</span>
          ) : null}
        </div>
      )}
    />
  );
};
