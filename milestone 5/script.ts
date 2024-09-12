// Submit handler to generate the resume
document.getElementById("resumeForm")?.addEventListener("submit", function (event: Event) {
    event.preventDefault();

    // Retrieve form values
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

    // Generate the resume output dynamically
    const resumeOutput = `
        <h2>Resume</h2>
        <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
        <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
        <h3>Education</h3>
        <p id="edit-education" class="editable">${education}</p>
        <h3>Experience</h3>
        <p id="edit-experience" class="editable">${experience}</p>
        <h3>Skills</h3>
        <p id="edit-skills" class="editable">${skills}</p>
    `;

    // Insert the generated resume HTML into the resume output container
    document.getElementById("resumeOutput")!.innerHTML = resumeOutput;

    // Make resume editable
    makeEditable();
});

// Generate shareable link
document.getElementById("generateLink")?.addEventListener("click", function () {
    const formData = new URLSearchParams(new FormData(document.getElementById("resumeForm") as HTMLFormElement)).toString();
    const baseUrl = window.location.origin + window.location.pathname;
    const shareableUrl = `${baseUrl}?${formData}`;

    // Set the value of the shareable link input field
    (document.getElementById("shareableLink") as HTMLInputElement).value = shareableUrl;

    // Update sharing links
    document.getElementById("emailShare")!.href = `mailto:https://mail.google.com/mail/u/0/?pli=1#inbox ${shareableUrl}`;
    document.getElementById("twitterShare")!.href = `https://twitter.com/intent/tweet?text=Check out my resume&url=${shareableUrl}`;
});

// Populate form from URL query parameters
function populateFormFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("name")) (document.getElementById("name") as HTMLInputElement).value = urlParams.get("name")!;
    if (urlParams.has("email")) (document.getElementById("email") as HTMLInputElement).value = urlParams.get("email")!;
    if (urlParams.has("phone")) (document.getElementById("phone") as HTMLInputElement).value = urlParams.get("phone")!;
    if (urlParams.has("education")) (document.getElementById("education") as HTMLTextAreaElement).value = urlParams.get("education")!;
    if (urlParams.has("experience")) (document.getElementById("experience") as HTMLTextAreaElement).value = urlParams.get("experience")!;
    if (urlParams.has("skills")) (document.getElementById("skills") as HTMLTextAreaElement).value = urlParams.get("skills")!;
}

// Call function to populate form with URL parameters if they exist
populateFormFromUrl();

// Make the resume fields editable
function makeEditable() {
    const editableElements = document.querySelectorAll(".editable");

    editableElements.forEach(element => {
        element.addEventListener("click", function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            let inputType: string = "text";
            if (currentElement.id.includes("email")) inputType = "email";
            if (currentElement.id.includes("phone")) inputType = "tel";

            // Create an input field to allow editing
            const input = document.createElement("input");
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
            currentElement.parentNode?.insertBefore(input, currentElement);
            input.focus(); // Focus on the input field immediately
        });
    });
}
