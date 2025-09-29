// Dark Mode Toggle for GrassRoots Crypto
(function() {
  'use strict';

  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme === 'auto' ? (prefersDark ? 'dark' : 'light') : savedTheme;

  // Set initial theme
  document.documentElement.setAttribute('data-theme', theme);

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('dark-mode-toggle');
    const sunIcon = toggle.querySelector('.sun-icon');
    const moonIcon = toggle.querySelector('.moon-icon');

    // Update toggle button appearance
    function updateToggleButton(currentTheme) {
      if (currentTheme === 'dark') {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
        toggle.setAttribute('aria-label', 'Switch to light mode');
      } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
        toggle.setAttribute('aria-label', 'Switch to dark mode');
      }
    }

    // Set initial button state
    updateToggleButton(theme);

    // Toggle theme function
    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      // Update DOM
      document.documentElement.setAttribute('data-theme', newTheme);

      // Update button
      updateToggleButton(newTheme);

      // Save preference
      localStorage.setItem('theme', newTheme);

      // Dispatch custom event for other scripts
      window.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { theme: newTheme }
      }));
    }

    // Add click event listener
    toggle.addEventListener('click', toggleTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'auto' || !savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateToggleButton(newTheme);
      }
    });

    // Keyboard accessibility
    toggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  });
})();