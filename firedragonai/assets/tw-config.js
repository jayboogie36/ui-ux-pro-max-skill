/* Fire Dragon AI — shared Tailwind CDN config (load right after the CDN script) */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        ember: {
          yellow: '#FACC15', orange: '#FB7227', flame: '#F4511E',
          red: '#E11D2A', deep: '#9A1B0E',
        },
        ink: { 900: '#0a0606', 800: '#120a09', 700: '#1b0f0d', 600: '#2a1815' },
      },
    },
  },
};
