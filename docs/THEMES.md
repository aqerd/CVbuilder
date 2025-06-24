# Adding themes
This document was written to guide you in creating a new theme for our web app and contributing to our project.
## Clone repository
The first thing you need to do is clone our repository:
```shell
git clone https://github.com/aqerd/CVbuilder.git
```
Then, create a new branch.

## Create a new Theme file
Create a new CSS file in [`themes`](https://github.com/aqerd/CVbuilder/tree/main/app/static/css/themes) directory. Name it whatever you want in lowercase and add colors in `:root`:
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
Go to [`themes.json`](https://github.com/aqerd/CVbuilder/blob/main/src/app/statis/data/themes.json) and add this to the end of the file:
```html
"light": {
	"background": "#ffffff",
	"main": "#000000",
	"interaction": "#888888",
	"accent": "#fde910"
}
```
Replace key with your theme name in lowercase. Also, you need to add 4 colors to make them visible from other themes.

## Create Pull Request
You are ready to [`create new pull request`](https://github.com/aqerd/CVbuilder/pulls). Label it with `new theme` tag and wait for owner's review.
