import { useState } from 'react';
import styles from './OnboardPage.module.css';
import { SEO } from '../../components/SEO/SEO';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1323';

export const OnboardPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    description: '',
    primary_skill: '',
    insta_link: '',
  });

  // Custom skills input
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  // Custom highlights input
  const [highlightInput, setHighlightInput] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim()) && skills.length < 5) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const addHighlight = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && highlightInput.trim()) {
      e.preventDefault();
      if (!highlights.includes(highlightInput.trim()) && highlights.length < 3) {
        setHighlights([...highlights, highlightInput.trim()]);
      }
      setHighlightInput('');
    }
  };

  const removeHighlight = (highlightToRemove: string) => {
    setHighlights(highlights.filter(h => h !== highlightToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!image) {
      setError('Profile photo is required');
      setLoading(false);
      return;
    }

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('age', formData.age);
    payload.append('description', formData.description);
    payload.append('primary_skill', formData.primary_skill);
    payload.append('insta_link', formData.insta_link);
    payload.append('skills', JSON.stringify(skills));
    payload.append('highlights', JSON.stringify(highlights));
    payload.append('image', image);

    try {
      const res = await fetch(`${API_URL}/apply`, {
        method: 'POST',
        body: payload, // note: FormData does not need Content-Type header
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Failed to submit application');
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.successCard}>
          <h1>🎉 Application Received</h1>
          <p>Thanks for applying to join the Flip creator community! Our team will review your profile and get back to you soon.</p>
          <button onClick={() => window.location.href = '/creators'} className={styles.btn}>Back to Creators</button>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <SEO 
        title="Founder's Circle | BY INVITATION ONLY"
        description="A curated ecosystem for Bengaluru's most influential creative voices. Trade your craft directly with peers who share your impact."
        image="https://flipyu.in/images/social-hidden/og-onboard.png"
      />
      <div className={styles.header}>
        <div className={styles.badgeLine}>
          <span className={styles.exclusiveBadge}>BY INVITATION ONLY</span>
        </div>
        <h1>Founder&apos;s Circle</h1>
        <p className={styles.exclusiveSubtext}>
          A curated ecosystem for Bengaluru&apos;s most influential creative voices. 
          Trade your craft directly with peers who share your impact.
        </p>
      </div>

      <div className={styles.whyJoin}>
        <div className={styles.whyCard}>
          <span className={styles.whyIcon}>Verified</span>
          <h3>Elite Status</h3>
          <p>Gain the ultimate badge of craft and credibility in the city.</p>
        </div>
        <div className={styles.whyCard}>
          <span className={styles.whyIcon}>Leagues</span>
          <h3>Direct Peer Swap</h3>
          <p>Trade within your league. Our upcoming level tiering ensures you always swap with peers at your specific mastery.</p>
        </div>
        <div className={styles.whyCard}>
          <span className={styles.whyIcon}>Legacy</span>
          <h3>Lifetime Free</h3>
          <p>Always free for our founding elite badge holders. No strings.</p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} onKeyDown={(e) => {
        // Prevent accidental form submission on Enter key in text fields
        if (e.key === 'Enter' && e.target instanceof HTMLInputElement && e.target.type !== 'submit') {
          e.preventDefault();
        }
      }}>
        <div className={styles.formGroup}>
          <label>Creator Name *</label>
          <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Preety Mukundan" />
        </div>

        <div className={styles.formGroup}>
          <label>Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="27" />
        </div>

        <div className={styles.formGroup}>
          <label>Tell us your story *</label>
          <textarea required name="description" value={formData.description} onChange={handleInputChange} placeholder="I'm a guitarist who moonlights in music production. Teach me pottery?" rows={3} />
        </div>

        <div className={styles.formGroup}>
          <label>Your Master Craft *</label>
          <input required type="text" name="primary_skill" value={formData.primary_skill} onChange={handleInputChange} placeholder="e.g. Photography or Java" />
        </div>

        <div className={styles.formGroup}>
          <label>All Skills (Up to 5)</label>
          <div className={styles.skillsInput}>
            {skills.map(s => (
              <span key={s} className={styles.skillTag}>
                {s} <button type="button" onClick={() => removeSkill(s)}>×</button>
              </span>
            ))}
            <input
              type="text"
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={addSkill}
              placeholder={skills.length < 5 ? "Type a skill and press Enter" : "Max 5 skills added"}
              disabled={skills.length >= 5}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Key Achievements / Highlights (Up to 3)</label>
          <div className={styles.skillsInput}>
            {highlights.map(h => (
              <span key={h} className={styles.skillTag}>
                {h} <button type="button" onClick={() => removeHighlight(h)}>×</button>
              </span>
            ))}
            <input
              type="text"
              value={highlightInput}
              onChange={e => setHighlightInput(e.target.value)}
              onKeyDown={addHighlight}
              placeholder={highlights.length < 3 ? "e.g. 1M+ YouTube subscribers" : "Max 3 highlights added"}
              disabled={highlights.length >= 3}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Where can we see your work? (Insta/Portfolio) *</label>
          <input required type="url" name="insta_link" value={formData.insta_link} onChange={handleInputChange} placeholder="https://instagram.com/yourhandle" />
        </div>

        <div className={styles.formGroup}>
          <label>Profile Photo * <i>(JPEG, PNG, WebP only)</i></label>
          <input required type="file" accept="image/jpeg, image/png, image/webp" onChange={handleFileChange} />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Submitting...' : 'Apply as Creator'}
        </button>
      </form>
    </main>
  );
};
