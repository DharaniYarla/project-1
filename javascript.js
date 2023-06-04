const boxes = document.querySelectorAll(".box"); // Get the boxes and draggable items
const draggableItems = document.querySelectorAll(".draggable-item");
const message = document.getElementById("message");

draggableItems.forEach((item) => {
  item.addEventListener("dragstart", dragStart); // Add event listeners for drag events
  item.addEventListener("dragend", dragEnd);
});

boxes.forEach((box) => {
  box.addEventListener("dragover", dragOver); // Add event listeners for drop events
  box.addEventListener("drop", drop);
});

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); // Drag start event handler
  event.target.classList.add("dragging");
}

function dragEnd(event) {
  event.target.classList.remove("dragging"); // Drag end event handler
}

function dragOver(event) {
  event.preventDefault();
} // Drag over event handler

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text"); // Drop event handler
  const targetBox = event.target.closest(".box");

  if (targetBox) {
    const draggedText = document.getElementById(data);
    const sourceBox = draggedText.closest(".box");

    if (sourceBox !== targetBox) {
      // Check if there is an existing text in the target box
      const existingText = targetBox.querySelector(".draggable-item");

      if (existingText) {
        // Move the existing text to the source box
        sourceBox.appendChild(existingText);
      }

      targetBox.appendChild(draggedText);
    }
  }

  checkOrder();
}

// Check the order of the items
function checkOrder() {
  let isAllBoxesFilled = true;
  let jsBoxItem, htmlBoxItem, cssBoxItem;

  boxes.forEach((box) => {
    const boxItem = box.querySelector(".draggable-item");
    if (!boxItem) {
      isAllBoxesFilled = false;
    } else {
      if (box.id === "js-box") {
        jsBoxItem = boxItem;
      } else if (box.id === "html-box") {
        htmlBoxItem = boxItem;
      } else if (box.id === "css-box") {
        cssBoxItem = boxItem;
      }
    }
  });

  const jsBox = document.getElementById("js-box");
  const htmlBox = document.getElementById("html-box");
  const cssBox = document.getElementById("css-box");

  if (isAllBoxesFilled) {
    if (
      jsBoxItem.innerText === "HTML" &&
      htmlBoxItem.innerText === "CSS" &&
      cssBoxItem.innerText === "JavaScript"
    ) {
      jsBox.style.backgroundColor = "rgb(238, 77, 46)";
      htmlBox.style.backgroundColor = "rgb(21, 114, 182)";
      cssBox.style.backgroundColor = "rgb(240, 219, 79)";

      message.textContent =
        "Yes👏, this is the correct way to learn the skills.🎊😊";
    } else {
      jsBox.style.backgroundColor = "";
      htmlBox.style.backgroundColor = "";
      cssBox.style.backgroundColor = "";

      message.textContent = "No😔, it's the wrong way to learn.👎";
    }
  }
}
