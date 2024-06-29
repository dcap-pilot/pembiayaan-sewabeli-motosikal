document.addEventListener("DOMContentLoaded", function() {
    openTab(null, "choose-model"); // Display the first tab by default
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


document.addEventListener('DOMContentLoaded', function() {
    const nricInput = document.getElementById('nric-no');

    nricInput.addEventListener('input', function(event) {
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
  });
