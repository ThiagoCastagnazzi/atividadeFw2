import { useState } from "react";
import { toast } from "react-toastify";
import { updateEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import {
  Button,
  CancelButton,
  Form,
  Input,
  Label,
  ModalWrapper,
} from "./styles";

interface UserModalProps {
  closeModal: () => void;
}

const UserModal = ({ closeModal }: UserModalProps) => {
  const [newEmail, setNewEmail] = useState("");

  const handleUpdateEmail = async (e: any) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        await updateEmail(user, newEmail);
        console.log("Email atualizado com sucesso");
        toast.success("Email atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar email:", error);
      toast.error("Erro ao atualizar email!");
    }
  };

  return (
    <ModalWrapper>
      <Form>
        <h2>Editar Dados do Usuário</h2>
        <Label htmlFor="newEmail">Novo Email:</Label>
        <Input
          type="email"
          id="newEmail"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <Button onClick={handleUpdateEmail}>Atualizar Email</Button>
        <CancelButton onClick={closeModal}>Cancelar</CancelButton>
      </Form>
    </ModalWrapper>
  );
};

export default UserModal;
