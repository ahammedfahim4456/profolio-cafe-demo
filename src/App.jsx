import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

const photos = {
  hero: 'https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=2200&q=90',
  espresso: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
  pour: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
  iced: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=85',
  process: 'https://images.unsplash.com/photo-1514066558159-fc8c737ef259?auto=format&fit=crop&w=1400&q=85',
  machine: 'https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=1200&q=85',
  beans: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85',
  bar: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85',
}

const drinks = [
  { name: 'KAKONDE', type: 'ESPRESSO / ETHIOPIA', temp: '93°C', price: '₹260', image: photos.espresso },
  { name: 'SLOW BURN', type: 'FILTER / COLOMBIA', temp: '89°C', price: '₹310', image: photos.pour },
  { name: 'BLACK TIDE', type: 'NITRO / RWANDA', temp: '03°C', price: '₹380', image: photos.iced },
  { name: 'DAYBREAK', type: 'MILK / BRAZIL', temp: '64°C', price: '₹320', image: photos.bar },
]

const b2b = [
  { num: '01', title: 'HARDWARE DEPLOYMENT', copy: 'Modular, brutalist counter-recessed systems installed natively into your HQ. Zero visual noise, maximum thermodynamic stability.', label: 'BOILER COMPONENT HIGHLIGHT', image: photos.machine },
  { num: '02', title: 'TELEMETRY & CALIBRATION', copy: 'Water density, extraction pressure, and temperature mapped daily. We manage the variables so your workforce receives a perfectly deterministic output, every time.', label: 'GROUPHEAD HIGHLIGHT', image: photos.process },
  { num: '03', title: 'THE SUBSCRIPTION (CaaS)', copy: 'Automated cold-chain logistics. Single-origin bean replenishment, nitro cold brew keg swapping, and preventative machine maintenance.', label: 'NITRO KEG HIGHLIGHT', image: photos.beans },
]

function Pointer() {
  const pointer = useRef(null)
  useEffect(() => {
    let x = -100, y = -100, tx = -100, ty = -100, active = false, frame = 0, running = false
    const tick = () => {
      x += (tx - x) * .16; y += (ty - y) * .16
      if (pointer.current) pointer.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      if (Math.abs(tx - x) + Math.abs(ty - y) > .1) frame = requestAnimationFrame(tick)
      else running = false
    }
    const move = (e) => {
      tx = e.clientX; ty = e.clientY
      if (!active) { active = true; pointer.current?.classList.add('is-visible') }
      if (!running) { running = true; frame = requestAnimationFrame(tick) }
    }
    const enter = (e) => {
      const target = e.target.closest('a,button,input,textarea,select,.interactive')
      if (!target || !pointer.current) return
      const image = target.dataset.cursorImage
      pointer.current.classList.toggle('is-drink', Boolean(image))
      pointer.current.classList.toggle('is-link', !image)
      pointer.current.style.backgroundImage = image ? `url(${image})` : ''
    }
    const leave = (e) => {
      if (e.relatedTarget?.closest?.('a,button,input,textarea,select,.interactive')) return
      pointer.current?.classList.remove('is-link', 'is-drink', 'is-pressed')
      if (pointer.current) pointer.current.style.backgroundImage = ''
    }
    const down = () => pointer.current?.classList.add('is-pressed')
    const up = () => pointer.current?.classList.remove('is-pressed')
    window.addEventListener('pointermove', move); document.addEventListener('pointerover', enter); document.addEventListener('pointerout', leave); document.addEventListener('pointerdown', down); document.addEventListener('pointerup', up)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', enter); document.removeEventListener('pointerout', leave); document.removeEventListener('pointerdown', down); document.removeEventListener('pointerup', up) }
  }, [])
  return <div className="pointer" ref={pointer} aria-hidden="true" />
}

function Splash({ leaving }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const duration = 1600
    const started = performance.now()
    let frame = 0
    const tick = (now) => {
      const next = Math.min(100, Math.round(((now - started) / duration) * 100))
      setProgress(next)
      if (next < 100) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])
  return <div className={`splash ${leaving ? 'is-leaving' : ''}`} role="status" aria-label="Loading Brew and Bean">
    <span className="splash-brand">BREW<br />AND BEAN</span>
    <div className="splash-progress"><div className="splash-meta"><span>CALIBRATING</span><span>{String(progress).padStart(2, '0')}%</span></div><span className="splash-track"><i style={{ transform: `scaleX(${progress / 100})` }} /></span></div>
  </div>
}

function StatCounter({ value, prefix = '', suffix = '', precision = 0 }) {
  const [count, setCount] = useState(0)
  const node = useRef(null)
  useEffect(() => {
    const element = node.current
    if (!element) return undefined
    let frame = 0
    const start = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(value); return }
      const begun = performance.now()
      const tick = (now) => {
        const progress = Math.min(1, (now - begun) / 1150)
        setCount(value * (1 - Math.pow(1 - progress, 4)))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { start(); observer.disconnect() } }, { threshold: .6 })
    observer.observe(element)
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [value])
  return <b ref={node}>{prefix}{Number(count.toFixed(precision))}{suffix}</b>
}

function App() {
  const [menu, setMenu] = useState(false)
  const [sent, setSent] = useState(false)
  const [activeGallery, setActiveGallery] = useState(null)
  const [booting, setBooting] = useState(true)
  const [splashLeaving, setSplashLeaving] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', subject: '', email: '' })
  const aboutRef = useRef(null)
  const enterpriseRef = useRef(null)
  const galleryRef = useRef(null)
  useEffect(() => {
    const leave = window.setTimeout(() => setSplashLeaving(true), 1600)
    const finish = window.setTimeout(() => { document.body.classList.remove('is-splashing'); setBooting(false) }, 2000)
    return () => { clearTimeout(leave); clearTimeout(finish); document.body.classList.remove('is-splashing') }
  }, [])
  useEffect(() => {
    if (!menu) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') setMenu(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menu])
  useEffect(() => {
    if (booting) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const lenis = new Lenis({ lerp: .085, duration: 1.15, smoothWheel: true, smoothTouch: false, wheelMultiplier: .9 })
    let frame = 0
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [booting])
  useEffect(() => {
    if (booting) return undefined
    const nodes = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { requestAnimationFrame(() => requestAnimationFrame(() => entry.target.classList.add('is-visible'))); observer.unobserve(entry.target) } }), { threshold: .01, rootMargin: '0px 0px -8% 0px' })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [booting])
  useEffect(() => {
    const items = [...document.querySelectorAll('[data-parallax]')]
    const smoothstep = (value, start, end) => Math.max(0, Math.min(1, (value - start) / (end - start)))
    const lerp = (from, to, progress) => from + ((to - from) * progress)
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      const gallery = galleryRef.current
      if (gallery) {
        const rect = gallery.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
        const centered = (progress - .5) * 2
        const dampening = window.innerWidth < 701 ? .68 : 1
        items.forEach((item) => { item.style.transform = `translate3d(0, ${centered * Number(item.dataset.parallax) * dampening}px, 0)` })
      }

      const about = aboutRef.current
      if (!about) return
      const stageOffset = about.querySelector('.section-label')?.offsetHeight || 0
      const start = about.offsetTop + stageOffset
      const travel = Math.max(1, about.offsetHeight - window.innerHeight - stageOffset)
      const progress = Math.max(0, Math.min(1, (y - start) / travel))
      const assemble = smoothstep(progress, .18, .47)
      const release = smoothstep(progress, .54, .80)
      const copy = about.querySelector('.about-copy')
      if (copy) copy.style.opacity = String(1 - smoothstep(progress, .39, .50))
      const positions = [
        { x: window.innerWidth < 701 ? -45 : -40, targetX: window.innerWidth < 701 ? -28 : -21.5, rotation: -14 },
        { x: 0, targetX: 0, rotation: 0 },
        { x: window.innerWidth < 701 ? 45 : 40, targetX: window.innerWidth < 701 ? 28 : 21.5, rotation: 14 },
      ]
      about.querySelectorAll('.specimen').forEach((plate, index) => {
        const position = positions[index]
        const x = lerp(position.x, position.targetX, assemble)
        const inY = lerp(77, 0, assemble)
        const outY = lerp(0, -88, release)
        const rotation = lerp(position.rotation, 0, assemble)
        plate.style.opacity = String(smoothstep(progress, .14, .21))
        plate.style.transform = `translate3d(calc(-50% + ${x}vw), calc(-50% + ${inY + outY}vh), 0) rotate(${rotation}deg)`
      })

      const enterprise = enterpriseRef.current
      if (!enterprise) return
      const enterpriseProgress = Math.max(0, Math.min(1, (y - enterprise.offsetTop) / (window.innerHeight * .92)))
      const fade = smoothstep(enterpriseProgress, .08, .7)
      const intro = enterprise.querySelector('.enterprise-intro')
      if (intro) {
        const interpolate = (from, to) => Math.round(lerp(from, to, fade))
        intro.style.backgroundColor = `rgb(${interpolate(242, 16)}, ${interpolate(240, 16)}, ${interpolate(228, 14)})`
        intro.style.color = `rgb(${interpolate(16, 242)}, ${interpolate(16, 240)}, ${interpolate(14, 228)})`
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true }); update()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll) }
  }, [])
  const updateForm = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const send = (e) => { e.preventDefault(); setSent(true) }
  return <>
    {booting && <Splash leaving={splashLeaving} />}
    <Pointer />
    <div className={`menu-panel ${menu ? 'open' : ''}`} id="site-menu" aria-hidden={!menu}><button className="menu-close interactive" onClick={() => setMenu(false)} aria-label="Close menu"><span>CLOSE</span><i /><i /></button><a href="#about" onClick={() => setMenu(false)}>About</a><a href="#favourites" onClick={() => setMenu(false)}>Favourites</a><a href="#enterprise" onClick={() => setMenu(false)}>Enterprise</a><a href="#contact" onClick={() => setMenu(false)}>Contact</a></div>
    <nav className="topbar">
      <a href="#top" className="brand interactive"><img src="/logo.png" alt="Brew and Bean logo" className="brand-mark-img" /><span>BREW AND BEAN</span></a>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="site-menu"><span>MENU</span><i /><i /></button>
    </nav>
    <main>
      <section className="hero" id="top">
        <div className="hero-media"><img src={photos.hero} alt="Brew and Bean espresso machine" fetchPriority="high" /></div>
        <div className="hero-wash" />
        <h1>THE PRECISION<br />OF <em>EXTRACTION</em></h1>
        <a className="scroll-note interactive" href="#about">SCROLL TO CONTINUE <span>↓</span></a>
        <div className="hero-index">EST. 2018 / BENGALURU</div>
      </section>

      <section className="about" id="about" ref={aboutRef}>
        <div className="about-stage">
          <div className="about-copy"><p>“Coffee is not a passive commodity. It is a critical substrate for<br className="desktop-only" /> human cognitive output and productivity. We treat it with the<br className="desktop-only" /> thermodynamic exactness it deserves.”</p></div>
          <div className="specimens" aria-hidden="true">
            <figure className="specimen specimen-a"><img src={photos.espresso} alt="" loading="lazy" /><figcaption>01 / DENSITY</figcaption></figure>
            <figure className="specimen specimen-b"><img src={photos.pour} alt="" loading="lazy" /><figcaption>02 / FLOW</figcaption></figure>
            <figure className="specimen specimen-c"><img src={photos.iced} alt="" loading="lazy" /><figcaption>03 / TEMPERATURE</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="favourites" id="favourites">
        <div className="section-label"><span>( 02 )</span><span>FAVOURITES / CURRENT CALIBRATION</span></div>
        <div className="favourites-heading reveal"><h2>THE<br /><em>SHORTLIST.</em></h2><p>Served at the precise point between intention and instinct.</p></div>
        <div className="drink-list">
          {drinks.map((item, idx) => <article className="drink interactive reveal" key={item.name} data-cursor-image={item.image} tabIndex="0">
            <span className="drink-number">0{idx + 1}</span><h3>{item.name}</h3><span>{item.type}</span><span>{item.temp}</span><span>{item.price}</span></article>)}
        </div>
      </section>

      <section className="gallery" id="gallery" ref={galleryRef}>
        <div className="gallery-title reveal"><span>( 03 )</span><h2>THE<br />FIELD<br /><em>NOTES.</em></h2></div>
        <div className={`gallery-grid ${activeGallery !== null ? 'has-active' : ''}`} onClick={(event) => { if (event.target === event.currentTarget) setActiveGallery(null) }}>
          <figure className={`gallery-item g1 interactive ${activeGallery === 0 ? 'is-active' : ''}`} data-parallax="-120" tabIndex="0" onClick={() => setActiveGallery(activeGallery === 0 ? null : 0)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setActiveGallery(activeGallery === 0 ? null : 0) } }}><img src={photos.process} alt="Coffee pouring from a glass carafe" loading="lazy" decoding="async" /><figcaption>THE POUR / 08:43</figcaption></figure>
          <figure className={`gallery-item g2 interactive ${activeGallery === 1 ? 'is-active' : ''}`} data-parallax="72" tabIndex="0" onClick={() => setActiveGallery(activeGallery === 1 ? null : 1)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setActiveGallery(activeGallery === 1 ? null : 1) } }}><img src={photos.beans} alt="Freshly roasted coffee beans" loading="lazy" decoding="async" /><figcaption>ORIGIN / LIMU</figcaption></figure>
          <figure className={`gallery-item g3 interactive ${activeGallery === 2 ? 'is-active' : ''}`} data-parallax="-150" tabIndex="0" onClick={() => setActiveGallery(activeGallery === 2 ? null : 2)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setActiveGallery(activeGallery === 2 ? null : 2) } }}><img src={photos.bar} alt="Coffee served at the bar" loading="lazy" decoding="async" /><figcaption>RITUAL / DAILY</figcaption></figure>
          <p className="gallery-manifesto reveal">WE DOCUMENT THE THINGS THAT MAKE A CUP FEEL <em>INEVITABLE.</em></p>
        </div>
      </section>

      <section className="enterprise" id="enterprise" ref={enterpriseRef}>
        <div className="enterprise-intro"><span>( 04 )</span><p>BECAUSE THE BEST WORK<br />DESERVES BETTER COFFEE.</p><h2>PRECISION,<br /><em>AT SCALE.</em></h2></div>
        <div className="enterprise-inner">
          <div className="enterprise-lead reveal"><p>WE EMBED COFFEE SYSTEMS INTO THE RHYTHM OF YOUR BUSINESS — MEASURED, MAINTAINED, UNMISTAKABLY YOURS.</p></div>
          <div className="enterprise-cards">
            {b2b.map((card) => <article className="b2b-card reveal" key={card.num}><div className="b2b-copy"><span>{card.num}</span><h3>{card.title}</h3><p>{card.copy}</p></div><div className="b2b-image"><span>{card.label}</span><img src={card.image} alt="" loading="lazy" decoding="async" /></div></article>)}
          </div>
          <div className="sla reveal"><div><span>THE SERVICE LEVEL AGREEMENT (SLA)</span><p>We don't do contracts; we do SLAs.</p></div><div className="metrics"><p><StatCounter value={99.9} precision={1} suffix="%" /><small>UPTIME<br />TARGET</small></p><p><StatCounter value={.1} precision={1} prefix="± " suffix="°C" /><small>TEMP.<br />VARIANCE</small></p><p><StatCounter value={12} prefix="< " suffix=" HR" /><small>SUPPORT<br />RESPONSE</small></p></div></div>
          <a href="#contact" className="enterprise-cta interactive">INITIATE ENTERPRISE AUDIT <span>↗</span></a>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-label"><span>( 05 )</span><span>OPEN A CONVERSATION</span></div>
        <h2 className="reveal">LET'S MAKE<br />SOMETHING <em>EXACT.</em></h2>
        <form className="reveal" onSubmit={send}><p>Hello, my name is <input required name="name" value={form.name} onChange={updateForm} placeholder="[Name]" aria-label="Name" /> and I represent <input required name="company" value={form.company} onChange={updateForm} placeholder="[Company]" aria-label="Company" />. I want to talk about <input required name="subject" value={form.subject} onChange={updateForm} placeholder="[Subject]" aria-label="Subject" />. Here's my email <input required type="email" name="email" value={form.email} onChange={updateForm} placeholder="[Email]" aria-label="Email" />.</p><button className="send-button interactive">{sent ? 'MESSAGE RECEIVED — THANK YOU' : 'SEND THE BRIEF ↗'}</button></form>
        <div className="socials"><span>FOLLOW THE WORK</span><a href="#contact">FB ↗</a><a href="#contact">X ↗</a><a href="#contact">IG ↗</a><a href="#contact">WHATSAPP ↗</a></div>
      </section>
    </main>
    <footer><a href="#top" className="interactive">BREW<br />AND<br />BEAN</a><span>NOT A COFFEE BREAK.<br />A BETTER WORKDAY.</span><span>© 2026 / BENGALURU</span><a href="#top">BACK TO TOP ↑</a></footer>
  </>
}

export default App
