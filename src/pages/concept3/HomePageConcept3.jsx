import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, TrendingUp, TrendingDown, Clock, Phone, Calendar, Sparkles, AlertCircle, DollarSign, Users, Zap, Shield, Star, ChevronRight } from 'lucide-react'
import './HomePageConcept3.css'

const HomePageConcept3 = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState('14:00:00')
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const stepsRef = useRef(null)
  const problemRef = useRef(null)
  const solutionRef = useRef(null)
  const statsRef = useRef(null)

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
    { label: 'No-Shows Reduced', value: '40%', change: '-15%', trend: 'down', icon: '📉' },
    { label: 'Appointments Confirmed', value: '92%', change: '+18%', trend: 'up', icon: '✅' },
    { label: 'Time Saved Weekly', value: '12 hrs', change: '+8 hrs', trend: 'up', icon: '⏱️' },
    { label: 'Revenue Increase', value: '+15%', change: '+$8.2K', trend: 'up', icon: '💰' }
  ]

  const appointments = [
    { patient: 'Sarah Johnson', time: 'Friday 10:00 AM', status: 'confirmed', method: 'call', icon: '📞', delay: '0s' },
    { patient: 'Michael Brown', time: 'Friday 2:00 PM', status: 'confirmed', method: 'text', icon: '📱', delay: '0.1s' },
    { patient: 'Emily Davis', time: 'Friday 4:00 PM', status: 'scheduled', method: 'pending', icon: '📅', delay: '0.2s' },
    { patient: 'David Wilson', time: 'Saturday 9:00 AM', status: 'confirmed', method: 'call', icon: '📞', delay: '0.3s' },
  ]

  const problems = [
    { icon: <AlertCircle size={24} />, text: 'Patients forget appointments' },
    { icon: <DollarSign size={24} />, text: 'Lost revenue from no-shows' },
    { icon: <Users size={24} />, text: 'Staff waste hours on manual calls' },
    { icon: <Clock size={24} />, text: 'Last-minute cancellations go unfilled' }
  ]

  const roiMetrics = [
    { label: 'Average Practice', value: '$12,400', description: 'Additional revenue per month' },
    { label: 'Time Saved', value: '48 hours', description: 'Staff time saved monthly' },
    { label: 'No-Shows Prevented', value: '127', description: 'Appointments saved per month' }
  ]

  useEffect(() => {
    // Countdown timer for urgency
    const interval = setInterval(() => {
      const now = new Date()
      const hours = 23 - now.getHours()
      const minutes = 59 - now.getMinutes()
      const seconds = 59 - now.getSeconds()
      setTimeRemaining(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setIsVisible(true)
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          // Animate child elements with stagger
          const cards = entry.target.querySelectorAll('.feature-card-concept3, .step-concept3, .problem-card-concept3, .roi-card-concept3, .testimonial-card-concept3')
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-in')
            }, index * 100)
          })
        }
      })
    }, observerOptions)

    const elements = [featuresRef.current, stepsRef.current, problemRef.current, solutionRef.current, statsRef.current].filter(Boolean)
    elements.forEach(el => {
      if (el) {
        observer.observe(el)
        const cards = el.querySelectorAll('.feature-card-concept3, .step-concept3, .problem-card-concept3, .roi-card-concept3, .testimonial-card-concept3')
        cards.forEach(card => observer.observe(card))
      }
    })

    return () => observer.disconnect()
  }, [])

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

      <section className="hero-concept3" ref={heroRef}>
        <div className="hero-background-concept3"></div>
        <div className="hero-content-wrapper-concept3">
          <div className="hero-content-concept3">
            <div className="hero-badge-concept3">
              <Sparkles size={14} />
              <span>Automated Patient Reminders</span>
            </div>
            <h1 className="hero-title-concept3">
              Reduce No-Shows for Your Practice
            </h1>
            <p className="hero-subtitle-concept3">
              Automated appointment reminders that call, text, and confirm patients automatically. 
              Reduce no-shows by up to 40% and save hours of staff time every week.
            </p>
          <div className="hero-cta-concept3">
            <div className="urgency-banner-concept3">
              <Zap size={14} />
              <span>Limited Time: Free 14-Day Trial Ends in</span>
              <div className="countdown-concept3">{timeRemaining}</div>
            </div>
            <button className="cta-primary-concept3" onClick={() => navigate('/concept3/signup')}>
              Start Free Trial Now
              <ArrowRight size={20} />
            </button>
            <p className="cta-note-concept3">No credit card required • Cancel anytime • 200+ practices already using it</p>
            <div className="trust-badges-concept3">
              <div className="trust-badge-concept3">
                <Shield size={14} />
                <span>HIPAA Compliant</span>
              </div>
              <div className="trust-badge-concept3">
                <Star size={14} />
                <span>4.9/5 Rating</span>
              </div>
              <div className="trust-badge-concept3">
                <Users size={14} />
                <span>200+ Practices</span>
              </div>
            </div>
          </div>
          </div>
          <div className="hero-visual-concept3">
            <div className="dashboard-preview-concept3">
              <div className="dashboard-header-concept3">
                <div className="dashboard-title-section-concept3">
                  <div className="dashboard-icon-concept3">🏥</div>
                  <div>
                    <span className="dashboard-title-text-concept3">Appointment Reminders</span>
                    <span className="dashboard-subtitle-concept3">Active • 24/7</span>
                  </div>
                </div>
                <div className="status-badge-concept3 pulse">
                  <div className="pulse-dot-concept3"></div>
                  <span>Active</span>
                </div>
              </div>
              <div className="dashboard-stats-concept3">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card-concept3" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="stat-label-concept3">{stat.label}</div>
                    <div className="stat-value-wrapper-concept3">
                      <div className="stat-value-concept3">{stat.value}</div>
                      <div className={`stat-change-concept3 ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
                        {stat.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {stat.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dashboard-list-concept3">
                <div className="list-header-concept3">
                  <span>Recent Reminders</span>
                  <span className="list-count-concept3">{appointments.length}</span>
                </div>
                {appointments.map((appt, index) => (
                  <div key={index} className="list-item-concept3" style={{ animationDelay: `${(index + 3) * 0.1}s` }}>
                    <div className="item-icon-concept3">{appt.icon}</div>
                    <div className="item-content-concept3">
                      <div className="item-title-concept3">{appt.patient}</div>
                      <div className="item-time-concept3">{appt.time}</div>
                    </div>
                    <div className={`item-status-badge-concept3 ${appt.status}`}>
                      {appt.status === 'confirmed' ? '✅ Confirmed' : '⏰ Scheduled'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="problem-section-concept3" ref={problemRef}>
        <div className="container-concept3">
          <div className="problem-content-concept3">
            <div className="problem-text-concept3">
              <h2>The Hidden Cost of No-Shows</h2>
              <p className="problem-stats-concept3">
                The average medical practice loses <span className="highlight-concept3">$150,000 per year</span> from missed appointments. 
                Your staff spends <span className="highlight-concept3">12+ hours weekly</span> making reminder calls that patients ignore.
              </p>
              <div className="problems-grid-concept3">
                {problems.map((problem, index) => (
                  <div key={index} className="problem-card-concept3" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="problem-icon-concept3">{problem.icon}</div>
                    <span>{problem.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="problem-visual-concept3">
              <div className="loss-calculator-concept3">
                <div className="calculator-header-concept3">
                  <span>Your Monthly Loss</span>
                </div>
                <div className="calculator-stats-concept3">
                  <div className="loss-item-concept3">
                    <span className="loss-label-concept3">No-Show Revenue Lost</span>
                    <span className="loss-value-concept3">-$8,400</span>
                  </div>
                  <div className="loss-item-concept3">
                    <span className="loss-label-concept3">Staff Time Wasted</span>
                    <span className="loss-value-concept3">48 hours</span>
                  </div>
                  <div className="loss-item-concept3">
                    <span className="loss-label-concept3">Unfilled Slots</span>
                    <span className="loss-value-concept3">127 appointments</span>
                  </div>
                </div>
                <div className="calculator-total-concept3">
                  <span>Total Monthly Cost: <strong>$12,400</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="solution-section-concept3" ref={solutionRef}>
        <div className="container-concept3">
          <div className="solution-content-concept3">
            <div className="solution-badge-concept3">
              <Sparkles size={16} />
              <span>The Solution</span>
            </div>
            <h2>Stop Losing Revenue to No-Shows</h2>
            <p className="solution-subtitle-concept3">
              Our AI agent works 24/7 to call, text, and confirm every patient automatically. 
              Practices using our system see <strong>40% fewer no-shows</strong> and <strong>15% more revenue</strong> within the first month.
            </p>
            <div className="before-after-concept3">
              <div className="before-after-card-concept3 before">
                <div className="ba-header-concept3">
                  <span className="ba-label-concept3">Before</span>
                </div>
                <div className="ba-stats-concept3">
                  <div className="ba-stat-concept3">
                    <span className="ba-value-concept3 negative">25%</span>
                    <span className="ba-label-concept3">No-Show Rate</span>
                  </div>
                  <div className="ba-stat-concept3">
                    <span className="ba-value-concept3 negative">48 hrs</span>
                    <span className="ba-label-concept3">Staff Time Wasted</span>
                  </div>
                  <div className="ba-stat-concept3">
                    <span className="ba-value-concept3 negative">$8.4K</span>
                    <span className="ba-label-concept3">Monthly Loss</span>
                  </div>
                </div>
              </div>
              <div className="arrow-divider-concept3">
                <ChevronRight size={32} />
              </div>
              <div className="before-after-card-concept3 after">
                <div className="ba-header-concept3">
                  <span className="ba-label-concept3">After</span>
                </div>
                <div className="ba-stats-concept3">
                  <div className="ba-stat-concept3">
                    <span className="ba-value-concept3 positive">15%</span>
                    <span className="ba-label-concept3">No-Show Rate</span>
                  </div>
                  <div className="ba-stat-concept3">
                    <span className="ba-value-concept3 positive">0 hrs</span>
                    <span className="ba-label-concept3">Staff Time Wasted</span>
                  </div>
                  <div className="ba-stat-concept3">
                    <span className="ba-value-concept3 positive">+$12.4K</span>
                    <span className="ba-label-concept3">Monthly Gain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section-concept3" id="features" ref={featuresRef}>
        <div className="container-concept3">
          <div className="section-header-concept3">
            <h2>How It Works 24/7</h2>
            <p>Set it once, and your AI agent handles every reminder automatically</p>
          </div>
          <div className="features-grid-concept3">
            {features.map((feature, index) => (
              <div key={index} className="feature-card-concept3" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-icon-concept3">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-cta-concept3">
                  <span>See it in action</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="roi-section-concept3" ref={statsRef}>
        <div className="container-concept3">
          <div className="section-header-concept3">
            <h2>Real Results from Real Practices</h2>
            <p>See the impact on practices just like yours</p>
          </div>
          <div className="roi-grid-concept3">
            {roiMetrics.map((metric, index) => (
              <div key={index} className="roi-card-concept3" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="roi-value-concept3">{metric.value}</div>
                <div className="roi-label-concept3">{metric.label}</div>
                <div className="roi-description-concept3">{metric.description}</div>
              </div>
            ))}
          </div>
          <div className="roi-cta-concept3">
            <button className="cta-secondary-concept3" onClick={() => navigate('/concept3/signup')}>
              Calculate Your Savings
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="benefits-section-concept3">
        <div className="container-concept3">
          <div className="benefits-content-concept3">
            <div className="benefits-text-concept3">
              <h2>Why 200+ Practices Switched</h2>
              <p>Join practices that eliminated no-shows and increased revenue</p>
            </div>
            <div className="benefits-list-concept3">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item-concept3" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="benefit-check-concept3">
                    <Check size={20} />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works-concept3" id="how-it-works" ref={stepsRef}>
        <div className="container-concept3">
          <div className="section-header-concept3">
            <h2>Get Started in 3 Simple Steps</h2>
          </div>
          <div className="steps-concept3">
            <div className="step-concept3" style={{ animationDelay: '0s' }}>
              <div className="step-number-concept3">1</div>
              <h3>Sign Up Free</h3>
              <p>Create your account in seconds. No credit card required.</p>
            </div>
            <div className="step-connector-concept3"></div>
            <div className="step-concept3" style={{ animationDelay: '0.2s' }}>
              <div className="step-number-concept3">2</div>
              <h3>Connect Your Calendar</h3>
              <p>Sync with Google Calendar, Outlook, or your practice management system.</p>
            </div>
            <div className="step-connector-concept3"></div>
            <div className="step-concept3" style={{ animationDelay: '0.4s' }}>
              <div className="step-number-concept3">3</div>
              <h3>Launch Reminders</h3>
              <p>Your AI agent starts calling and texting patients automatically.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section-concept3">
        <div className="container-concept3">
          <div className="section-header-concept3">
            <h2>Trusted by Medical Practices</h2>
            <p>See what practices are saying about automated reminders</p>
          </div>
          <div className="testimonials-grid-concept3">
            <div className="testimonial-card-concept3">
              <div className="testimonial-content-concept3">
                <p>"We reduced no-shows by 38% in the first month. The automated reminders save our staff hours every day."</p>
              </div>
              <div className="testimonial-author-concept3">
                <div className="author-avatar-concept3">DR</div>
                <div>
                  <div className="author-name-concept3">Dr. Sarah Martinez</div>
                  <div className="author-role-concept3">Family Practice, Austin TX</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card-concept3">
              <div className="testimonial-content-concept3">
                <p>"Patients love getting the reminder calls. It shows we care about their time. Our satisfaction scores went up significantly."</p>
              </div>
              <div className="testimonial-author-concept3">
                <div className="author-avatar-concept3">MJ</div>
                <div>
                  <div className="author-name-concept3">Dr. Michael Johnson</div>
                  <div className="author-role-concept3">Cardiology Practice, Miami FL</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card-concept3">
              <div className="testimonial-content-concept3">
                <p>"The best part is we can fill last-minute cancellations because patients confirm or reschedule automatically. Revenue increased 15%."</p>
              </div>
              <div className="testimonial-author-concept3">
                <div className="author-avatar-concept3">EW</div>
                <div>
                  <div className="author-name-concept3">Dr. Emily Wilson</div>
                  <div className="author-role-concept3">Dermatology Clinic, Seattle WA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="guarantee-section-concept3">
        <div className="container-concept3">
          <div className="guarantee-card-concept3">
            <div className="guarantee-icon-concept3">
              <Shield size={32} />
            </div>
            <h2>100% Risk-Free Trial</h2>
            <p>Try it free for 14 days. If you don't see results, we'll refund every penny. No questions asked.</p>
            <div className="guarantee-features-concept3">
              <div className="guarantee-item-concept3">
                <Check size={18} />
                <span>14-day free trial</span>
              </div>
              <div className="guarantee-item-concept3">
                <Check size={18} />
                <span>No credit card required</span>
              </div>
              <div className="guarantee-item-concept3">
                <Check size={18} />
                <span>Cancel anytime</span>
              </div>
              <div className="guarantee-item-concept3">
                <Check size={18} />
                <span>Money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section-concept3">
        <div className="container-concept3">
          <div className="cta-content-concept3">
            <div className="cta-badge-concept3">
              <Zap size={16} />
              <span>Limited Spots Available</span>
            </div>
            <h2>Start Your Free Trial Before It's Too Late</h2>
            <p>Only <strong>47 spots</strong> remaining this month. Join 200+ practices already reducing no-shows.</p>
            <div className="cta-buttons-concept3">
              <button className="cta-primary-concept3 large" onClick={() => navigate('/concept3/signup')}>
                Claim Your Free Trial
                <ArrowRight size={20} />
              </button>
              <button className="cta-outline-concept3" onClick={() => navigate('/concept3/signup')}>
                See How It Works
              </button>
            </div>
            <p className="cta-note-concept3">⏰ Free trial ends in {timeRemaining} • No credit card required</p>
            <div className="social-proof-concept3">
              <div className="proof-item-concept3">
                <Users size={16} />
                <span>200+ practices using it</span>
              </div>
              <div className="proof-item-concept3">
                <Star size={16} />
                <span>4.9/5 average rating</span>
              </div>
              <div className="proof-item-concept3">
                <TrendingUp size={16} />
                <span>40% avg. no-show reduction</span>
              </div>
            </div>
          </div>
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
