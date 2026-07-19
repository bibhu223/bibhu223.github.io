const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  if (themeToggle) themeToggle.textContent = theme === "dark" ? "☀" : "◐";
}

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();


/* Robot + magnetic field + LiDAR + SLAM animation */
(() => {
  const canvas = document.querySelector('#robotics-canvas');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let w=0,h=0,dpr=1,start=performance.now(),raf;
  const particles=Array.from({length:45},()=>({x:Math.random(),y:Math.random(),r:.8+Math.random()*2.1,p:Math.random()*6.28}));
  function resize(){const r=canvas.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  function particlesDraw(t){particles.forEach((p,i)=>{const x=p.x*w,y=((p.y+t*.000003*(1+i%3))%1)*h,a=.18+.18*Math.sin(t*.0015+p.p);ctx.beginPath();ctx.arc(x,y,p.r,0,6.283);ctx.fillStyle=i%3?'rgba(65,155,235,'+a+')':'rgba(42,220,195,'+(a+.05)+')';ctx.fill()})}
  function field(x,y,t){ctx.save();ctx.translate(x,y);for(let i=0;i<8;i++){const s=35+i*23,wb=Math.sin(t*.0014+i*.7)*8;ctx.lineWidth=1.2;ctx.strokeStyle='rgba(45,205,190,'+(0.29-i*.024)+')';ctx.beginPath();ctx.moveTo(-12,0);ctx.bezierCurveTo(-s,-82-wb,-s,82+wb,-12,4);ctx.stroke();ctx.strokeStyle='rgba(65,151,236,'+(0.29-i*.024)+')';ctx.beginPath();ctx.moveTo(12,0);ctx.bezierCurveTo(s,-82+wb,s,82-wb,12,4);ctx.stroke()}ctx.restore()}
  function path(x,y,t){ctx.save();ctx.beginPath();for(let i=0;i<110;i++){const u=i/109,px=w*.49+u*w*.43,py=h*.77-Math.sin(u*6.8+t*.00045)*34-u*110;i?ctx.lineTo(px,py):ctx.moveTo(px,py)}const g=ctx.createLinearGradient(w*.48,0,w*.95,0);g.addColorStop(0,'rgba(50,205,190,.08)');g.addColorStop(1,'rgba(70,155,240,.85)');ctx.strokeStyle=g;ctx.lineWidth=3;ctx.setLineDash([9,9]);ctx.lineDashOffset=-t*.02;ctx.stroke();ctx.restore()}
  function lidar(x,y,t){ctx.save();ctx.translate(x,y-28);for(let i=0;i<48;i++){const a=t*.00125+i/48*6.283,L=78+Math.sin(i*2.1+t*.002)*22;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*L,Math.sin(a)*L);ctx.strokeStyle='rgba(55,165,245,'+(i%7===0?.16:.035)+')';ctx.lineWidth=i%7===0?1.3:.55;ctx.stroke()}ctx.restore()}
  function robot(x,y,t){ctx.save();ctx.translate(x,y);ctx.beginPath();ctx.ellipse(0,28,54,13,0,0,6.283);ctx.fillStyle='rgba(0,0,0,.18)';ctx.fill();[-37,37].forEach(px=>{ctx.beginPath();ctx.arc(px,13,17,0,6.283);ctx.fillStyle='rgba(20,31,43,.96)';ctx.fill();ctx.beginPath();ctx.arc(px,13,7,0,6.283);ctx.fillStyle='rgba(87,170,240,.9)';ctx.fill()});const g=ctx.createLinearGradient(-48,-25,48,24);g.addColorStop(0,'rgba(27,82,130,.98)');g.addColorStop(1,'rgba(32,170,170,.98)');ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(-50,-24,100,45,12);ctx.fill();ctx.fillStyle='rgba(220,240,255,.92)';ctx.fillRect(-4,-50,8,28);ctx.beginPath();ctx.ellipse(0,-52,18,7,0,0,6.283);ctx.fillStyle='rgba(75,170,245,.98)';ctx.fill();ctx.beginPath();ctx.arc(0,-52,5+Math.sin(t*.005)*1.2,0,6.283);ctx.fillStyle='rgba(190,240,255,.95)';ctx.fill();ctx.beginPath();ctx.arc(29,-9,5,0,6.283);ctx.fillStyle='rgba(42,235,195,.95)';ctx.shadowColor='rgba(42,235,195,.8)';ctx.shadowBlur=12;ctx.fill();ctx.restore()}
  function grid(){const hz=h*.73;ctx.save();ctx.strokeStyle='rgba(90,145,190,.22)';ctx.lineWidth=1;for(let i=0;i<10;i++){ctx.beginPath();ctx.moveTo(w*.43,hz+i*24);ctx.lineTo(w,hz+i*28);ctx.stroke()}for(let i=0;i<12;i++){ctx.beginPath();ctx.moveTo(w*.68,hz);ctx.lineTo(w*.45+i*60,h);ctx.stroke()}ctx.font='600 12px Inter,sans-serif';ctx.fillStyle='rgba(100,170,225,.60)';ctx.fillText('GPS-DENIED ENVIRONMENT',w*.70,h*.17);ctx.restore()}
  function draw(now){const t=now-start;ctx.clearRect(0,0,w,h);grid();particlesDraw(t);const p=(t*.000025)%1,x=w*(.50+p*.24),y=h*.49-Math.sin(p*6.283)*24-p*72;path(x,y,t);field(x,y,t);lidar(x,y,t);robot(x,y,t);raf=requestAnimationFrame(draw)}
  resize();addEventListener('resize',resize);raf=requestAnimationFrame(draw);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf)}else{start=performance.now();raf=requestAnimationFrame(draw)}})
})();
