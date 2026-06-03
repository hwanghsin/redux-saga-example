import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchRequest } from "../../../redux/examples/search/actions";

// 示範：takeLatest + delay（搜尋防抖）
// 每次輸入都 dispatch SEARCH_REQUEST，但 takeLatest 會取消前一個未完成的請求
// saga 內部 delay(300) 達到防抖效果
const SearchExample = () => {
  const dispatch = useDispatch();
  const { loading, results, error, query } = useSelector((state) => state.Search);

  const handleChange = (e) => {
    dispatch(searchRequest(e.target.value));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <Link to="/">← 返回首頁</Link>
      <h2>takeLatest + delay（搜尋防抖）</h2>
      <p style={{ color: "#666", fontSize: "14px" }}>
        使用 <code>takeLatest</code> 自動取消上一個請求 + <code>delay(300)</code> 防抖。
        快速連續輸入只會發出最後一次請求。
      </p>
      <input
        placeholder="搜尋商品..."
        onChange={handleChange}
        style={{ width: "100%", padding: "8px", fontSize: "16px", boxSizing: "border-box" }}
      />
      {loading && <p>搜尋中...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && results.length > 0 && (
        <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
          {results.map((p) => (
            <li key={p.id} style={{ marginBottom: "6px" }}>
              <strong>{p.title}</strong> — ${p.price}
            </li>
          ))}
        </ul>
      )}
      {!loading && query && results.length === 0 && !error && (
        <p>找不到「{query}」的結果</p>
      )}
    </div>
  );
};

export default SearchExample;
