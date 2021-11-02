const vscode = require('vscode');

// This method contains logic for adding semicolon and comma to the end of the current line.
function append(option) {
	var editor = vscode.window.activeTextEditor
	if (!editor) return

	vscode.commands.executeCommand('acceptSelectedSuggestion').then(() => {
		var lineIndex = editor.selection.active.line
		var lineObject = editor.document.lineAt(lineIndex)
		var lineLength = lineObject.text.trimEnd().length

		if (lineObject.text.charAt(lineLength - 1) !== ';' && lineObject.text.charAt(lineLength - 1) !== ',' && !lineObject.isEmptyOrWhitespace) {
			editor.edit((editBuilder) => {
				if (option === 'semicolon') {
					editBuilder.insert(new vscode.Position(lineIndex, lineLength), ';')
				} else if (option === 'comma') {
					editBuilder.insert(new vscode.Position(lineIndex, lineLength), ',')
				}
			})
		}
	})
}

// This method is called when extension is activated
function activate(context) {
	let semicolonDisposable = vscode.commands.registerCommand('semicolon-comma-and-productive-keybindings.semicolon', function () {
		append('semicolon')
	});

	let commaDisposable = vscode.commands.registerCommand('semicolon-comma-and-productive-keybindings.comma', function () {
		append('comma')
	});

	context.subscriptions.push(semicolonDisposable);
	context.subscriptions.push(commaDisposable);
}

// This method is called when extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
