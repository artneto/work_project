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
let template1Button = document.getElementById("template1Button");
let customTemplateInput = document.getElementById("customTemplateInput");
let saveCustomTemplateButton = document.getElementById("saveCustomTemplate");

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

  // Add event listener for template selection
  textTemplate.addEventListener("change", () => {
    let selectedTemplate = textTemplate.value;
    if (selectedTemplate === "template1") {
      modifyText("insertHTML", false, "<strong>Conteúdo do Template 1</strong>");
    } else {
      modifyText("insertHTML", false, selectedTemplate);
    }
  });

  // Add event listener for custom template saving
  saveCustomTemplateButton.addEventListener("click", () => {
    let customTemplate = customTemplateInput.value;
    if (customTemplate.trim() !== "") {
      let option = document.createElement("option");
      option.value = customTemplate;
      option.innerHTML = customTemplate;
      textTemplate.appendChild(option);
      customTemplateInput.value = "";
    }
  });
};

// Initialize the editor
initializer();
