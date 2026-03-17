import { useState } from 'react';
import styles from './WaitlistForm.module.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1323';

const PREDEFINED_SKILLS = [
  'Photography', 'Fitness', 'Motorcycle', 'Dancing', 'Mixology', 'Skateboarding',
  'Fashion Styling', 'Running', 'Filmmaking', 'Coffee Culture', 'Makeup',
  'Music Production', 'Surfing', 'Aerial Yoga', 'DJing', 'Street Art', 'Pilates', 'Vinyl Collecting',
  'Product Design', 'Biking', 'Kintsugi', 'Wine Tasting', 'Pottery'
];

export const WaitlistForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: [] as string[],
    primarySkill: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      const skills = prev.skills;
      if (skills.includes(skill)) {
        const newSkills = skills.filter(s => s !== skill);
        return {
          ...prev,
          skills: newSkills,
          primarySkill: prev.primarySkill === skill ? '' : prev.primarySkill
        };
      } else if (skills.length < 3) {
        return { ...prev, skills: [...skills, skill] };
      }
      return prev;
    });
  };

  const setPrimary = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      primarySkill: prev.primarySkill === skill ? '' : skill
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          skills: formData.skills,
          primary_skill: formData.primarySkill,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', skills: [], primarySkill: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to join waitlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className={styles.waitlist}>
      <div className={styles.container}>
        <h2>Join the Waitlist</h2>
        <p>Be among the first to experience skill swapping in Bangalore</p>

        {submitted && (
          <div className={styles.successMessage}>
            ✓ Thanks for joining! We'll be in touch soon.
          </div>
        )}

        {error && (
          <div className={styles.errorMessage}>
            ✕ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className={styles.skillsSection}>
            <label>Skills I Can Teach</label>
            <p className={styles.skillsHint}>Selected: {formData.skills.length}/3</p>
            <div className={styles.skillsGrid}>
              {PREDEFINED_SKILLS.map(skill => (
                <div key={skill} className={styles.skillWrapper}>
                  <button
                    type="button"
                    className={`${styles.skillTag} ${formData.skills.includes(skill) ? styles.selected : ''
                      } ${formData.primarySkill === skill ? styles.primary : ''
                      }`}
                    onClick={() => handleSkillToggle(skill)}
                    disabled={!formData.skills.includes(skill) && formData.skills.length >= 3}
                  >
                    {skill}
                  </button>
                  {formData.skills.includes(skill) && (
                    <button
                      type="button"
                      className={`${styles.primaryBtn} ${formData.primarySkill === skill ? styles.primaryBtnActive : ''}`}
                      onClick={() => setPrimary(skill)}
                      title="Mark as primary"
                    >

                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Joining…' : 'Join Waitlist'}
          </button>
        </form>
      </div>
    </section>
  );
};
