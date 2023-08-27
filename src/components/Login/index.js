import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  changeUsername,
  login,
} from "../../redux/login/actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usr, pwd } = useSelector((state) => state.Login.form);

  const changeUsr = (e) => dispatch(changeUsername(e.target.value));
  const changePwd = (e) => dispatch(changePassword(e.target.value));

  const submitLoginForm = (e) => {
    e.preventDefault();
    dispatch(login({ usr, pwd }));
  };

  useEffect(() => {
    const storage = localStorage.getItem("login");
    if (storage) return navigate("/", { replace: true });
  }, []);

  return (
    <div className="bg">
      <form id="form" onSubmit={submitLoginForm}>
        <input placeholder="請輸入帳號" value={usr} onChange={changeUsr} />
        <input
          placeholder="請輸入密碼"
          value={pwd}
          onChange={changePwd}
          type="password"
        />
        <input value="送出" type="submit" />
      </form>
    </div>
  );
};

export default Login;
