import React, { useRef, useEffect, useState } from "react";

const TaskWiewer = props => {
  let ntRef = useRef(null);
  const handleClickOutside = e => {
    if (ntRef.current && !ntRef.current.contains(e.target)) {
      setErrMessage("");
      props.close();
    }
  };
  const [errMessage, setErrMessage] = useState("");

  return (
    props.taskWiewerInfo.display &&
    ((!props.taskWiewerInfo.task && (
      <CreateTaskW
        {...props}
        errMessage={errMessage}
        ntRef={ntRef}
        setErrMessage={setErrMessage}
        handleClickOutside={handleClickOutside}
      />
    )) || (
      <EditTaskW
        {...props}
        errMessage={errMessage}
        ntRef={ntRef}
        setErrMessage={setErrMessage}
        handleClickOutside={handleClickOutside}
        task={props.taskWiewerInfo.task}
      />
    ))
  );
};
const EditTaskW = ({
  close,
  errMessage,
  setErrMessage,
  editTask,
  task,
  ntRef,
  handleClickOutside
}) => {
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  });
  const handleEditForm = e => {
    e.preventDefault();
    let form = e.target;
    let title = form.title.value;
    let description = form.description.value;
    if (!title || !description) {
      setErrMessage("necesita titulo y descripcion");
      return;
    } else {
      if (title === task.titleTask && description === task.description) {
        close();
      } else {
        editTask(
          task,
          { titleTask: title, description: description },
          setErrMessage,
          close
        );
      }
    }
  };
  return (
    <EmptyFormTaskW
      titleForm="Editar Tarea"
      buttonText="Editar"
      close={close}
      ntRef={ntRef}
      handleForm={handleEditForm}
      errMessage={errMessage}
      title={task.titleTask}
      description={task.description}
    />
  );
};
const CreateTaskW = ({
  close,
  errMessage,
  setErrMessage,
  addTask,
  ntRef,
  handleClickOutside
}) => {
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  });
  const handleCreateForm = e => {
    e.preventDefault();
    let form = e.target;
    let title = form.title.value;
    let description = form.description.value;
    if (!title || !description) {
      setErrMessage("necesita titulo y descripcion");
      return;
    }
    addTask(
      { titleTask: title, description: description },
      setErrMessage,
      close
    );
  };
  return (
    <EmptyFormTaskW
      titleForm="Nueva Tarea"
      buttonText="Crear"
      close={close}
      ntRef={ntRef}
      handleForm={handleCreateForm}
      errMessage={errMessage}
    />
  );
};
const EmptyFormTaskW = ({
  titleForm,
  buttonText,
  close,
  ntRef,
  title,
  description,
  handleForm,
  errMessage
}) => {
  return (
    <div className="blackbackground">
      <div
        ref={ntRef}
        className="containerf newTask"
        style={{
          borderTop: `3px solid ${!errMessage ? "#00ADBB" : "#e81123"}`
        }}
      >
        <form onSubmit={handleForm}>
          <button
            className="close"
            onClick={e => {
              e.preventDefault();
              close();
            }}
          >
            x
          </button>
          <h3> {titleForm} </h3>
          <div className="field">
            <label>Titulo</label>

            <div>
              <input
                type="text"
                name="title"
                placeholder="Ingrese un titulo"
                maxLength="35"
                defaultValue={title || ""}
              />
            </div>
          </div>
          <div className="field">
            <label>Descripcion</label>
            <textarea
              rows="5"
              name="description"
              placeholder="Ingrese una descripción"
              maxLength="155"
              defaultValue={description || ""}
            />
          </div>
          <button className="send" type="submit">
            {buttonText}
          </button>

          {errMessage && (
            <p
              className="resMessage"
              style={{
                color: "#e81123"
              }}
            >
              {errMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
export default TaskWiewer;
