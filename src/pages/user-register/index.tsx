import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { TextInput } from "../../components/text-input";
import { validateCpf } from "../../utils/validateCpf";
import styles from "./styles.module.scss";
import { Button } from "../../components/button";
import { userService } from "../../services/userService";
import { Link } from "react-router-dom";

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

type FormData = z.infer<typeof formSchema>;

export const UserRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      phone: "",
    },
  });

  const buttonIsDisabled =
    !dirtyFields?.cpf ||
    !dirtyFields?.email ||
    !dirtyFields?.name ||
    !dirtyFields?.phone;

  const onSubmit = (data: FormData) => {
    userService.registerUser(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <form className={styles.form}>
        <span className={styles.title}>Lean Cadastro</span>
        <TextInput control={control} name="name" label="Nome" />
        <TextInput
          control={control}
          name="cpf"
          label="CPF"
          inputMode="numeric"
          mask="999.999.999-99"
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
          <Button onClick={handleSubmit(onSubmit)} disabled={buttonIsDisabled}>
            Cadastrar
          </Button>
          <Link to="user-list" className={styles.seeRegisteredUsers}>
            Ver usuários cadastrados {"->"}
          </Link>
        </div>
      </form>
    </div>
  );
};
