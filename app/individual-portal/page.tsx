"use client";

import { useState } from "react";

type Mode = "register" | "login";


export default function TutorPortalPage() {
  const [mode, setMode] = useState<Mode>("register");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    orgType: "individual", // 'individual' or 'center'
    studentCount: "",
    tutorCount: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string, val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleSubmit = async () => {
    if (!form.email || (mode === "register" && !form.name)) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/tutor-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mode }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const switchMode = () => {
    setMode((m) => (m === "register" ? "login" : "register"));
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .portal-root {
          min-height: 100vh;
          background: #09090b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Geist', sans-serif;
          padding: 2rem;
        }
        .card { width: 100%; max-width: 400px; }
        .logo { display: flex; align-items: center; gap: 10px; margin-bottom: 2.75rem; }
        .logo-mark {
          width: 30px; height: 30px; background: #dc2626;
          border-radius: 7px; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0;
        }
        .logo-mark svg { width: 14px; height: 14px; fill: white; }
        .logo-name { font-size: 15px; font-weight: 600; color: #fafafa; letter-spacing: -0.01em; }
        .logo-badge {
          font-family: 'Geist Mono', monospace; font-size: 9px; color: #52525b;
          background: #18181b; border: 0.5px solid #27272a;
          padding: 2px 7px; border-radius: 4px; letter-spacing: 0.06em; text-transform: uppercase;
        }
        .heading { font-size: 26px; font-weight: 600; color: #fafafa; letter-spacing: -0.04em; line-height: 1.15; margin-bottom: 6px; }
        .subheading { font-size: 13px; color: #52525b; line-height: 1.55; margin-bottom: 2rem; }
        .tabs {
          display: flex; background: #18181b; border-radius: 9px;
          padding: 3px; margin-bottom: 1.5rem; gap: 2px;
        }
        .tab {
          flex: 1; padding: 8px; background: transparent; border: none;
          border-radius: 7px; font-family: 'Geist', sans-serif;
          font-size: 12px; font-weight: 500; color: #52525b; cursor: pointer;
          transition: background 0.15s, color 0.15s; text-align: center;
        }
        .tab.active { background: #27272a; color: #fafafa; }
        .field { margin-bottom: 12px; }
        .label {
          display: block; font-family: 'Geist Mono', monospace; font-size: 10px;
          font-weight: 500; letter-spacing: 0.07em; text-transform: uppercase;
          color: #3f3f46; margin-bottom: 6px;
        }
        .input {
          width: 100%; background: #18181b; border: 0.5px solid #27272a;
          border-radius: 8px; padding: 10px 13px; font-family: 'Geist', sans-serif;
          font-size: 13px; color: #fafafa; outline: none;
          transition: border-color 0.15s; -webkit-appearance: none;
        }
        .input::placeholder { color: #3f3f46; }
        .input:focus { border-color: #dc2626; }
        .submit-btn {
          width: 100%; margin-top: 6px; padding: 11px; background: #dc2626;
          border: none; border-radius: 8px; font-family: 'Geist', sans-serif;
          font-size: 13px; font-weight: 600; color: #fff; cursor: pointer;
          letter-spacing: -0.01em; transition: background 0.15s, opacity 0.15s, transform 0.1s;
        }
        .submit-btn:hover:not(:disabled) { background: #b91c1c; }
        .submit-btn:active:not(:disabled) { transform: scale(0.99); }
        .submit-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .divider { display: flex; align-items: center; gap: 12px; margin: 1.25rem 0; }
        .divider-line { flex: 1; height: 0.5px; background: #18181b; }
        .divider-text { font-family: 'Geist Mono', monospace; font-size: 10px; color: #27272a; letter-spacing: 0.04em; }
        .footer-link { text-align: center; font-size: 12px; color: #3f3f46; }
        .footer-link button {
          background: none; border: none; font-family: 'Geist', sans-serif;
          font-size: 12px; color: #71717a; cursor: pointer; padding: 0;
          text-decoration: underline; text-underline-offset: 2px;
        }
        .footer-link button:hover { color: #a1a1aa; }
        .error-msg { margin-top: 10px; font-size: 12px; color: #f87171; font-family: 'Geist Mono', monospace; }
        .success-wrap { text-align: center; padding: 1.5rem 0; }
        .success-icon {
          width: 44px; height: 44px; background: #14532d1a; border: 0.5px solid #166534;
          border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;
        }
        .success-icon svg { width: 18px; height: 18px; stroke: #4ade80; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .success-heading { font-size: 18px; font-weight: 600; color: #fafafa; letter-spacing: -0.03em; margin-bottom: 8px; }
        .success-sub { font-size: 13px; color: #52525b; line-height: 1.6; max-width: 300px; margin: 0 auto; }
      `}</style>

      <div className="portal-root">
        <div className="card">
          <div className="logo">
            <div className="logo-mark">
              <svg viewBox="0 0 14 14">
                <path d="M2 2h4v4H2zm6 0h4v4H8zM2 8h4v4H2zm6 0h4v4H8z" />
              </svg>
            </div>
            <span className="logo-name">Thetix</span>
            <span className="logo-badge">Tutor Portal</span>
          </div>

          {status === "success" ? (
            <div className="success-wrap">
              <div className="success-icon">
                <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div className="success-heading">
                {mode === "register" ? "You're on the list." : "Request received."}
              </div>
              <p className="success-sub">
                {mode === "register"
                  ? "We'll reach out with your access details shortly. Check your inbox."
                  : "We'll follow up with your login details soon."}
              </p>
            </div>
          ) : (
            <>
              <h1 className="heading">
                {mode === "register" ? "Create your account." : "Welcome back."}
              </h1>
              <p className="subheading">
                {mode === "register"
                  ? "Join the early access program for independent tutors."
                  : "Sign in to your Thetix tutor account."}
              </p>

              <div className="tabs">
                <button
                  className={`tab ${mode === "register" ? "active" : ""}`}
                  onClick={() => { setMode("register"); setStatus("idle"); setErrorMsg(""); }}
                >
                  Register
                </button>
                <button
                  className={`tab ${mode === "login" ? "active" : ""}`}
                  onClick={() => { setMode("login"); setStatus("idle"); setErrorMsg(""); }}
                >
                  Sign in
                </button>
              </div>


              {mode === "register" && (
                <>
                  <div className="field">
                    <label className="label">Full name</label>
                    <input
                      className="input" type="text" placeholder="Jane Smith"
                      value={form.name} onChange={(e) => set("name", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Are you a solo tutor or a center?</label>
                    <select
                      className="input"
                      value={form.orgType}
                      onChange={e => set("orgType", e.target.value)}
                    >
                      <option value="individual">Solo Tutor</option>
                      <option value="center">Tutoring Center</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Number of students</label>
                    <input
                      className="input" type="number" min="1" placeholder="e.g. 20"
                      value={form.studentCount}
                      onChange={e => set("studentCount", e.target.value)}
                    />
                  </div>
                  {form.orgType === "center" && (
                    <div className="field">
                      <label className="label">Number of tutors</label>
                      <input
                        className="input" type="number" min="1" placeholder="e.g. 5"
                        value={form.tutorCount}
                        onChange={e => set("tutorCount", e.target.value)}
                      />
                    </div>
                  )}
                </>
              )}

              <div className="field">
                <label className="label">Email address</label>
                <input
                  className="input" type="email" placeholder="you@example.com"
                  value={form.email} onChange={(e) => set("email", e.target.value)}
                />
              </div>

              {mode === "register" && (
                <div className="field">
                  <label className="label">Primary subject</label>
                  <input
                    className="input" type="text" placeholder="e.g. SAT Math, AP Chemistry"
                    value={form.subject} onChange={(e) => set("subject", e.target.value)}
                  />
                </div>
              )}

              {mode === "login" && (
                <div className="field">
                  <label className="label">Password</label>
                  <input className="input" type="password" placeholder="••••••••" />
                </div>
              )}

              <button
                className="submit-btn"
                disabled={status === "loading" || !form.email || (mode === "register" && !form.name)}
                onClick={handleSubmit}
              >
                {status === "loading"
                  ? "Processing..."
                  : mode === "register" ? "Request access" : "Sign in"}
              </button>

              {errorMsg && <p className="error-msg">{errorMsg}</p>}

              <div className="divider">
                <div className="divider-line" />
                <span className="divider-text">or</span>
                <div className="divider-line" />
              </div>

              <div className="footer-link">
                {mode === "register" ? (
                  <>Already have an account? <button onClick={switchMode}>Sign in →</button></>
                ) : (
                  <>Need access? <button onClick={switchMode}>Register →</button></>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}