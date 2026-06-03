import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { counterStart, counterStop } from "../../../redux/examples/forkCancel/actions";

// 示範：fork / cancel（背景任務取消）
// fork 非阻塞啟動計數器，cancel 傳入 task handle 強制停止
// cancelled() 在 finally 區塊中偵測是否被取消，做清理
const ForkCancelExample = () => {
  const dispatch = useDispatch();
  const { running, count } = useSelector((state) => state.ForkCancel);

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <Link to="/">← 返回首頁</Link>
      <h2>fork / cancel（背景任務取消）</h2>
      <p style={{ color: "#666", fontSize: "14px" }}>
        使用 <code>fork</code> 啟動非阻塞背景任務，<code>cancel</code> 傳入 task handle 停止。
        <code>cancelled()</code> 可在 finally 偵測取消，適合做清理工作。
      </p>
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        <button
          onClick={() => dispatch(counterStart())}
          disabled={running}
          style={{ padding: "8px 16px", background: "#13BF98", color: "white", border: "none", borderRadius: "4px", cursor: running ? "not-allowed" : "pointer" }}
        >
          ▶ Start
        </button>
        <button
          onClick={() => dispatch(counterStop())}
          disabled={!running}
          style={{ padding: "8px 16px", background: "#e74c3c", color: "white", border: "none", borderRadius: "4px", cursor: !running ? "not-allowed" : "pointer" }}
        >
          ■ Stop
        </button>
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: "72px",
          fontWeight: "bold",
          color: running ? "#13BF98" : "#999",
          transition: "color 0.3s"
        }}>
          {count}
        </div>
        <p style={{ color: "#888" }}>
          {running ? "背景計數中（每秒 +1）" : "已停止"}
        </p>
      </div>
    </div>
  );
};

export default ForkCancelExample;
