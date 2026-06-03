import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { pollStart, pollStop } from "../../../redux/examples/poll/actions";

// 示範：Polling（輪詢）
// 使用 fork + cancel 控制背景無限迴圈，搭配 delay 每 3 秒抓一次資料
const PollingExample = () => {
  const dispatch = useDispatch();
  const { polling, data, lastUpdated } = useSelector((state) => state.Poll);

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <Link to="/">← 返回首頁</Link>
      <h2>Polling（輪詢）</h2>
      <p style={{ color: "#666", fontSize: "14px" }}>
        使用 <code>fork</code> 啟動背景無限迴圈 + <code>cancel</code> 停止任務。
        每 3 秒自動抓取隨機商品，按 Stop 立即停止。
      </p>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          onClick={() => dispatch(pollStart())}
          disabled={polling}
          style={{ padding: "8px 16px", background: "#13BF98", color: "white", border: "none", borderRadius: "4px", cursor: polling ? "not-allowed" : "pointer" }}
        >
          ▶ Start 輪詢
        </button>
        <button
          onClick={() => dispatch(pollStop())}
          disabled={!polling}
          style={{ padding: "8px 16px", background: "#e74c3c", color: "white", border: "none", borderRadius: "4px", cursor: !polling ? "not-allowed" : "pointer" }}
        >
          ■ Stop 輪詢
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <span>狀態：</span>
        <span style={{ color: polling ? "#13BF98" : "#999" }}>
          {polling ? "🟢 輪詢中..." : "⚫ 已停止"}
        </span>
        {lastUpdated && <span style={{ color: "#888", fontSize: "12px" }}>最後更新：{lastUpdated}</span>}
      </div>

      {data && (
        <div style={{ background: "#f5f5f5", padding: "12px", borderRadius: "4px" }}>
          <p><strong>{data.title}</strong></p>
          <p>價格：${data.price} ｜ 庫存：{data.stock}</p>
          <p style={{ color: "#888", fontSize: "12px" }}>分類：{data.category}</p>
        </div>
      )}
    </div>
  );
};

export default PollingExample;
