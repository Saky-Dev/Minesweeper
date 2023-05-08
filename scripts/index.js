const handleButtonChangeTheme = () => document.body.classList.toggle(string_values.DARK_THEME)

const string_values = {
  DARK_THEME: 'dark'
}

Object.freeze(string_values)

const button_change_theme = document.getElementById('change-theme')

const prefered_color = window.matchMedia(`(prefers-color-scheme: ${string_values.DARK_THEME})`)

if (prefered_color.matches)
  document.body.classList.toggle(string_values.DARK_THEME)

button_change_theme.addEventListener('click', handleButtonChangeTheme)