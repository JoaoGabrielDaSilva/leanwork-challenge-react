import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useState } from "react";
import { User } from "../../models/User";
import { userService } from "../../services/userService";
import { CiEdit } from "react-icons/ci";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";

export const UserList = () => {
  const [users, setUsers] = useState<User[]>(userService.getUsers());

  const [selectedUserForDeletion, setSelectedUserForDeletion] =
    useState<User | null>(null);

  const handleDeleteUser = () => {
    if (selectedUserForDeletion?.cpf) {
      const newUsers = userService.deleteUser(selectedUserForDeletion?.cpf);
      setSelectedUserForDeletion(null);
      setUsers(newUsers);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <div className={styles.header}>
          <caption className={styles.caption}>
            <Link to="/user-register">{"<-"}</Link>
            Usuários Registrados
          </caption>
        </div>
        {users.length > 0 ? (
          <table className={styles.table}>
            <>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th></th>
                <th></th>
              </tr>
              {users.map((user) => (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.cpf}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link to={`/user-edit/${user.cpf}`}>
                      <CiEdit className={styles.editIcon} />
                    </Link>
                  </td>
                  <td>
                    <span
                      onClick={() => setSelectedUserForDeletion(user)}
                      className={styles.deleteButton}
                    >
                      Excluir
                    </span>
                  </td>
                </tr>
              ))}
            </>
          </table>
        ) : (
          <div className={styles.noUsersRegistered}>
            <span>Sem usuários cadastrados</span>
          </div>
        )}
      </div>
      <Modal isVisible={!!selectedUserForDeletion}>
        <p>Deseja excluir este usuário?</p>
        <div className={styles.modalActions}>
          <Button
            className={styles.cancelButton}
            onClick={() => setSelectedUserForDeletion(null)}
          >
            Cancelar
          </Button>
          <Button className={styles.confirmButton} onClick={handleDeleteUser}>
            Sim
          </Button>
        </div>
      </Modal>
    </div>
  );
};
