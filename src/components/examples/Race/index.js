import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { raceFetchRequest } from "../../../redux/examples/race/actions";

// 示範：race()（競賽）
// API 請求與 3 秒 timeout 同時啟動，誰先完成就用誰，另一個自動取消
const RaceExample = () => {
  const dispatch = useDispatch();
  const { loading, data, timedOut } = useSelector((state) => state.Race);

  const handleFetch = () => dispatch(raceFetchRequest());

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <Link to="/">← 返回首頁</Link>
      <h2>race()（競賽）</h2>
      <p style={{ color: "#666", fontSize: "14px" }}>
        使用 <code>race()</code> 同時啟動 API 請求與 3 秒 timeout，誰先完成誰勝出。
        可模擬 API 超時保護場景。
      </p>
      <button onClick={handleFetch} disabled={loading} style={{ padding: "8px 16px" }}>
        {loading ? "請求中（最多等 3 秒）..." : "發送請求"}
      </button>

      {timedOut && (
        <div style={{ marginTop: "16px", color: "red" }}>
          ⏰ 請求超時！API 超過 3 秒未回應
        </div>
      )}

      {data && !timedOut && (
        <div style={{ marginTop: "16px", background: "#f5f5f5", padding: "12px", borderRadius: "4px" }}>
          <p>✅ 請求成功！</p>
          <p><strong>{data.title}</strong></p>
          <p>價格：${data.price} ｜ 評分：{data.rating}</p>
          <p style={{ color: "#888", fontSize: "12px" }}>分類：{data.category}</p>
        </div>
      )}
    </div>
  );
};

export default RaceExample;
