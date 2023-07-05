window.addEventListener("DOMContentLoaded", (event) => {
  // List of variables
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

  // Highlighter function
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

    // Default template
    const defaultTemplate = "[Demand], the query is looking for ''.\nAccording to the session, there is no reliable data for this query.\nR2 & 3 recalled the same video on different positions.\nR4 both sides recalled videos that fully satisfy the query according to text relevance, content, popularity and timeliness.\nTherefore there is no better side. Score 0.";

    // Set default template as the value of the text template
    textTemplate.value = "default";
    writingArea.innerHTML = defaultTemplate;

    // Add event listener for template selection
    textTemplate.addEventListener("change", () => {
      let selectedTemplate = textTemplate.value;
      if (selectedTemplate === "template1") {
        modifyText("insertHTML", false, "<strong>Content of Template 1</strong>");
      } else if (selectedTemplate === "template2") {
        modifyText(
          "insertHTML",
          false,
          "[Specify Demand]. Query is looking for [describe].\n\nAccording to Session tool:\n\nRank 1 has [%ctr] and [stric caliber]\nRank 2 has [%ctr] and [stric caliber]\nRank 3 has [%ctr] and [stric caliber]\nRank 4 has [%ctr] and [stric caliber]\n\nAll the ranks on top 4 recall videos query is looking for, all have full text matching and content relevance to query, all satisfy query demand, 3pts."
        );
      } else if (selectedTemplate === "template3") {
        modifyText(
          "insertHTML",
          false,
          "[Demand], the query is looking for content about [user name].\nAccording to the session, Rank 1 recalled usercard with [%ctr] and [stric calliber], user recalled has a big card and fully matches with demand.\nDiff on the rank 2, but videos recalled on both sides belong to the main demand.\nTherefore, there is no better side. Score: 0."
        );
      } else {
        writingArea.innerHTML = defaultTemplate;
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
});
