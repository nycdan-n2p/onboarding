import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, TrendingDown, Clock, Phone, Calendar } from 'lucide-react'
import './HomePageConcept3.css'

const HomePageConcept3 = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <Phone size={24} />,
      title: 'Automated Reminder Calls',
      description: 'Calls patients 48 hours before appointment, confirms or reschedules automatically'
    },
    {
      icon: <Clock size={24} />,
      title: 'Multi-Channel Reminders',
      description: 'Text reminders 24 hours before, final call 2 hours before appointment'
    },
    {
      icon: <Calendar size={24} />,
      title: 'Calendar Integration',
      description: 'Updates your calendar automatically, manages waitlists when needed'
    }
  ]

  const benefits = [
    'Reduce no-shows by up to 40%',
    'Save hours of staff time daily',
    'Increase revenue by filling empty slots',
    'Improve patient satisfaction with better communication'
  ]

  const stats = [
    { label: 'No-Shows Reduced', value: '40%', change: '-15%' },
    { label: 'Appointments Confirmed', value: '92%', change: '+18%' },
    { label: 'Time Saved Weekly', value: '12 hrs', change: '+8 hrs' }
  ]

  return (
    <div className="homepage-concept3">
      <nav className="nav-concept3">
        <div className="nav-logo-concept3">
          <div className="logo-icon-concept3">N2P</div>
          <span>Medical Appointment Reminder</span>
        </div>
        <div className="nav-links-concept3">
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </div>
        <button className="nav-cta-concept3" onClick={() => navigate('/concept3/signup')}>
          Start Free Trial
        </button>
      </nav>

      <section className="hero-concept3">
        <div className="hero-content-concept3">
          <h1 className="hero-title-concept3">
            Reduce No-Shows for Your Practice
          </h1>
          <p className="hero-subtitle-concept3">
            Automated appointment reminders that call, text, and confirm patients automatically. 
            Reduce no-shows by up to 40% and save hours of staff time every week.
          </p>
          <div className="hero-cta-concept3">
            <button className="cta-primary-concept3" onClick={() => navigate('/concept3/signup')}>
              Start Free Trial
              <ArrowRight size={20} />
            </button>
            <p className="cta-note-concept3">No credit card required • 14-day free trial</p>
          </div>
          <div className="trust-badge-concept3">
            <span>Trusted by 200+ medical practices</span>
          </div>
        </div>
        <div className="hero-visual-concept3">
          <div className="dashboard-preview-concept3">
            <div className="dashboard-header-concept3">
              <span>Appointment Reminders</span>
              <div className="status-badge-concept3">Active</div>
            </div>
            <div className="dashboard-stats-concept3">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card-concept3">
                  <div className="stat-label-concept3">{stat.label}</div>
                  <div className="stat-value-concept3">{stat.value}</div>
                  <div className="stat-change-concept3 positive">{stat.change}</div>
                </div>
              ))}
            </div>
            <div className="dashboard-list-concept3">
              <div className="list-item-concept3">
                <div className="item-icon-concept3">📞</div>
                <div className="item-content-concept3">
                  <div className="item-title-concept3">Sarah Johnson - Friday 10:00 AM</div>
                  <div className="item-status-concept3">✅ Confirmed via call</div>
                </div>
              </div>
              <div className="list-item-concept3">
                <div className="item-icon-concept3">📱</div>
                <div className="item-content-concept3">
                  <div className="item-title-concept3">Michael Brown - Friday 2:00 PM</div>
                  <div className="item-status-concept3">✅ Confirmed via text</div>
                </div>
              </div>
              <div className="list-item-concept3">
                <div className="item-icon-concept3">📅</div>
                <div className="item-content-concept3">
                  <div className="item-title-concept3">Emily Davis - Friday 4:00 PM</div>
                  <div className="item-status-concept3">⏰ Reminder scheduled</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section-concept3" id="features">
        <div className="container-concept3">
          <div className="section-header-concept3">
            <h2>Run Your Reminder System 24/7</h2>
            <p>Automated patient reminders that work around the clock</p>
          </div>
          <div className="features-grid-concept3">
            {features.map((feature, index) => (
              <div key={index} className="feature-card-concept3">
                <div className="feature-icon-concept3">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="benefits-section-concept3">
        <div className="container-concept3">
          <div className="section-header-concept3">
            <h2>Why Medical Practices Love It</h2>
          </div>
          <div className="benefits-list-concept3">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item-concept3">
                <Check size={20} />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-it-works-concept3" id="how-it-works">
        <div className="container-concept3">
          <div className="section-header-concept3">
            <h2>Get Started in 3 Simple Steps</h2>
          </div>
          <div className="steps-concept3">
            <div className="step-concept3">
              <div className="step-number-concept3">1</div>
              <h3>Sign Up Free</h3>
              <p>Create your account in seconds. No credit card required.</p>
            </div>
            <div className="step-concept3">
              <div className="step-number-concept3">2</div>
              <h3>Connect Your Calendar</h3>
              <p>Sync with Google Calendar, Outlook, or your practice management system.</p>
            </div>
            <div className="step-concept3">
              <div className="step-number-concept3">3</div>
              <h3>Launch Reminders</h3>
              <p>Your AI agent starts calling and texting patients automatically.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section-concept3">
        <div className="container-concept3">
          <h2>Start Reducing No-Shows Today</h2>
          <p>Join 200+ medical practices using automated appointment reminders</p>
          <button className="cta-primary-concept3 large" onClick={() => navigate('/concept3/signup')}>
            Start Free Trial
            <ArrowRight size={20} />
          </button>
          <p className="cta-note-concept3">14-day free trial • No credit card required</p>
        </div>
      </section>

      <footer className="footer-concept3">
        <div className="container-concept3">
          <div className="footer-content-concept3">
            <div className="footer-logo-concept3">
              <div className="logo-icon-concept3">N2P</div>
              <span>Medical Appointment Reminder</span>
            </div>
            <div className="footer-links-concept3">
              <a href="#how-it-works">How It Works</a>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
          <div className="footer-copyright-concept3">
            © 2025 Net2Phone Agent. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePageConcept3
