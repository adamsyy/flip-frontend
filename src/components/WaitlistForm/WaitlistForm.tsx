import { useState } from 'react';
import styles from './WaitlistForm.module.css';

const PREDEFINED_SKILLS = [
  'Photography', 'Fitness', 'Motorcycle', 'Dancing', 'Mixology', 'Skateboarding',
  'Fashion Styling', 'Gym Training', 'Filmmaking', 'Coffee Culture', 'Makeup',
  'Music Production', 'Surfing', 'Aerial Yoga', 'DJing', 'Street Art', 'Pilates', 'Vinyl Collecting'
];

export const WaitlistForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: [] as string[],
    primarySkill: '',
  });

  const [submitted, setSubmitted] = useState(false);

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
        return {
          ...prev,
          skills: [...skills, skill]
        };
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Waitlist Submission:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
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
            <label>Skills I Can Teach (Select 3, mark 1 as primary)</label>
            <p className={styles.skillsHint}>Selected: {formData.skills.length}/3</p>
            <div className={styles.skillsGrid}>
              {PREDEFINED_SKILLS.map(skill => (
                <div key={skill} className={styles.skillWrapper}>
                  <button
                    type="button"
                    className={`${styles.skillTag} ${
                      formData.skills.includes(skill) ? styles.selected : ''
                    } ${
                      formData.primarySkill === skill ? styles.primary : ''
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

          <button type="submit" className={styles.submitButton}>
            Join Waitlist
          </button>
        </form>
      </div>
    </section>
  );
};
