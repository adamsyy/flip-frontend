import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock, ShieldCheck, User, ExternalLink, LogOut } from 'lucide-react';
import styles from './AdminPage.module.css';

interface UserProfile {
  id: string;
  firebase_uid: string;
  name: string;
  profile_image: string;
  verification_selfie_url: string;
  verification_status: string;
  is_verified: boolean;
  identity: string;
  location: string;
}

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1323/api/v1';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${API_BASE}/api/v1/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (resp.ok) {
        setIsAuthenticated(true);
        fetchPendingUsers();
      } else {
        alert('Invalid password');
      }
    } catch (err: any) {
      alert('Error during login: ' + err.message);
    }
  };

  const fetchPendingUsers = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE}/admin/verifications/pending`, {
        headers: {
          'X-Admin-Password': password
        }
      });
      if (!resp.ok) throw new Error('Failed to fetch from backend');
      const data = await resp.json();
      setUsers(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (uid: string, approve: boolean) => {
    try {
      const resp = await fetch(`${API_BASE}/admin/verifications/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': password
        },
        body: JSON.stringify({ firebase_uid: uid, approve })
      });

      if (!resp.ok) throw new Error('Failed to update status on backend');

      // Remove from list
      setUsers(users.filter(u => u.firebase_uid !== uid));
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <ShieldCheck size={48} className={styles.loginIcon} />
            <h2>Flip Verification</h2>
            <p>Enter password to access dashboard</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.loginInput}
              autoFocus
            />
            <button type="submit" className={styles.loginButton}>Access Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.adminHeader}>
        <div className={styles.headerLeft}>
          <ShieldCheck size={24} />
          <h1>Verification Queue</h1>
          <span className={styles.badge}>{users.length} Pending</span>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className={styles.logoutBtn}>
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <main className={styles.content}>
        {loading ? (
          <div className={styles.loading}>
            <Clock className={styles.spin} />
            <p>Loading pending verifications...</p>
          </div>
        ) : error ? (
          <div className={styles.errorCard}>
            <p>Error: {error}</p>
            <button onClick={fetchPendingUsers}>Retry</button>
          </div>
        ) : users.length === 0 ? (
          <div className={styles.emptyState}>
            <CheckCircle size={64} className={styles.successIcon} />
            <h2>All Caught Up!</h2>
            <p>There are no pending verification requests at the moment.</p>
            <button onClick={fetchPendingUsers} className={styles.refreshBtn}>Refresh</button>
          </div>
        ) : (
          <div className={styles.userGrid}>
            {users.map((user) => (
              <div key={user.firebase_uid} className={styles.userCard}>
                <div className={styles.userCardHeader}>
                  <div className={styles.userInfo}>
                    <h3>{user.name}</h3>
                    <p>{user.identity} • {user.location}</p>
                  </div>
                  <a
                    href={`https://otakfsymqqbqlbahjldp.supabase.co/storage/v1/object/public/images/profile_image_${user.firebase_uid}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.idLink}
                  >
                    <ExternalLink size={14} />
                    View Original
                  </a>
                </div>

                <div className={styles.comparisonContainer}>
                  <div className={styles.imageBlock}>
                    <span className={styles.label}>PROFILE PHOTO</span>
                    <div className={styles.imageWrapper}>
                      <img src={user.profile_image} alt="Profile" />
                    </div>
                  </div>
                  <div className={styles.imageBlock}>
                    <span className={styles.label}>VERIFICATION SELFIE</span>
                    <div className={styles.imageWrapper}>
                      <img src={user.verification_selfie_url} alt="Selfie" />
                    </div>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <button
                    onClick={() => handleVerify(user.firebase_uid, false)}
                    className={styles.rejectBtn}
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                  <button
                    onClick={() => handleVerify(user.firebase_uid, true)}
                    className={styles.approveBtn}
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
