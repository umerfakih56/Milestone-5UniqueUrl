var _a, _b;
// Submit handler to generate the resume
// Submit handler to generate the resume
(_a = document.getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault();
    // Retrieve form values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    // Generate the resume output dynamically
    var resumeOutput = "\n        <h2>Resume</h2>\n        <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">".concat(name, "</span></p>\n        <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n        <p><strong>Phone Number:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n        <h3>Education</h3>\n        <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n        <h3>Experience</h3>\n        <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n        <h3>Skills</h3>\n        <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n    ");
    // Insert the generated resume HTML into the resume output container
    document.getElementById("resumeOutput").innerHTML = resumeOutput;
    // Make resume editable
    makeEditable();
});
// Generate shareable link
(_b = document.getElementById("generateLink")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    var form = document.getElementById("resumeForm");
    var formData = new FormData(form); // Get form data
    var queryString = new URLSearchParams(formData).toString(); // Convert to query string
    var baseUrl = window.location.origin + window.location.pathname;
    var shareableUrl = "".concat(baseUrl, "?").concat(queryString);
    // Set the value of the shareable link input field
    var shareableLinkElement = document.getElementById("shareableLink");
    shareableLinkElement.value = shareableUrl;
    // Update sharing links
    var emailShareElement = document.getElementById("emailShare");
    var LinkedinShareElement = document.getElementById("twitterShare");
    if (emailShareElement && LinkedinShareElement) {
        emailShareElement.href = "mailto:?subject=Check out my resume&body=Here's my resume: ".concat(shareableUrl);
        LinkedinShareElement.href = "https://www.linkedin.com/in/muhammad-umer-fakih-3a5a642b8/ out my resume&url=".concat(shareableUrl);
    }
});
// Populate form from URL query parameters
function populateFormFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("name"))
        document.getElementById("name").value = urlParams.get("name");
    if (urlParams.has("email"))
        document.getElementById("email").value = urlParams.get("email");
    if (urlParams.has("phone"))
        document.getElementById("phone").value = urlParams.get("phone");
    if (urlParams.has("education"))
        document.getElementById("education").value = urlParams.get("education");
    if (urlParams.has("experience"))
        document.getElementById("experience").value = urlParams.get("experience");
    if (urlParams.has("skills"))
        document.getElementById("skills").value = urlParams.get("skills");
}
// Call function to populate form with URL parameters if they exist
populateFormFromUrl();
// Make the resume fields editable
function makeEditable() {
    var editableElements = document.querySelectorAll(".editable");
    editableElements.forEach(function (element) {
        element.addEventListener("click", function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            var inputType = "text";
            if (currentElement.id.includes("email"))
                inputType = "email";
            if (currentElement.id.includes("phone"))
                inputType = "tel";
            // Create an input field to allow editing
            var input = document.createElement("input");
            input.type = inputType;
            input.value = currentValue;
            input.classList.add("editing-input");
            // Handle blur (when the input loses focus)
            input.addEventListener("blur", function () {
                currentElement.textContent = input.value;
                currentElement.style.display = "inline";
                input.remove();
            });
            // Handle "Enter" key press to end editing
            input.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    input.blur(); // Trigger the blur event to finish editing
                }
            });
            // Replace the content with the input field for editing
            currentElement.style.display = "none";
            (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input, currentElement);
            input.focus(); // Focus on the input field immediately
        });
    });
}
