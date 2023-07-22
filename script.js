let optionButtons = document.querySelectorAll(".option-button");
let advancedOptionButtons = document.querySelectorAll(".adv-option-button");
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
  // No highlights for link, unlink, lists, undo, redo since they are one time operations
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  // Create options for font names
  fontList.forEach((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  // Font size allows values from 1 to 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  // Set default font size to 3
  fontSizeRef.value = 3;
};

// Main logic
const modifyText = (command, defaultUi, value) => {
  // execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};

// For basic operations which don't need value parameter
optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

// Options that require value parameter (e.g colors, fonts)
advancedOptionButtons.forEach((button) => {
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

// Add event listener for template selection
textTemplate.addEventListener("change", () => {
  let selectedTemplate = textTemplate.value;
  if (selectedTemplate === "template1") {

    modifyText(
      "insertHTML",
      false,
      "<p>Insert text here</p>"
    );
  } else if (selectedTemplate === "template2") {

    modifyText(
      "insertHTML",
      false,
      "<p>Insert text here</p>"
    );
  } else if (selectedTemplate === "template3") {

    modifyText(
      "insertHTML",
      false,
      "<p>Insert text here</p>"
    );
  } else if (selectedTemplate === "template4") {
    modifyText(
      "insertHTML",
      false,
      "<p>Insert text here</p>"
    );
  } else if (selectedTemplate === "template5") {
    modifyText(
      "insertHTML",
      false,
      "<p>Insert text here</p>"
    );
  } else if (selectedTemplate === "template6") {
   
    modifyText(
      "insertHTML",
      false,
      "<p>Insert text here</p>"
    );
  } else {
    writingArea.value = "";
  }
});

// Save Template
let saveTemplateButton = document.getElementById("saveTemplateButton");
saveTemplateButton.addEventListener("click", saveTemplate);

function saveTemplate() {
  let templateName = prompt("Enter a name for the template:");
  let option = document.createElement("option");
  option.value = templateName;
  option.innerHTML = templateName;
  let templateDropdown = document.getElementById("textTemplate");
  templateDropdown.appendChild(option);
}

// Initialize the editor
window.onload = initializer;
