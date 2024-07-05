import { useRouter } from "next/router";
import EditTodoPage from "@/components/template/EditTodoPage";

function EditTodo() {
  const { query } = useRouter();
  const id = query.editTodoId;

  return <EditTodoPage id={id} />;
}

export default EditTodo;

