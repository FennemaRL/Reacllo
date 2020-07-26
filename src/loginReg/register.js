import React, { useState } from "react";
import axios from "axios";
import "./formLr.css";
const Reg = props => {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [err, setErr] = useState({ userName: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
    setErr({ ...err, ..._validateFields(name, value) });

    setMessage("");
  };
  const _validateFields = (name, value) => {
    let err = {};
    if (name === "userName") {
      err.userName =
        value.length >= 4
          ? ""
          : "El nombre de usuario debe ser mayor a 4 caracteres";
    }
    if (name === "password") {
      err.password = /^(?=.*[A-Z]).{4,}$/.test(value)
        ? ""
        : "La contraseña debe tener almenos una mayuscula y entre 4 caracteres ";
    }
    return err;
  };
  const errorHandler = err => {
    if ("Username already exists" === err.response.data.message) {
      setMessage("Ese nombre de usuario ya se encuentra en uso");
      setUser({ userName: "", password: "" });
    }
  };
  const succesReqHandler = res => {
    setMessage("se registro exitosamente, ingresando...");

    let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
    axios({
      url: `${uri}/user/login/`,
      data: { ...user, Username: user.userName },
      method: "post"
    })
      .then(res => {
        localStorage.setItem("userName", user.userName);
        localStorage.setItem("UserToken", res.data.token);
        props.history.push("/boards");
      })
      .catch(err => {});
  };
  const _checkUserFieldsEmpty = () => {
    if (!user.userName) {
      setErr({ ...err, userName: "El nomber se encuentra vacio" });
    }
    if (!user.password) {
      setErr({ ...err, password: "La contraseña se encuentra vacia" });
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    _checkUserFieldsEmpty();
    if (err.userName || err.password) {
      setMessage("No se puede registrar este usuario");
      return;
    }
    let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
    axios({
      url: `${uri}/user/register/`,
      data: { ...user, Username: user.userName },
      method: "post"
    })
      .then(res => succesReqHandler(res))
      .catch(err => errorHandler(err));
  };

  //condicion y llamada a axios
  const _isErrMessage = () => {
    return ![
      "No se puede registrar este usuario",
      "Ese nombre de usuario ya se encuentra en uso"
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
        <h3>Registrate</h3>
        <div className="field">
          <label>Nombre de Usuario</label>
          <div>
            <input
              style={{
                borderBottom: `2px solid ${
                  !err.userName ? "rgba(28,110,164,0.13)" : "#e81123"
                }`
              }}
              name="userName"
              type="text"
              placeholder="Ingrese su nombre de usuario"
              value={user.userName}
              onChange={handleChange}
            />
            {err.userName && <p className="error">{err.userName}</p>}
          </div>
        </div>
        <div className="field">
          <label>Constraseña</label>
          <div>
            <input
              style={{
                borderBottom: `2px solid ${
                  !err.password ? "rgba(28,110,164,0.13)" : "#e81123"
                }`
              }}
              name="password"
              type="password"
              placeholder="Ingrese su contraseña"
              value={user.password}
              onChange={handleChange}
            />
            {err.password && <p className="error">{err.password}</p>}
          </div>
        </div>
        <button className="send" type="Submit">
          Enviar
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
