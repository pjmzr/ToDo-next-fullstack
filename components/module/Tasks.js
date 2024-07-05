import { useRouter } from "next/router";
import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow, BiMessageSquareEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

function Tasks({ data, next, back, fetchTodos }) {
  const router = useRouter();

  const deleteHandler = () => {};

  const editHandler = (id) => {
    router.push(`/${id}`);
  };

  const changeHandler = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") fetchTodos();
  };

  return (
    <div className="tasks">
      {data?.map((i) => (
        <div key={i._id} className="tasks__card">
          <div className="tasks__card--edit">
            <span className={i.status}></span>
            <button className="edit" onClick={() => editHandler(i._id)}>
              <BiMessageSquareEdit />
            </button>
            <button className="delete" onClick={() => deleteHandler(i._id)}>
              <MdOutlineDelete />
            </button>
          </div>
          <RiMastodonLine />
          <h4>{i.title}</h4>
          <div>
            {back ? (
              <button
                className="button-back"
                onClick={() => changeHandler(i._id, back)}
              >
                <BiLeftArrow />
                Back
              </button>
            ) : null}
            {next ? (
              <button
                className="button-next"
                onClick={() => changeHandler(i._id, next)}
              >
                Next
                <BiRightArrow />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
