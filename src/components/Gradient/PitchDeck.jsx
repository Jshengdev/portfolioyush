import { Link } from 'react-router-dom';

export default function PitchDeck() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#F6F4F0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(46, 46, 46, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link
            to="/gradient"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#2E2E2E',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              fontWeight: 500,
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(159, 184, 160, 0.2)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(159, 184, 160, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(159, 184, 160, 0.2)';
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Experience
          </Link>
          <h1
            style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#2E2E2E',
              fontFamily: 'var(--font-display)',
              margin: 0,
            }}
          >
            Gradient Pitch Deck
          </h1>
        </div>
        <a
          href="/assets/Gradient/pitchdeck.pdf"
          download="Gradient_Pitch_Deck.pdf"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#2E2E2E',
            textDecoration: 'none',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            fontWeight: 500,
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(46, 46, 46, 0.1)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(46, 46, 46, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(46, 46, 46, 0.1)';
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download PDF
        </a>
      </header>

      {/* PDF Viewer */}
      <div style={{ flex: 1, padding: '1rem' }}>
        <iframe
          src="/assets/Gradient/pitchdeck.pdf"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
          title="Gradient Pitch Deck"
        />
      </div>
    </div>
  );
}
