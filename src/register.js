import React, { useState } from "react";
import axios from "axios";

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
    if (!user.userName)
      setErr({ ...err, userName: "El campo se encuentra vacio" });

    if (!user.password)
      setErr({ ...err, password: "El campo se encuentra vacio" });
  };
  const handleSubmit = e => {
    e.preventDefault();
    _checkUserFieldsEmpty();
    if (!err.userName && !err.password) {
      let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
      axios({
        url: `${uri}/user/register/`,
        data: { ...user, Username: user.userName },
        method: "post"
      })
        .then(res => succesReqHandler(res))
        .catch(err => errorHandler(err));
    }

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
        <p>Registrate</p>
        <div>
          <label>Nombre de Usuario</label>
          <div>
            <input
              name="userName"
              type="text"
              value={user.userName}
              onChange={handleChange}
            />
            {err.userName && <p>{err.userName}</p>}
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
            {err.password && <p>{err.password}</p>}
          </div>
        </div>
        <button type="Submit">Enviar</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};
export default Reg;
