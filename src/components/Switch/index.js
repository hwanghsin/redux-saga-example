import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSwitch } from "../../redux/switch/actions";
import "./switch.css";

export default () => {
  const dispatch = useDispatch();
  const isOn = useSelector((state) => state.Switch.isTurnOn);

  const handleSwitch = () => {
    dispatch(toggleSwitch());
  };

  return (
    <div className="switch-container" style={{ margin: "20px 0" }}>
      <input type="checkbox" checked={isOn} onChange={handleSwitch} />
      <div className="slider"></div>
      <div className="button" onClick={handleSwitch}></div>
    </div>
  );
};
