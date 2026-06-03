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
  const error = useSelector((state) => state.Login.error);
  const isLoggedIn = useSelector((state) => state.Login.isLoggedIn);
  const loading = useSelector((state) => state.Login.loading);

  const changeUsr = (e) => dispatch(changeUsername(e.target.value));
  const changePwd = (e) => dispatch(changePassword(e.target.value));

  const submitLoginForm = (e) => {
    e.preventDefault();
    if (!usr.trim() || !pwd.trim()) return;
    dispatch(login({ usr, pwd }));
  };

  // 已有 session → 直接跳首頁
  useEffect(() => {
    const storage = localStorage.getItem("login");
    if (storage) return navigate("/", { replace: true });
  }, [navigate]);

  // saga 登入成功後 isLoggedIn 變 true → 導航到首頁
  useEffect(() => {
    if (isLoggedIn) navigate("/", { replace: true });
  }, [isLoggedIn, navigate]);

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
        <input value={loading ? "登入中..." : "送出"} type="submit" disabled={loading} />
      </form>
      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
    </div>
  );
};

export default Login;
