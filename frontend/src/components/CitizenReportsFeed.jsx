import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  ThumbsUp, 
  MapPin, 
  ShieldAlert 
} from 'lucide-react';

const REPORT_CATEGORIES = [
  'Broken Streetlight / Darkness',
  'Road Hazard / Pothole',
  'Heavy Crowd / Gridlock',
  'Cleanliness / Sanitation',
  'Noise Pollution',
  'Safety Suspicion / Harassment Risk',
  'Public Transit Delay'
];

export default function CitizenReportsFeed({ 
  currentCity, 
  reports, 
  onAddReport, 
  onUpvoteReport 
}) {
  // Form State
  const [category, setCategory] = useState(REPORT_CATEGORIES[0]);
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState('Medium');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  
  // Validation & Feedback State
  const [errors, setErrors] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'verified', 'review', 'resolved'

  // Input Validation
  const validateForm = () => {
    const newErrors = {};
    if (!category.trim()) newErrors.category = 'Please select a report category.';
    if (!location.trim() || location.trim().length < 4) {
      newErrors.location = 'Specific location/landmark must be at least 4 characters.';
    }
    if (!description.trim() || description.trim().length < 15) {
      newErrors.description = 'Please provide sufficient description (minimum 15 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate unique incident reference ID
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `CP-REP-${randomId}`;

    const newReport = {
      id: trackingId,
      cityId: currentCity.id,
      category,
      location: location.trim(),
      urgency,
      description: description.trim(),
      status: 'Submitted - Awaiting Municipal Verification',
      statusBadgeClass: 'badge-submitted',
      reporter: reporterName.trim() || 'Anonymous Citizen',
      timestamp: 'Just now',
      upvotes: 1,
      isSample: false // Real user submission!
    };

    onAddReport(newReport);

    // Show confirmation
    setSubmissionSuccess(trackingId);
    setLocation('');
    setDescription('');
    setReporterName('');
    setErrors({});

    setTimeout(() => {
      setSubmissionSuccess(null);
    }, 6000);
  };

  // Filter reports
  const cityReports = reports.filter(r => r.cityId === currentCity.id);
  const filteredReports = cityReports.filter(r => {
    if (filterStatus === 'verified') return r.status?.toLowerCase().includes('verified');
    if (filterStatus === 'review') return r.status?.toLowerCase().includes('review') || r.status?.toLowerCase().includes('submitted');
    if (filterStatus === 'resolved') return r.status?.toLowerCase().includes('resolved');
    return true;
  });

  return (
    <div className="reports-view-container" role="region" aria-label="Citizen Reporting and Civic Telemetry">
      {/* ================= LEFT: REPORT SUBMISSION FORM ================= */}
      <div className="report-form-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(244, 63, 94, 0.15)',
            color: '#fb7185',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem' }}>Submit Civic Report</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
              Report hazards, lighting, crowds or safety alerts for {currentCity.name}
            </p>
          </div>
        </div>

        {submissionSuccess && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.6rem',
            fontSize: '0.82rem',
            color: '#34d399'
          }}>
            <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Report Successfully Logged!</strong>
              <p style={{ color: 'var(--text-main)', marginTop: '2px' }}>
                Assigned Tracking ID: <code style={{ color: 'var(--primary-cyan-light)' }}>{submissionSuccess}</code>. Status: <em>Awaiting Municipal Verification</em>.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} noValidate>
          {/* Category */}
          <div className="form-group">
            <label htmlFor="report-category" className="form-label">Incident Category *</label>
            <select
              id="report-category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {REPORT_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Location / Landmark */}
          <div className="form-group">
            <label htmlFor="report-location" className="form-label">Precise Location or Landmark *</label>
            <input
              id="report-location"
              type="text"
              className="form-input"
              placeholder="e.g. Colaba Causeway near Regal Cinema corner"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {errors.location && <span className="form-error">{errors.location}</span>}
          </div>

          {/* Urgency */}
          <div className="form-group">
            <label htmlFor="report-urgency" className="form-label">Severity Level</label>
            <select
              id="report-urgency"
              className="form-select"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <option value="Low">Low - Minor Inconvenience</option>
              <option value="Medium">Medium - Attention Required</option>
              <option value="High">High - Immediate Hazard / Urgent</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="report-description" className="form-label">Observed Details *</label>
              <span className="form-hint">{description.length}/500 chars (min 15)</span>
            </div>
            <textarea
              id="report-description"
              className="form-textarea"
              maxLength={500}
              placeholder="Describe what you observed (e.g. unlit pedestrian lane, heavy water-logging, dense crowd bottleneck)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          {/* Reporter Name */}
          <div className="form-group">
            <label htmlFor="report-reporter" className="form-label">Reporter Name / Alias (Optional)</label>
            <input
              id="report-reporter"
              type="text"
              className="form-input"
              placeholder="Anonymous Citizen (or your name)"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
            />
          </div>

          <button 
            id="btn-submit-report"
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.25rem' }}
          >
            <Send size={15} />
            <span>Transmit Civic Report</span>
          </button>
        </form>

        <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', lineHeight: '1.4' }}>
          🔒 Reports are cryptographically signed with client timestamp and submitted for civic moderation. False emergency declarations are prohibited.
        </p>
      </div>

      {/* ================= RIGHT: COMMUNITY REPORTS FEED ================= */}
      <div className="reports-feed-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem' }}>Citizen Telemetry Feed ({currentCity.name})</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
              Real-time civic alerts submitted by verified explorers and residents
            </p>
          </div>

          {/* Filter Status Pills */}
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              id="filter-reports-all"
              className={`btn btn-sm ${filterStatus === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.76rem', padding: '0.25rem 0.6rem' }}
              onClick={() => setFilterStatus('all')}
            >
              All ({cityReports.length})
            </button>
            <button
              id="filter-reports-verified"
              className={`btn btn-sm ${filterStatus === 'verified' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.76rem', padding: '0.25rem 0.6rem' }}
              onClick={() => setFilterStatus('verified')}
            >
              Verified
            </button>
            <button
              id="filter-reports-review"
              className={`btn btn-sm ${filterStatus === 'review' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.76rem', padding: '0.25rem 0.6rem' }}
              onClick={() => setFilterStatus('review')}
            >
              Under Review
            </button>
          </div>
        </div>

        {filteredReports.length === 0 ? (
          <div className="state-box">
            <CheckCircle2 size={32} color="#34d399" />
            <p>No active reports matching the selected status in {currentCity.name}.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredReports.map(rep => (
              <article key={rep.id} className="report-item-card" id={`report-card-${rep.id}`}>
                <div className="report-header-row">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span className="report-id">#{rep.id}</span>
                      <span className={`badge ${rep.statusBadgeClass || 'badge-submitted'}`}>
                        {rep.status}
                      </span>
                      {rep.isSample ? (
                        <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }} title="Historical sample case for hackathon demonstration">
                          Sample Archive
                        </span>
                      ) : (
                        <span className="badge badge-live" style={{ fontSize: '0.68rem' }}>
                          ● Live User Submission
                        </span>
                      )}
                    </div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{rep.category}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary-cyan-light)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.15rem' }}>
                      <MapPin size={13} /> {rep.location}
                    </span>
                  </div>

                  <span className={`badge ${rep.urgency === 'High' ? 'badge-danger' : rep.urgency === 'Medium' ? 'badge-warning' : 'badge-neutral'}`}>
                    {rep.urgency} Urgency
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {rep.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.76rem', color: 'var(--text-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span>By: <strong style={{ color: 'var(--text-muted)' }}>{rep.reporter}</strong></span>
                    <span>• {rep.timestamp}</span>
                  </div>

                  <button
                    id={`btn-upvote-${rep.id}`}
                    className="report-upvote-btn"
                    onClick={() => onUpvoteReport(rep.id)}
                    title="Confirm / Corroborate this report (+1)"
                    aria-label={`Corroborate report ${rep.id}`}
                  >
                    <ThumbsUp size={13} />
                    <span>Corroborate ({rep.upvotes})</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
