import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Switch from "../Switch";

const examples = [
  {
    path: "/examples/search",
    label: "takeLatest + delay",
    tag: "搜尋防抖",
    desc: "快速連續輸入只發最後一次請求，前一個自動取消",
    icon: "🔍",
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    path: "/examples/race",
    label: "race()",
    tag: "競賽",
    desc: "API 請求與 3 秒 timeout 競賽，誰先完成就用誰",
    icon: "⚡",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    path: "/examples/polling",
    label: "Polling",
    tag: "輪詢",
    desc: "每 3 秒自動抓取新資料，可隨時 Start / Stop",
    icon: "🔄",
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    path: "/examples/fork-cancel",
    label: "fork / cancel",
    tag: "背景任務",
    desc: "非阻塞啟動背景計數器，可明確取消並做清理",
    icon: "⚙️",
    color: "#ef4444",
    bg: "#fef2f2",
  },
  {
    path: "/examples/channel",
    label: "eventChannel",
    tag: "事件橋接",
    desc: "將 setInterval 橋接進 Saga，倒數計時示範",
    icon: "📡",
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fa",
    fontFamily: "inherit",
  },
  header: {
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
    padding: "0 32px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    width: "28px",
    height: "28px",
    background: "#13BF98",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
  },
  appName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111",
    margin: 0,
  },
  badge: {
    fontSize: "11px",
    background: "#ecfdf5",
    color: "#10b981",
    border: "1px solid #a7f3d0",
    borderRadius: "99px",
    padding: "2px 8px",
    fontWeight: "500",
  },
  logoutBtn: {
    padding: "6px 16px",
    background: "transparent",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "13px",
    color: "#374151",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  main: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "32px 24px",
  },
  sectionTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "12px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    padding: "20px 24px",
    marginBottom: "24px",
  },
  switchRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchInfo: { flex: 1 },
  switchTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#111",
    margin: "0 0 4px 0",
  },
  switchDesc: {
    fontSize: "13px",
    color: "#6b7280",
    margin: 0,
  },
  codeTag: {
    display: "inline-block",
    background: "#f3f4f6",
    borderRadius: "4px",
    padding: "1px 6px",
    fontFamily: "monospace",
    fontSize: "12px",
    color: "#374151",
    margin: "0 2px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "14px",
  },
  exCard: {
    display: "block",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "18px",
    textDecoration: "none",
    transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
    cursor: "pointer",
  },
  exIcon: {
    fontSize: "24px",
    marginBottom: "10px",
    display: "block",
  },
  exTag: {
    fontSize: "11px",
    fontWeight: "600",
    borderRadius: "99px",
    padding: "2px 8px",
    display: "inline-block",
    marginBottom: "6px",
  },
  exLabel: {
    display: "block",
    fontFamily: "monospace",
    fontSize: "14px",
    fontWeight: "700",
    color: "#111",
    marginBottom: "6px",
  },
  exDesc: {
    fontSize: "12px",
    color: "#6b7280",
    lineHeight: "1.5",
    margin: 0,
  },
  arrow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
    color: "#9ca3af",
    fontSize: "12px",
  },
};

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const storage = localStorage.getItem("login");
    if (!storage) return navigate("/login", { replace: true });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div style={styles.page}>
      {/* ── Header ── */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logo}>S</div>
          <span style={styles.appName}>Redux Saga 學習筆記</span>
          <span style={styles.badge}>範例專案</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          style={styles.logoutBtn}
          onMouseEnter={(e) => (e.target.style.background = "#f9fafb")}
          onMouseLeave={(e) => (e.target.style.background = "transparent")}
        >
          登出
        </button>
      </header>

      {/* ── Main ── */}
      <main style={styles.main}>

        {/* Switch card */}
        <p style={styles.sectionTitle}>元件示範</p>
        <div style={styles.card}>
          <div style={styles.switchRow}>
            <div style={styles.switchInfo}>
              <p style={styles.switchTitle}>Toggle Switch</p>
              <p style={styles.switchDesc}>
                示範兩種 Redux 連接方式：
                <span style={styles.codeTag}>connect()</span> HOC 與
                <span style={styles.codeTag}>useSelector</span> Hooks
              </p>
            </div>
            <Switch />
          </div>
        </div>

        {/* Examples grid */}
        <p style={styles.sectionTitle}>Redux Saga 效果範例</p>
        <div style={styles.grid}>
          {examples.map((ex) => (
            <Link
              key={ex.path}
              to={ex.path}
              style={styles.exCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                e.currentTarget.style.borderColor = ex.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <span style={styles.exIcon}>{ex.icon}</span>
              <span
                style={{
                  ...styles.exTag,
                  color: ex.color,
                  background: ex.bg,
                }}
              >
                {ex.tag}
              </span>
              <span style={styles.exLabel}>{ex.label}</span>
              <p style={styles.exDesc}>{ex.desc}</p>
              <div style={styles.arrow}>前往 →</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
