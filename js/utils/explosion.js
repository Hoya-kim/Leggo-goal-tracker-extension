// Original code : https://codepen.io/explosion/pen/zKEovE
const explode = (() => {
  let colors = ['#ffc000', '#ff3b3b', '#ff8400'];
  const bubbles = 15;

  const render = (particles, ctx, width, height) => {
    requestAnimationFrame(() => render(particles, ctx, width, height));
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
      p.x += p.speed * Math.cos((p.rotation * Math.PI) / 180);
      p.y += p.speed * Math.sin((p.rotation * Math.PI) / 180);

      p.opacity -= 0.01;
      p.speed *= p.friction;
      p.radius *= p.friction;
      p.yVel += p.gravity;
      p.y += p.yVel;

      if (p.opacity < 0 || p.radius < 0) return;

      ctx.beginPath();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    });

    return ctx;
  };

  const r = (a, b, c) =>
    parseFloat((Math.random() * ((a || 1) - (b || 0)) + (b || 0)).toFixed(c || 0));

  const setColors = (newColors = []) => {
    colors = newColors.length ? newColors : colors;
  };

  /**
   * Draw explode animation on (x, y) with newColor
   * @param {number} x
   * @param {number} y
   * @param {Array<string>=} newColor
   */
  return (x, y, newColor) => {
    setColors(newColor || []);
    const particles = [];
    const ratio = window.devicePixelRatio;
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');

    c.style.position = 'absolute';
    c.style.left = x - 100 + 'px';
    c.style.top = y - 100 + 'px';
    c.style.pointerEvents = 'none';
    c.style.width = 200 + 'px';
    c.style.height = 200 + 'px';
    c.style.zIndex = 100;
    c.width = 200 * ratio;
    c.height = 200 * ratio;
    document.body.appendChild(c);

    for (let i = 0; i < bubbles; i++) {
      particles.push({
        x: c.width / 2,
        y: c.height / 2,
        radius: r(20, 30),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: r(0, 360, true),
        speed: r(8, 12),
        friction: 0.9,
        opacity: r(0, 0.5, true),
        yVel: 0,
        gravity: 0.1,
      });
    }

    render(particles, ctx, c.width, c.height);
    setTimeout(() => document.body.removeChild(c), 1000);
  };
})();

export default explode;
