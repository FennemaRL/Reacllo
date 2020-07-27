export let closeSession=() => {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("userName");
}
export let getUserName=() => localStorage.getItem("userName") || process.env.REACT_APP_DEFAULT_USER

export let getToken=() => localStorage.getItem("UserToken") || process.env.REACT_APP_DEFAULT_TOKEN

export let openSession=(userName, token) => {
    closeSession()
    localStorage.setItem("userName", userName);
    localStorage.setItem("UserToken", token);
}