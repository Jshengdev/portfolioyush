import { Label } from '../components'

export default function S24() {
  const companyLogos = [
    { src: '/assets/NvscCanary/slide16-company-natgeo.webp', alt: 'National Geographic' },
    { src: '/assets/NvscCanary/slide16-company-riotgames.jpg', alt: 'Riot Games' },
    { src: '/assets/NvscCanary/slide16-company-verci.jpg', alt: 'Verci' },
    { src: '/assets/NvscCanary/slide16-company-photon.jpg', alt: 'Photon' },
  ]

  const clubLogos = [
    { src: '/assets/NvscCanary/slide16-club-codethechange.jpg', alt: 'Code the Change' },
    { src: '/assets/NvscCanary/slide16-club-formulae.png', alt: 'Formula Electric' },
    { src: '/assets/NvscCanary/slide16-club-lavalab.png', alt: 'LavaLab' },
    { src: '/assets/NvscCanary/slide16-club-sparksc.png', alt: 'Spark SC' },
    { src: '/assets/NvscCanary/slide16-club-terralabs.png', alt: 'Terra Labs' },
  ]

  return (
    <div className="slide slide-light">
      <div className="slide-inner">
        <Label light>THE TEAM</Label>
        <h1 className="hl-xl hl-xl--light">We <span className="kw-indigo">are</span> the customer.</h1>

        <div className="team-grid" style={{ gridTemplateColumns: '1fr 1fr', marginTop: '1.5rem', marginBottom: '1rem' }}>
          <div className="team-card">
            <div className="tc-header">
              <img className="tc-headshot" src="/assets/NvscCanary/slide16-headshot-johnny.png" alt="Johnny Sheng" />
              <div className="nc-body">
                <div className="nc-l1">
                  <span className="nc-agent" style={{ color: '#A5B4FC' }}>JOHNNY SHENG</span>
                  <span className="nc-arrow">{'\u2192'}</span>
                  <span className="nc-action" style={{ color: '#E2E0F0' }}>AI_Engineer</span>
                </div>
              </div>
              <div className="badge badge-indigo">[BUILDER]</div>
            </div>
            <div className="tc-body">
              <div className="tc-facts">
                <div className="tc-fact">Built a 14-agent orchestration framework</div>
                <div className="tc-fact">Custom evals and recursive learning loops for agent behavior</div>
                <div className="tc-fact">Won multiple hackathons; builds autonomous workflow tools for creative coding and freelance</div>
                <div className="tc-fact">Developer in the Photon Residency; helped build Flux (#1 on ProductHunt)</div>
                <div className="tc-iya">USC Iovine and Young Academy</div>
              </div>
            </div>
          </div>

          <div className="team-card">
            <div className="tc-header">
              <img className="tc-headshot" src="/assets/NvscCanary/slide16-headshot-teri.jpg" alt="Teri Shim" />
              <div className="nc-body">
                <div className="nc-l1">
                  <span className="nc-agent" style={{ color: '#A5B4FC' }}>TERI SHIM</span>
                  <span className="nc-arrow">{'\u2192'}</span>
                  <span className="nc-action" style={{ color: '#E2E0F0' }}>Product_Designer</span>
                </div>
              </div>
              <div className="badge badge-indigo">[DESIGNER]</div>
            </div>
            <div className="tc-body">
              <div className="tc-facts">
                <div className="tc-fact">Design at National Geographic Society and Riot Games</div>
                <div className="tc-fact">Three-time startup founding product designer (inc. 0-to-1 B2B)</div>
                <div className="tc-fact">Designs AND codes {'\u2014'} she ships</div>
                <div className="tc-fact">Part of three entrepreneurship orgs at USC</div>
                <div className="tc-iya">USC Iovine and Young Academy</div>
              </div>
            </div>
          </div>
        </div>

        <div className="s16-logos-section">
          <div className="s16-logo-row">
            <span className="s16-logo-label">EXPERIENCE</span>
            <div className="s16-logos">
              {companyLogos.map(l => (
                <img key={l.alt} className="s16-logo" src={l.src} alt={l.alt} />
              ))}
            </div>
          </div>
          <div className="s16-logo-row">
            <span className="s16-logo-label">USC FOUNDER COMMUNITY</span>
            <div className="s16-logos">
              {clubLogos.map(l => (
                <img key={l.alt} className="s16-logo s16-logo--club" src={l.src} alt={l.alt} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
