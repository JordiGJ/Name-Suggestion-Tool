// Define a constant array containing common English names
const commonEnglishNames = [
  'James',
  'Mary',
  'John',
  'Robert',
  'Michael',
  'William',
  'David',
  'Richard',
  'Joseph',
  'Charles',
  'Thomas',
  'Christopher',
  'Daniel',
  'Paul',
  'Mark',
  'Steven',
  'Anthony',
  'Andrew',
  'Joshua',
  'Emily',
];

// Get input element and list element using document.querySelector
const userInput = document.querySelector('#username');
const submit = document.querySelector('input[type=submit]');
const list = document.querySelector('ul');

// function to handle user input
function handleInput(e) {
  // Sort the names array in alphabetical order
  const sortedNames = commonEnglishNames.sort();

  // Extract the user's input and convert it to lowercase for comparison
  const inputValue = e.target.value.toLowerCase().trim();

  // Determine the length of the user's input
  const inputLength = inputValue.length;

  // Create an empty array to store the names to be displayed
  const namesToShow = [];

  // Iterate through the sorted names array
  sortedNames.forEach(name => {
    // Convert the name to lowercase for comparison
    const loweredName = name.toLowerCase();

    // Initialize a variable to compare characters
    let comparator = '';

    // Loop through the inputLength characters of the user input
    for (let i = 0; i < inputLength; i++) {
      // Check if this is the first character
      if (i === 0) {
        comparator = loweredName[i];
      } else {
        // Append the current character to the comparator
        comparator += loweredName[i];
      }
      // If the comparator matches the input value, add the name to the results array
      if (comparator === inputValue) {
        namesToShow.push(name);
      }
    }

    // Empties the list to avoid duplicates when the input changes
    list.innerHTML = '';

    // If the input field is empty, clear the list
    if (!inputLength) {
      list.innerHTML = '';
    }

    // Create and append <li> elements for each name in the results array
    namesToShow.forEach(name => {
      // Creates a new li element
      const newLi = document.createElement('li');
      // Sets text inside the created li
      newLi.textContent = name;
      // Sets tabindex to the li element so it can be selected with the tab key
      newLi.setAttribute('tabindex', 0);
      // Adds click event listener to the li element so the input value becomes the text in the li
      newLi.addEventListener('click', () => {
        userInput.value = name;
        // Empties the list to avoid duplicates when the input changes
        list.innerHTML = '';
      });
      // Adds keydown event listener to the li element so the input value becomes the text in the li when the enter key is pressed down
      newLi.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          userInput.value = name;
          // Empties the list to avoid duplicates when the input changes
          list.innerHTML = '';
        }
      });
      list.append(newLi);
    });
  });
}

// Function to handle user submit
function handleSubmit(e) {
  e.preventDefault();
  // Variable to store the current user input
  const currentInput = userInput.value;
  // If current input is two characters long or more append it to commondEnglishNames
  if (currentInput.length > 1 && !commonEnglishNames.includes(currentInput)) {
    // capitalize currentInput
    const newName = `${currentInput[0].toUpperCase()}${currentInput.slice(1)}`;
    // Adds newName to commonEnglisNames
    commonEnglishNames.push(newName);
    // Resets userInput value
    userInput.value = '';
    // Clears the list
    list.innerHTML = '';
    // focus goes back to the input filed
    userInput.focus();
    // if the currentInput already exists or is two short
  } else {
    // Resets userInput value
    userInput.value = '';
    // Clears the list
    list.innerHTML = '';
    // focus goes back to the input filed
    userInput.focus();
  }
}

userInput.addEventListener('input', handleInput);
submit.addEventListener('click', handleSubmit);
