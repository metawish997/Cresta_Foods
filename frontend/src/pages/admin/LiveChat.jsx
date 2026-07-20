// frontend/src/pages/admin/LiveChat.jsx
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const LiveChat = () => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial fetch of active chat sessions
    api.get('/chat/sessions')
      .then((res) => {
        setSessions(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Initialize socket connection
    const newSocket = io({
      auth: { token: localStorage.getItem('token') }
    });

    newSocket.on('connect', () => {
      newSocket.emit('admin_join');
    });

    newSocket.on('chat_session_updated', (updatedSession) => {
      setSessions((prev) => {
        const idx = prev.findIndex((s) => s.sessionId === updatedSession.sessionId);
        if (idx !== -1) {
          const newSessions = [...prev];
          newSessions[idx] = updatedSession;
          return newSessions;
        }
        return [updatedSession, ...prev];
      });

      setActiveSession((prev) => {
        if (prev?.sessionId === updatedSession.sessionId) return updatedSession;
        return prev;
      });
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !activeSession || !socket) return;

    socket.emit('admin_message', {
      sessionId: activeSession.sessionId,
      text: message,
    });
    setMessage('');
  };

  const endChat = () => {
    if (!activeSession || !socket) return;
    if (!confirm('End this chat session?')) return;
    socket.emit('admin_end_chat', { sessionId: activeSession.sessionId });
    setActiveSession(null);
  };

  const takeOverChat = () => {
    if (!activeSession || !socket) return;
    socket.emit('admin_takeover', { sessionId: activeSession.sessionId });
  };

  if (loading) return <div className="admin-loading-center"><div className="admin-spinner" /></div>;

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 140px)', background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
      {/* Sidebar: Chat List */}
      <div style={{ width: 300, borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', background: '#F9FAFB' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB', fontWeight: 600, color: '#1F2937' }}>
          Active Chats ({sessions.length})
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {sessions.length === 0 ? (
            <div style={{ padding: 20, textAlign: 'center', color: '#6B7280', fontSize: 13 }}>No active chats</div>
          ) : (
            sessions.map((s) => (
              <div
                key={s.sessionId}
                onClick={() => setActiveSession(s)}
                style={{
                  padding: '12px 20px',
                  borderBottom: '1px solid #E5E7EB',
                  cursor: 'pointer',
                  background: activeSession?.sessionId === s.sessionId ? '#fff' : 'transparent',
                  borderLeft: activeSession?.sessionId === s.sessionId ? '3px solid #2E7D32' : '3px solid transparent',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{s.customerName}</span>
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>{new Date(s.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {s.messages[s.messages.length - 1]?.text || 'No messages'}
                </div>
                <div style={{ marginTop: 6 }}>
                  {s.status === 'HANDED_OVER' ? (
                    <span className="admin-badge admin-badge-yellow" style={{ fontSize: 10 }}>Handed Over</span>
                  ) : (
                    <span className="admin-badge admin-badge-gray" style={{ fontSize: 10 }}>Bot Active</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main: Chat View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeSession ? (
          <>
            {/* Chat Header */}
            <div style={{ padding: '12px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>{activeSession.customerName}</h3>
                <span style={{ fontSize: 12, color: '#6B7280' }}>
                  Status: {activeSession.status} {activeSession.handledByAdmin && `(Handled by ${activeSession.handledByAdmin.username})`}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {activeSession.status !== 'HANDED_OVER' && (
                  <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={takeOverChat}>
                    👤 Take Over from Bot
                  </button>
                )}
                <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={endChat}>
                  End Chat
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div style={{ flex: 1, padding: 20, overflowY: 'auto', background: '#FAFAFA' }}>
              {activeSession.messages.map((msg, i) => {
                const isUser = msg.sender === 'USER';
                const isBot = msg.sender === 'BOT';
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: isUser ? 'flex-start' : 'flex-end', marginBottom: 16 }}>
                    <div style={{ maxWidth: '70%' }}>
                      {!isUser && <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4, textAlign: 'right' }}>{isBot ? 'Bot' : 'Admin'}</div>}
                      <div style={{
                        background: isUser ? '#fff' : (isBot ? '#E5E7EB' : '#2E7D32'),
                        color: isUser || isBot ? '#111827' : '#fff',
                        padding: '10px 14px',
                        borderRadius: 12,
                        border: isUser ? '1px solid #E5E7EB' : 'none',
                        fontSize: 14,
                        whiteSpace: 'pre-wrap'
                      }}>
                        {msg.text}
                      </div>
                      <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4, textAlign: isUser ? 'left' : 'right' }}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div style={{ padding: 20, borderTop: '1px solid #E5E7EB', background: '#fff' }}>
              <form onSubmit={sendMessage} style={{ display: 'flex', gap: 10 }}>
                <input
                  type="text"
                  className="admin-input"
                  style={{ flex: 1 }}
                  placeholder={activeSession.status === 'HANDED_OVER' ? 'Type a message...' : 'Take over to reply...'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={activeSession.status !== 'HANDED_OVER'}
                />
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={activeSession.status !== 'HANDED_OVER' || !message.trim()}
                >
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
              <div>Select a chat to view messages</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveChat;
