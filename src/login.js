import React, { useState } from "react";
import axios from "axios";

const Reg = props => {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };
  const errorHandler = err => {
    setUser({ ...user, password: "" });
    setMessage("El usuario o la contraseña es incorrecta");
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!user.userName || !user.password) {
      setMessage("Usuario o Contraseña vacias");
      setUser({ ...user, password: "" });
      return;
    }
    setMessage("Ingresando...");

    let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
    axios({
      url: `${uri}/user/login/`,
      data: { ...user, Username: user.userName },
      method: "post"
    })
      .then(res => {
        console.log(localStorage.getItem("UserToken") + "pre");
        localStorage.setItem("userName", user.userName);
        localStorage.removeItem("UserToken");
        console.log(localStorage.getItem("UserToken") + "middle");
        localStorage.setItem("UserToken", res.data.token);

        console.log(localStorage.getItem("UserToken") + "post");
        props.history.push("/boards");
      })
      .catch(err => errorHandler(err));

    //condicion y llamada a axios
  };
  return (
    <div
      style={{
        backgroundColor: "#F4D58D",
        height: "40vh",
        minWidth: "20%"
      }}
    >
      <form noValidate onSubmit={handleSubmit}>
        <p>Ingresar</p>
        <div>
          <label>Nombre de Usuario</label>
          <div>
            <input
              name="userName"
              type="text"
              value={user.userName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label>Constraseña</label>
          <div>
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="Submit">Iniciar sesión</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};
export default Reg;
