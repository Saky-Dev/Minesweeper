const handleButtonChangeTheme = () => {
  color_theme === string_values.DARK_THEME
  ? (color_theme = string_values.LIGHT_THEME, document.body.setAttribute('theme', color_theme))
  : (color_theme = string_values.DARK_THEME, document.body.setAttribute('theme', color_theme))
}

const string_values = {
  LIGHT_THEME: 'light',
  DARK_THEME: 'dark'
}

Object.freeze(string_values)

const button_change_theme = document.getElementById('change-theme')

const prefered_color = window.matchMedia(`(prefers-color-scheme: ${string_values.DARK_THEME})`)

let color_theme = string_values.LIGHT_THEME

if (prefered_color.matches)
  (color_theme = string_values.DARK_THEME, document.body.setAttribute('theme', color_theme))

button_change_theme.addEventListener('click', handleButtonChangeTheme)