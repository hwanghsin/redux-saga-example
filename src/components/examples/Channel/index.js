import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { countdownStart } from "../../../redux/examples/channel/actions";

// 示範：eventChannel（事件橋接）
// 將 setInterval 橋接進 Saga，外部事件透過 emit() 送入 channel
// take(channel) 從 channel 接收值，END 訊號觸發 finally 清理
const ChannelExample = () => {
  const dispatch = useDispatch();
  const { running, value, done } = useSelector((state) => state.Channel);

  const handleStart = (from) => dispatch(countdownStart(from));

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <Link to="/">← 返回首頁</Link>
      <h2>eventChannel（事件橋接）</h2>
      <p style={{ color: "#666", fontSize: "14px" }}>
        使用 <code>eventChannel</code> 將 <code>setInterval</code> 橋接進 Saga。
        外部事件用 <code>emit()</code> 送入，<code>END</code> 訊號關閉 channel 並觸發清理。
      </p>
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        <button
          onClick={() => handleStart(10)}
          disabled={running}
          style={{ padding: "8px 16px", background: "#13BF98", color: "white", border: "none", borderRadius: "4px", cursor: running ? "not-allowed" : "pointer" }}
        >
          從 10 開始倒數
        </button>
        <button
          onClick={() => handleStart(30)}
          disabled={running}
          style={{ padding: "8px 16px", background: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: running ? "not-allowed" : "pointer" }}
        >
          從 30 開始倒數
        </button>
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: "96px",
          fontWeight: "bold",
          color: running ? (value <= 3 ? "#e74c3c" : "#13BF98") : "#999",
          transition: "color 0.3s"
        }}>
          {running ? value : (done ? "🎉" : "--")}
        </div>
        <p style={{ color: "#888" }}>
          {running ? "倒數中..." : done ? "倒數結束！" : "等待開始"}
        </p>
      </div>
    </div>
  );
};

export default ChannelExample;
