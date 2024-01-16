import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { TextInput } from "../TextInput";
import { validateCpf } from "../../utils/validateCpf";
import styles from "./styles.module.scss";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { User } from "../../models/User";

const formSchema = z.object({
  name: string({ required_error: "O nome deve ser preenchido" }).min(3, {
    message: "O nome deve ter pelo menos 3 caracteres",
  }),
  cpf: string({ required_error: "O CPF deve ser preenchido" }).refine(
    validateCpf,
    { message: "O CPF deve ser válido" }
  ),
  email: string({ required_error: "O e-mail deve ser preenchido" }).email({
    message: "O e-mail deve ser válido",
  }),
  phone: string({ required_error: "O telefone deve ser preenchido" }).min(13, {
    message: "O telefone deve ser válido",
  }),
});

export type UserFormData = z.infer<typeof formSchema>;

type UserFormProps = {
  title: string;
  edit?: boolean;
  defaultValues?: User;
  onSubmit: (data: UserFormData) => void;
};

export const UserForm = ({
  title,
  edit,
  onSubmit,
  defaultValues,
}: UserFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      cpf: "",
      email: "",
      phone: "",
    },
  });

  const buttonIsDisabled =
    !edit &&
    (!dirtyFields?.cpf ||
      !dirtyFields?.email ||
      !dirtyFields?.name ||
      !dirtyFields?.phone);

  return (
    <form className={styles.form}>
      <span className={styles.title}>{title}</span>
      <TextInput control={control} name="name" label="Nome" />
      <TextInput
        control={control}
        name="cpf"
        label="CPF"
        inputMode="numeric"
        mask="999.999.999-99"
        disabled={edit}
      />
      <TextInput control={control} name="email" label="E-mail" />
      <TextInput
        control={control}
        name="phone"
        label="Telefone"
        inputMode="numeric"
        mask="99 99999-9999"
      />
      <div className={styles.formFooter}>
        <Button
          className={styles.submitButton}
          onClick={handleSubmit(onSubmit)}
          disabled={buttonIsDisabled}
        >
          {edit ? "Editar" : "Cadastrar"}
        </Button>
        {!edit ? (
          <Link to="/user-list" className={styles.seeRegisteredUsers}>
            Ver usuários cadastrados {"->"}
          </Link>
        ) : null}
      </div>
    </form>
  );
};
