document.addEventListener("DOMContentLoaded", function() {
  openTab(null, "choose-model"); // Display the first tab by default

  // Validate form on submit
  document.getElementById("myForm").addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent the form from submitting immediately
      if (validateForm()) {
          this.submit(); // Submit the form if validation passes
      }
  });
});

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  // Hide all tab contents
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent[i].classList.remove("active");
  }

  // Remove the active class from all tab buttons
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab and add the active class to its button
  document.getElementById(tabName).style.display = "block";
  document.getElementById(tabName).classList.add("active");
  if (evt) {
      evt.currentTarget.className += " active";
  } else {
      // Make the first tab button active by default
      tablinks[0].className += " active";
  }
}

function moveToNextTab() {
  var currentTab = document.querySelector(".tabcontent.active");
  var nextTab = currentTab.nextElementSibling;
  if (nextTab && nextTab.classList.contains("tabcontent")) {
      currentTab.style.display = "none";
      currentTab.classList.remove("active");
      nextTab.style.display = "block";
      nextTab.classList.add("active");

      // Update tab button active class
      var currentTabIndex = Array.from(document.getElementsByClassName("tabcontent")).indexOf(currentTab);
      var tablinks = document.getElementsByClassName("tablinks");
      tablinks[currentTabIndex].classList.remove("active");
      tablinks[currentTabIndex + 1].classList.add("active");
  }
}

function moveToPreviousTab() {
  var currentTab = document.querySelector(".tabcontent.active");
  var prevTab = currentTab.previousElementSibling;
  if (prevTab && prevTab.classList.contains("tabcontent")) {
      currentTab.style.display = "none";
      currentTab.classList.remove("active");
      prevTab.style.display = "block";
      prevTab.classList.add("active");

      // Update tab button active class
      var currentTabIndex = Array.from(document.getElementsByClassName("tabcontent")).indexOf(currentTab);
      var tablinks = document.getElementsByClassName("tablinks");
      tablinks[currentTabIndex].classList.remove("active");
      tablinks[currentTabIndex - 1].classList.add("active");
  }
}

function validateForm() {
  let valid = true;
  let errorMessage = "Please fill out the following fields correctly:\n";
  let firstInvalidElement = null;

  // Select all required inputs
  const requiredInputs = document.querySelectorAll("input[required], select[required], textarea[required]");
  
  requiredInputs.forEach(input => {
      if (!input.value.trim()) {
          valid = false;
          if (!firstInvalidElement) {
              firstInvalidElement = input;
          }
          errorMessage += `- ${input.name} is required\n`;
          input.classList.add("error"); // Add an error class to highlight the field
      } else {
          input.classList.remove("error"); // Remove error class if the field is valid
      }
  });

  if (!valid) {
      showModal(errorMessage); // Show modal with error message
      if (firstInvalidElement) {
          // Ensure the tab containing the first invalid element is visible
          const tabContent = firstInvalidElement.closest(".tabcontent");
          if (tabContent) {
              const tabId = tabContent.id;
              openTab(null, tabId);
          }
          firstInvalidElement.focus(); // Focus on the first invalid element
      }
  }

  return valid;
}

function showModal(message) {
  var modal = document.getElementById("errorModal");
  var errorMessage = document.getElementById("errorMessage");
  var span = document.getElementsByClassName("close")[0];

  errorMessage.textContent = message;
  modal.style.display = "block";

  span.onclick = function() {
      modal.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
}

// NRIC formatting
document.addEventListener('DOMContentLoaded', function() {
  function formatNric(inputElement) {
    inputElement.addEventListener('input', function(event) {
      let value = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
      if (value.length > 12) {
        value = value.slice(0, 12); // Limit to 12 characters
      }

      // Add dashes at appropriate positions
      if (value.length > 6) {
        value = value.slice(0, 6) + '-' + value.slice(6);
      }
      if (value.length > 8) {
        value = value.slice(0, 9) + '-' + value.slice(9);
      }

      event.target.value = value;
    });
  }

  // Format NRIC for both input fields
  const nricInputs = document.querySelectorAll('#nric-no, #ref-1-nric-no');
  nricInputs.forEach(formatNric);
});

// Ensure mobile number fields have a max length of 10 digits
document.addEventListener('DOMContentLoaded', function() {
  const mobileNumberInputs = document.querySelectorAll('#mobile-number, #ref-1-mobile-number, #ref-2-mobile-number');
  mobileNumberInputs.forEach(input => {
      input.addEventListener('input', function(event) {
          let value = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
          if (value.length > 10) {
              value = value.slice(0, 10); // Limit to 10 characters
          }
          event.target.value = value;
      });
  });
});
