window.addEventListener("DOMContentLoaded", (event) => {
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
  let saveTemplateButton = document.getElementById("saveTemplateButton");

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
        modifyText("insertHTML", false, "<strong>Content of Template 1</strong>");
      } else if (selectedTemplate === "template2") {
        modifyText("insertHTML", false, "<em>Content of Template 2</em>");
      } else if (selectedTemplate === "template3") {
        modifyText("insertHTML", false, "<u>Content of Template 3</u>");
      }
    });

    // Add event listener for save template button
    saveTemplateButton.addEventListener("click", () => {
      let templateContent = writingArea.innerHTML;
      if (templateContent.trim() !== "") {
        let templateOption = document.createElement("option");
        templateOption.value = "custom";
        templateOption.innerHTML = "Custom Template";
        textTemplate.appendChild(templateOption);
        textTemplate.value = "custom";
        modifyText("insertHTML", false, templateContent);
      }
    });
  };

  // Initialize the editor
  initializer();

  // Helper function to modify text
  const modifyText = (command, showUI, value) => {
    document.execCommand(command, showUI, value);
    writingArea.focus();
  };

  // Helper function to highlight buttons
  const highlighter = (buttons, oneTimeOperation) => {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (oneTimeOperation) {
          modifyText(button.id, false, null);
        } else {
          modifyText(button.id, false, null);
          button.classList.toggle("active");
        }
      });
    });
  };
});
