(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealTargets = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!reduceMotion && 'IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach((el) => el.classList.add('reveal-ready'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('[data-horizontal-scroll]').forEach((track) => {
    track.addEventListener('wheel', (event) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        track.scrollLeft += event.deltaY;
        event.preventDefault();
      }
    }, { passive: false });
  });

  const eventCountdown = document.querySelector('[data-event-date]');
  if (eventCountdown) {
    const eventDate = new Date(eventCountdown.dataset.eventDate);
    const countdownUnits = {
      days: eventCountdown.querySelector('[data-countdown-days]'),
      hours: eventCountdown.querySelector('[data-countdown-hours]'),
      minutes: eventCountdown.querySelector('[data-countdown-minutes]'),
      seconds: eventCountdown.querySelector('[data-countdown-seconds]')
    };

    const updateCountdown = () => {
      const remaining = Math.max(0, eventDate.getTime() - Date.now());
      const totalSeconds = Math.floor(remaining / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      countdownUnits.days.textContent = String(days).padStart(2, '0');
      countdownUnits.hours.textContent = String(hours).padStart(2, '0');
      countdownUnits.minutes.textContent = String(minutes).padStart(2, '0');
      countdownUnits.seconds.textContent = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  const flyerInput = document.querySelector('[data-flyer-input]');
  const flyerPreview = document.querySelector('[data-flyer-preview]');
  if (flyerInput && flyerPreview) {
    flyerInput.addEventListener('change', () => {
      const [file] = flyerInput.files;
      if (file) {
        flyerPreview.src = URL.createObjectURL(file);
      }
    });
  }
})();
