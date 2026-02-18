export const disableDevTools = () => {
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
    }
  });
  
  let devtools = {
    open: false,
    orientation: null
  };
  
  const threshold = 160;
  
  setInterval(() => {
    if (
      window.outerHeight - window.innerHeight > threshold ||
      window.outerWidth - window.innerWidth > threshold
    ) {
      if (!devtools.open) {
        console.clear();
        console.log('%c🚫 Developer tools detected!', 'color: red; font-size: 20px; font-weight: bold;');
        devtools.open = true;
      }
    } else {
      devtools.open = false;
    }
  }, 500);
};

export const clearConsoleOnOpen = () => {
  let consoleCleared = false;
  
  const originalLog = console.log;
  console.log = function(...args) {
    if (!consoleCleared) {
      console.clear();
      consoleCleared = true;
      originalLog.apply(console, ['%c🔒 Protected Application', 'color: #666; font-size: 12px;']);
    }
    originalLog.apply(console, args);
  };
};
