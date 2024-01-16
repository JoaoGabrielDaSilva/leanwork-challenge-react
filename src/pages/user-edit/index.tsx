import { Link, useNavigate, useParams } from "react-router-dom";
import { UserForm, UserFormData } from "../../components/UserForm";
import { userService } from "../../services/userService";
import styles from "./styles.module.scss";

export const UserEdit = () => {
  const { userCpf } = useParams();
  const navigate = useNavigate();

  const user = userService.getUser(userCpf!);

  const onSubmit = ({ email, name, phone }: UserFormData) => {
    if (user?.cpf) {
      userService.editUser(user?.cpf, { email, name, phone });
      navigate("/user-list");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      {user ? (
        <UserForm
          title="Editar Usuário Lean"
          onSubmit={onSubmit}
          defaultValues={user}
          edit
        />
      ) : (
        <div className={styles.userNotFound}>
          <div>
            Ops, parece que o usuário que você está tentando editar não existe
          </div>
          <Link to="/user-list" className={styles.seeRegisteredUsers}>
            Ver usuários cadastrados {"->"}
          </Link>
        </div>
      )}
    </div>
  );
};
