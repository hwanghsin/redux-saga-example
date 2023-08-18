import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  changeUsername,
  login,
} from "../../redux/login/actions";

const Login = () => {
  const dispatch = useDispatch();
  const { usr, pwd } = useSelector((state) => state.Login.form);

  const changeUsr = (e) => dispatch(changeUsername(e.target.value));
  const changePwd = (e) => dispatch(changePassword(e.target.value));

  const submitLoginForm = (e) => {
    e.preventDefault();
    dispatch(login({ usr, pwd }));
  };

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
