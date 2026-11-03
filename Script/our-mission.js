(function(){
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('set_bg');

  let particles = [];
  let width, height;
  const SPEED = 1;                    // fast movement multiplier
  const PARTICLE_COUNT_DENSITY = 9000;  // lower = more particles
  const LINK_DISTANCE = 140;
  const CORE_COLOR = '111,242,224';
  const SPARK_COLOR = '242,177,85';

  function resize(){
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function makeParticle(){
    const isSpark = Math.random() < 0.08;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: isSpark ? Math.random() * 2 + 2 : Math.random() * 1.6 + 1,
      spark: isSpark
    };
  }

  function init(){
    resize();
    const count = Math.floor((width * height) / PARTICLE_COUNT_DENSITY);
    particles = Array.from({length: count}, makeParticle);
  }

  function step(){
    ctx.clearRect(0, 0, width, height);

    for (const p of particles){
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      const color = p.spark ? SPARK_COLOR : CORE_COLOR;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      grad.addColorStop(0, `rgba(${color},0.9)`);
      grad.addColorStop(1, `rgba(${color},0)`);

      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(${color},1)`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++){
      for (let j = i + 1; j < particles.length; j++){
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < LINK_DISTANCE){
          const alpha = (1 - dist / LINK_DISTANCE) * 0.5;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(120,200,220,${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  init();
  requestAnimationFrame(step);
})();

(function(){
  const canvas = document.getElementById('cta-particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('cta');

  let particles = [];
  let width, height;
  const SPEED = 1;
  const PARTICLE_COUNT_DENSITY = 11000;
  const LINK_DISTANCE = 130;
  const CORE_COLOR = '224,168,64';   // gold, matches --cta-accent
  const SOFT_COLOR = '243,240,232';  // warm off-white

  function resize(){
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function makeParticle(){
    const isSoft = Math.random() < 0.25;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: isSoft ? Math.random() * 1.2 + 0.8 : Math.random() * 1.6 + 1,
      soft: isSoft
    };
  }

  function init(){
    resize();
    const count = Math.floor((width * height) / PARTICLE_COUNT_DENSITY);
    particles = Array.from({length: count}, makeParticle);
  }

  function step(){
    ctx.clearRect(0, 0, width, height);

    for (const p of particles){
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      const color = p.soft ? SOFT_COLOR : CORE_COLOR;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      grad.addColorStop(0, `rgba(${color},0.5)`);
      grad.addColorStop(1, `rgba(${color},0)`);

      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(${color},0.85)`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++){
      for (let j = i + 1; j < particles.length; j++){
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < LINK_DISTANCE){
          const alpha = (1 - dist / LINK_DISTANCE) * 0.22;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(224,168,64,${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  init();
  requestAnimationFrame(step);
})();
