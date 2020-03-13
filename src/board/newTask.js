import React, { useRef, useEffect } from "react";

const NewTask = props => {
  return props.task.display && <CreateTaskW {...props} />;
};

const CreateTaskW = props => {
  let ntRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = e => {
    if (ntRef.current && !ntRef.current.contains(e.target)) {
      props.close();
    }
  };
  const handleCreateForm = e => {
    e.preventDefault();
    let form = e.target;
    let title = form.title.value;
    let description = form.description.value;
    if (!title || !description) {
      console.log("necesita titulo y descripcion");
      return;
    }
    props.addTask({ titleTask: title, description: description });
    props.close();
  };
  return (
    /*falta reacer la parte del error en nueva tarea 8) */
    <div className="blackbackground">
      <div ref={ntRef} className="containerf newTask">
        <form onSubmit={handleCreateForm}>
          <button
            className="close"
            onClick={e => {
              e.preventDefault();
              props.close();
            }}
          >
            x
          </button>
          <h3> Nueva Tarea </h3>
          <div className="field">
            <label>Titulo</label>

            <div>
              <input type="text" name="title" placeholder="Ingrese un titulo" />
            </div>
          </div>
          <div className="field">
            <label>Descripcion</label>
            <textarea
              rows="5"
              name="description"
              placeholder="Ingrese una descripción"
            />
          </div>
          <button className="send" type="submit">
            Crear Nueva Tarea
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
