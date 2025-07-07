let languageCount = 1;

function addLanguage(event) {
	event.preventDefault();

	const exampleLanguages = ['Spanish', 'French', 'Russian', 'German', 'Chinese', 'Japanese', 'Italian', 'Portuguese', 'Arabic'];
	const randomLanguage = exampleLanguages[Math.floor(Math.random() * exampleLanguages.length)];

	const container = document.getElementById('languages-container');
	const languageItems = container.querySelectorAll('.language-item');
	const newIndex = languageItems.length + 1;

	const newLanguageDiv = document.createElement('div');
	newLanguageDiv.classList.add('language-item');
	newLanguageDiv.innerHTML = `
		<div class="form-group">
			<label for="language-name-${newIndex}">Language</label>
			<input type="text" id="language-name-${newIndex}" name="language-name-${newIndex}" placeholder="${randomLanguage}">
		</div>
		<div class="form-group">
			<label for="language-level-${newIndex}">Level</label>
			<select id="language-level-${newIndex}" name="language-level-${newIndex}">
				<option value="beginner">Beginner</option>
				<option value="elementary">Elementary</option>
				<option value="intermediate">Intermediate</option>
				<option value="upper-intermediate">Upper Intermediate</option>
				<option value="advanced">Advanced</option>
				<option value="fluent">Fluent</option>
			</select>
		</div>
	`;
	document.getElementById('languages-container').appendChild(newLanguageDiv);
}
