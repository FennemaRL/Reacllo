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
        localStorage.removeItem("userName");
        localStorage.setItem("userName", user.userName);
        localStorage.removeItem("UserToken");
        localStorage.setItem("UserToken", res.data.token);
        props.history.push("/boards");
      })
      .catch(err => errorHandler(err));

    //condicion y llamada a axios
  };
  const _isErrMessage = () => {
    return ![
      "Usuario o Contraseña vacias",
      "El usuario o la contraseña es incorrecta"
    ].includes(message);
  };
  return (
    <div
      style={{
        borderTop: `3px solid ${_isErrMessage() ? "#00ADBB" : "#e81123"}`
      }}
      className="containerf"
    >
      <form noValidate onSubmit={handleSubmit}>
        <h3>Ingresar</h3>
        <div className="field">
          <label>Nombre de Usuario</label>
          <div>
            <input
              style={{
                borderBottom: "2px solid rgba(28,110,164,0.13)"
              }}
              name="userName"
              type="text"
              value={user.userName}
              placeholder="Ingrese su nombre de usuario"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label>Constraseña</label>
          <div>
            <input
              style={{
                borderBottom: "2px solid rgba(28,110,164,0.13)"
              }}
              name="password"
              type="password"
              value={user.password}
              placeholder="Ingrese su contraseña"
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="Submit" className="send">
          Iniciar Sesión
        </button>
        {message && (
          <p
            className="resMessage"
            style={{
              color: _isErrMessage() ? "#00ADBB" : "#e81123"
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};
export default Reg;
