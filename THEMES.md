# Adding themes
This document was written to guide you in creating a new theme for our web app and contributing to our project.
## Clone repository
The first thing you need to do is clone our repository:
```shell
git clone https://github.com/aqerd/CVbuilder.git
```
Then, create a new branch.

## Create a new Theme file
Create a new CSS file in [themes](https://github.com/aqerd/CVbuilder/tree/main/app/static/css/themes) directory. Name it whatever you want and add colors in `:root`:
```css
:root {
    --bg-color: #ffffff;
    --main-color: #ffffff;
    --accent-color: #ffffff;
    --interaction-color: #ffffff;
    --hover-color: #ffffff;
    --neutral-color: #ffffff;
    --border-color: #ffffff;
}
```

- `--bg-color` is the background color.
- `--main-color` is the color used for text, activated buttons, and inputs.
- `--accent-color` is the color used for bold text and references.
- `--interaction-color` is the color used for buttons.
- `--hover-color` is the color used for hovered buttons.
- `--neutral-color` is for placeholders.
- `--border-color` is for input borders.

## Add html code
Go to [themes.html](https://github.com/aqerd/CVbuilder/blob/57cdaf1c0c5999498f2db070ce9312127ece1d49/app/templates/shared/themes.html) and add this to the end of the file:
```html
<button data-theme="light" class="theme-toggle">
    <span class="theme-toggle-text">Light</span>
    {% set background = '#ffffff' %}
    {% set colors = ['#ffffff', '#ffffff', '#ffffff'] %}
    {% include 'shared/colors.html' %}
</button>
```
Replace `data-theme` attribute with yours in lowercase and then change the name in `<span>` content to your theme name in uppercase.
Also, you need to add 4 colors to make them visible from other themes.
Place the value of `--bg-color` in `background` set and then put values of `--main-color`, `--interaction-color` and `--accent-color` in this exact order in the `colors` array.

## Create Pull Request
You are ready to [create new pull request](https://github.com/aqerd/CVbuilder/pulls). Label it with `new theme` tag and wait for owner's review.
