let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let textTemplate = document.getElementById("textTemplate");

// List of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

// Initial Settings
const initializer = () => {
  // Function calls for highlighting buttons
  // No highlights for link, unlink, lists, undo, redo since they are one-time operations
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  // Create options for font names
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  // FontSize allows only till 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  // Default size
  fontSizeRef.value = 3;

  // Templates
  textTemplate.innerHTML += "<option value=''>Select a Template</option>";
  textTemplate.innerHTML += "<option value='<strong>Template 1</strong>'>Template 1</option>";
  textTemplate.innerHTML += "<option value='<em>Template 2</em>'>Template 2</option>";
  textTemplate.innerHTML += "<option value='<u>Template 3</u>'>Template 3</option>";

  textTemplate.addEventListener("change", () => {
    let selectedTemplate = textTemplate.value;
    modifyText("insertHTML", false, selectedTemplate);
  });
};

// Main logic
const modifyText = (command, defaultUi, value) => {
  // execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};

// For basic operations that don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

// Options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

// Link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  // If link has http then pass directly else add https
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

// Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      // needsRemoval = true means only one button should be highlighted and others would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        // If currently clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        // Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          // Highlight clicked button
          button.classList.add("active");
        }
      } else {
        // If other buttons can be highlighted
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = initializer;
