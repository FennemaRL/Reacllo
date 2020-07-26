import React, { useState } from "react";
import axios from "axios";

const Reg = props => {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [err, setError] = useState({ userName: "", password: "" });
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
    if (!user.userName ) {
      setMessage("Error campo vacio");
      setError({ userName: "Usuario vacio", password: "" })
      setUser({ ...user, password: "" });
      return;
    }
    if (!user.password) {
      setMessage("Error campo vacio");
      setError({ userName: "", password: "Contraseña vacia" })
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
      "Error campo vacio","El usuario o la contraseña es incorrecta"].includes(message);
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
              name="userName"
              type="text"
              value={user.userName}
              placeholder="Ingrese su nombre de usuario"
              onChange={handleChange}
              style={{
                borderBottom: `2px solid ${
                  !err.userName ? "rgba(28,110,164,0.13)" : "#e81123"
                }`
              }}
            />
             {err.userName && <p className="error">{err.userName}</p>}
          </div>
        </div>
        <div className="field">
          <label>Constraseña</label>
          <div  >
            <input
              name="password"
              type="password"
              value={user.password}
              placeholder="Ingrese su contraseña"
              onChange={handleChange}
              style={{
                borderBottom: `2px solid ${
                  !err.password ? "rgba(28,110,164,0.13)" : "#e81123"
                }`
              }}
            />
             {err.password && <p className="error">{err.password}</p>}
          </div>
        </div>
        <button className="send" type="Submit">
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
