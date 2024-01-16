import { useState } from "react";
import { UserForm, UserFormData } from "../../components/UserForm";
import { userService } from "../../services/userService";
import styles from "./styles.module.scss";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export const UserRegister = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data: UserFormData) => {
    const existingUser = userService.getUser(data.cpf);

    if (existingUser) {
      return setIsModalVisible(true);
    }

    userService.registerUser(data);
    navigate("/user-list");
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <UserForm title="Lean Cadastro" onSubmit={onSubmit} />
      <Modal isVisible={isModalVisible}>
        <p className={styles.modalText}>
          Já existe um usuário cadastrado com esse CPF, tente novamente com um
          diferente
        </p>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.button}
            onClick={() => setIsModalVisible(false)}
          >
            OK
          </Button>
        </div>
      </Modal>
    </div>
  );
};
