export const createInputField = (id: string, placeholder: string): HTMLInputElement => {
    const input = document.createElement('input');
    input.id = id;
    input.placeholder = placeholder;
    input.type = 'text';
    return input;
};

export const createButton = (text: string, onClick: () => void): HTMLButtonElement => {
    const button = document.createElement('button');
    button.innerText = text;
    button.onclick = onClick;
    return button;
};

export const createResultDisplay = (): HTMLDivElement => {
    const resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    return resultDiv;
};

export const createUIComponents = (): HTMLElement => {
    const container = document.createElement('div');

    const startInput = createInputField('startNode', 'Enter start node');
    const goalInput = createInputField('goalNode', 'Enter goal node');
    const searchButton = createButton('Search', () => {
        // Placeholder for search function
    });
    const resultDisplay = createResultDisplay();

    container.appendChild(startInput);
    container.appendChild(goalInput);
    container.appendChild(searchButton);
    container.appendChild(resultDisplay);

    return container;
};