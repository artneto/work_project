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

// Add event listener for template selection
textTemplate.addEventListener("change", () => {
  let selectedTemplate = textTemplate.value;
  if (selectedTemplate === "template1") {
    writingArea.value = "[Demand], the query is looking for [explain intent]. No burst event as there is no news about this query. According to the session, there is no reliable data for this query. [explain the ranks] R1 R2 R3 R4 Both sides do not satisfy the query. Therefore, there is no better side. Score [score].";
  } else if (selectedTemplate === "template2") {
    writingArea.value = "Content of Template 2\n\n[Specify Demand]. Query is looking for [describe]. According to Session tool:\n\nRank 1 has [%ctr] and [stric caliber].\nRank 2 has [%ctr] and [stric caliber].\nRank 3 has [%ctr] and [stric caliber].\nRank 4 has [%ctr] and [stric caliber].\n\nAll the ranks on top 4 recall videos query is looking for, all have full text matching and content relevance to query, all satisfy query demand, 3pts.";
  } else if (selectedTemplate === "template3") {
    writingArea.value = "Content of Template 3\n\n[Demand], the query is looking for content about [user name]. According to the session, Rank 1 recalled usercard with [%ctr] and [stric calliber], user recalled has a big card and fully matches with demand. Diff on the rank 2, but videos recalled on both sides belong to the main demand. Therefore, there is no better side. Score: 0.";
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
