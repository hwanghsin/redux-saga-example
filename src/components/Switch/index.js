import React from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { toggleSwitch } from "../../redux/switch/actions";
import "./switch.css";

// ─── 方式一：Hooks（useSelector + useDispatch）─────────────────────────────
// 現代 React-Redux 推薦寫法，不需要 HOC 包裝
export const SwitchWithHooks = () => {
  const dispatch = useDispatch();
  const isOn = useSelector((state) => state.Switch.isTurnOn);

  const handleSwitch = () => dispatch(toggleSwitch());

  return (
    <div className="switch-container" style={{ margin: "20px 0" }}>
      <input type="checkbox" className={isOn ? "show" : ""} readOnly />
      <div className="slider"></div>
      <div className="button" onClick={handleSwitch}></div>
    </div>
  );
};

// ─── 方式二：connect() HOC（mapStateToProps + mapDispatchToProps）─────────
// 較舊的寫法，常見於 class component 時代，class component 無法使用 hooks
const Switch = ({ switchState, toggleSwitch }) => {
  const { isTurnOn } = switchState;
  const handleSwitch = () => toggleSwitch();

  return (
    <div className="switch-container" style={{ margin: "20px 0" }}>
      <input type="checkbox" className={isTurnOn ? "show" : ""} readOnly />
      <div className="slider"></div>
      <div className="button" onClick={handleSwitch}></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  switchState: state.Switch,
});

const mapDispatchToProps = {
  toggleSwitch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Switch);
