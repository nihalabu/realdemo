"use client"

import { useState, useEffect, useRef, useCallback } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "" });

  // Open handler — stable reference
  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Listen for external open-maya custom event
  useEffect(() => {
    window.addEventListener("open-maya", openChat);
    return () => window.removeEventListener("open-maya", openChat);
  }, [openChat]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Inject premium CSS animations and classes into <head>
  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "premium-chat-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = `
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(141, 41, 38, 0.7); }
          70%  { box-shadow: 0 0 0 18px rgba(141, 41, 38, 0); }
          100% { box-shadow: 0 0 0 0 rgba(141, 41, 38, 0); }
        }
        @keyframes fadeInBubble {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .premium-fab-pulse {
          animation: pulseRing 2.2s cubic-bezier(0.25, 0, 0, 1) infinite !important;
        }
        @keyframes dotFlashing {
          0% { opacity: 0.25; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.25; transform: scale(0.8); }
        }
        .dot-flashing-span {
          width: 6px;
          height: 6px;
          background-color: #888989;
          border-radius: 50%;
          display: inline-block;
          animation: dotFlashing 1.2s infinite ease-in-out;
        }
        .dot-flashing-span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot-flashing-span:nth-child(3) {
          animation-delay: 0.4s;
        }
        .chat-panel {
          margin-bottom: 29px;
          width: 400px;
          height: 600px;
          background-color: #ffffff;
          border-radius: 10px;
          border: 1px solid #cecaca;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }
        @media (max-width: 480px) {
          .chat-panel {
            position: fixed !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            border-radius: 0 !important;
            border: none !important;
            z-index: 10000;
          }
          .chat-fab-wrapper {
            bottom: 20px !important;
            right: 20px !important;
          }
          .chat-bubble-preview {
            right: 0 !important;
            width: 180px !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  async function sendMessage(overrideInput) {
    const textToSend = typeof overrideInput === "string" ? overrideInput : input;
    if (!textToSend.trim()) return;

    const userMessage = { role: "user", content: textToSend };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    if (typeof overrideInput !== "string") {
      setInput("");
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();
      const assistantMessage = { role: "assistant", content: data.message };
      setMessages([...updatedMessages, assistantMessage]);
      if (data.message.includes("could I grab your details")) {
        setShowLeadForm(true);
      }
    } catch {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Sorry, I couldn't connect right now. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") sendMessage();
  }
  async function handleLeadSubmit() {
    const { name, email, phone } = leadData;
    if (!name || !email || !phone) return;

    setLeadSubmitted(true);
    setShowLeadForm(false);

    try {
        fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
    } catch (err) {
      console.error("Failed to save lead:", err);
    }

    // Continue conversation
    sendMessage(`My name is ${name}, email is ${email}, and phone is ${phone}`);
  }

  return (
    <div className="chat-fab-wrapper" style={{ position: "fixed", bottom: "35px", right: "35px", zIndex: 9999 }}>
      {!isOpen && (
        <div className="chat-bubble-preview" style={{
          position: 'absolute',
          bottom: '72px',
          right: '0',
          background: '#fff',
          borderRadius: '18px 18px 4px 18px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
          border: '1px solid #e8e5e0',
          padding: '12px 16px',
          width: '200px',
          animation: 'fadeInBubble 0.4s ease forwards',
        }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: '#8d2926', color: '#fff',
              fontSize: '11px', fontWeight: '600',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>M</div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>Maya</span>

          </div>
          {/* Message */}
          <p style={{ fontSize: '15px', color: '#888989', margin: 0, lineHeight: '1.5' }}>
            👋 Hi! Looking for your dream home?
          </p>
        </div>
      )}
      {isOpen && (
        <div
          className="chat-panel"
        >
          {/* Premium Header */}
          <div
            style={{
              backgroundColor: "#8d2926",
              padding: "29px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div
                style={{
                  width: "43px",
                  height: "43px",
                  borderRadius: "50px",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                }}
              >
                <span
                  style={{
                    color: "#ffffff",
                    fontFamily: "'niveau-grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  M
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    color: "#ffffff",
                    fontFamily: "'niveau-grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "1.2",
                  }}
                >
                  Maya AI
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50px",
                      backgroundColor: "#4caf50",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.75)",
                      fontFamily: "'Roboto', sans-serif",
                      fontWeight: 400,
                      fontSize: "11px",
                    }}
                  >
                    Online · Ready to Help
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "2px",
                width: "29px",
                height: "29px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#ffffff",
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.borderColor = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "29px",
              display: "flex",
              flexDirection: "column",
              gap: "29px",
              backgroundColor: "#f3f3f3",
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "35px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "29px",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cecaca",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#8d2926" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'freight-big-pro', serif",
                      fontWeight: 900,
                      fontSize: "29px",
                      color: "#000000",
                      margin: 0,
                    }}
                  >
                    Welcome to Apex Realty
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 300,
                      fontSize: "14px",
                      color: "#404042",
                      marginTop: "1px",
                      maxWidth: "280px",
                      lineHeight: "1.5",
                    }}
                  >
                    I can assist you with matching property listings, scheduling visits, or estimating home values.
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                  width: "100%",
                }}
              >
                {/* Meta details */}
                <span
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "11px",
                    color: "#888989",
                    marginBottom: "1px",
                    padding: "0 1px",
                  }}
                >
                  {msg.role === "user" ? "You" : "Maya"}
                </span>

                <div style={{ display: "flex", gap: "29px", maxWidth: "85%" }}>
                  {msg.role === "assistant" && (
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50px",
                        backgroundColor: "#8d2926",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <span style={{ color: "#ffffff", fontSize: "12px", fontFamily: "'niveau-grotesk', sans-serif", fontWeight: 600 }}>M</span>
                    </div>
                  )}
                  <div
                    style={{
                      padding: "29px",
                      borderRadius: msg.role === "user" ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
                      backgroundColor: msg.role === "user" ? "#8d2926" : "#ffffff",
                      color: msg.role === "user" ? "#ffffff" : "#000000",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 300,
                      fontSize: "14px",
                      border: msg.role === "user" ? "none" : "1px solid #cecaca",
                      lineHeight: "1.5",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "11px",
                    color: "#888989",
                    marginBottom: "1px",
                  }}
                >
                  Maya
                </span>
                <div style={{ display: "flex", gap: "29px", maxWidth: "85%" }}>
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50px",
                      backgroundColor: "#8d2926",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <span style={{ color: "#ffffff", fontSize: "12px", fontFamily: "'niveau-grotesk', sans-serif", fontWeight: 600 }}>M</span>
                  </div>
                  <div
                    style={{
                      padding: "29px",
                      borderRadius: "10px 10px 10px 2px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cecaca",
                      fontFamily: "'Roboto', sans-serif",
                      fontWeight: 400,
                      fontSize: "13px",
                      color: "#888989",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>Typing</span>
                    <span className="dot-typing" style={{ display: "inline-flex", gap: "3px", alignItems: "center" }}>
                      <span className="dot-flashing-span" />
                      <span className="dot-flashing-span" />
                      <span className="dot-flashing-span" />
                    </span>
                  </div>
                </div>
              </div>
            )}
            {showLeadForm && !leadSubmitted && (
              <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #cecaca",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "4px"
              }}>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#1a1a1a",
                  margin: 0
                }}>
                  Please fill in your details:
                </p>

                {["name", "email", "phone"].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    placeholder={field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Phone Number"}
                    value={leadData[field]}
                    onChange={(e) => setLeadData(prev => ({ ...prev, [field]: e.target.value }))}
                    style={{
                      height: "42px",
                      border: "1px solid #cecaca",
                      borderRadius: "5px",
                      padding: "0 14px",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 300,
                      fontSize: "13px",
                      outline: "none",
                      color: "#000000",
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = "#8d2926"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "#cecaca"}
                  />
                ))}

                <button
                  onClick={handleLeadSubmit}
                  style={{
                    backgroundColor: "#8d2926",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "5px",
                    height: "42px",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: "29px",
              borderTop: "1px solid #cecaca",
              display: "flex",
              gap: "29px",
              backgroundColor: "#ffffff",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Maya about properties..."
              style={{
                flex: 1,
                height: "50px",
                border: "1px solid #cecaca",
                borderRadius: "5px",
                padding: "0 29px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontSize: "14px",
                outline: "none",
                backgroundColor: "#ffffff",
                color: "#000000",
                transition: "border-color 200ms",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#8d2926")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#cecaca")}
            />
            <button
              onClick={() => sendMessage()}
              style={{
                backgroundColor: "#8d2926",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 200ms",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c02b0a")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#8d2926")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Maya chat"
        className="premium-fab-pulse"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50px",
          backgroundColor: "#8d2926",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 200ms",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c02b0a")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#8d2926")}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}