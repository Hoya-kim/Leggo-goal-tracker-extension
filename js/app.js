document.documentElement.style.setProperty(
  '--primary-color',
  `var(${JSON.parse(localStorage.getItem('userInfo')).color.border})`,
);
document.documentElement.style.setProperty(
  '--secondary-color',
  `var(${JSON.parse(localStorage.getItem('userInfo')).color.face})`,
);
