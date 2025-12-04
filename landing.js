document.addEventListener("DOMContentLoaded", function handleReadyEvent() {
  console.log("[Landing] DOMContentLoaded - initializing interactive elements.");

  const downloadButton = document.getElementById("downloadButton");
  const donateButton = document.getElementById("donateButton");
  const secondaryDownloadButton = document.getElementById(
    "downloadButtonSecondary"
  );
  const sectionAnchors = document.querySelectorAll("section");
  const modalOverlay = document.getElementById("koFiModal");
  const modalDownload = document.getElementById("modalDownload");
  const modalDismiss = document.getElementById("modalDismiss");
  const koFiFrame = document.getElementById("kofiframe");

  if (!downloadButton || !modalOverlay || !modalDownload || !modalDismiss) {
    console.error(
      "[Landing] Critical: download modal requirements are missing from DOM."
    );
    return;
  }

  const downloadUrl =
    modalDownload.getAttribute("href") || downloadButton.getAttribute("href");
  console.log("[Landing] Download URL detected:", downloadUrl);

  function attachDownloadInterceptor(buttonElement, label) {
    if (!buttonElement) {
      console.warn(
        "[Landing] Download trigger missing for label:",
        label || "unknown"
      );
      return;
    }

    buttonElement.addEventListener("click", function handleDownloadClick(
      event
    ) {
      event.preventDefault();
      console.log(
        "[Landing] Download button clicked (",
        label,
        "). Showing Ko-fi modal before release link."
      );
      showModal();
    });
  }

  attachDownloadInterceptor(downloadButton, "hero-primary");
  attachDownloadInterceptor(secondaryDownloadButton, "cta-section");

  if (donateButton) {
    donateButton.addEventListener("click", function handleDonateClick() {
      console.log("[Landing] Donate button clicked. Opening Ko-fi main page.");
    });
  } else {
    console.warn("[Landing] Donate button not found; relying on modal embed only.");
  }

  modalDownload.addEventListener("click", function handleModalDownload() {
    console.log(
      "[Landing] Modal download button clicked. User confirmed download intent."
    );
    hideModal();
  });

  modalDismiss.addEventListener("click", function handleModalDismiss() {
    console.log("[Landing] Modal dismissed via explicit button.");
    hideModal();
  });

  modalOverlay.addEventListener("click", function handleOverlayClick(event) {
    if (event.target === modalOverlay) {
      console.log("[Landing] Overlay clicked outside modal. Closing prompt.");
      hideModal();
    }
  });

  document.addEventListener("keydown", function handleEscapeKey(event) {
    if (event.key === "Escape" && modalOverlay.classList.contains("is-visible")) {
      console.log("[Landing] Escape key pressed. Closing modal.");
      hideModal();
    }
  });

  sectionAnchors.forEach(function logSection(section) {
    console.log(
      "[Landing] Section mounted:",
      section.id || "unnamed-section",
      "dataset:",
      section.dataset
    );
  });

  if (koFiFrame) {
    console.log("[Landing] Ko-fi iframe detected:", koFiFrame.src);
  } else {
    console.warn("[Landing] Ko-fi iframe missing from modal.");
  }

  function showModal() {
    modalOverlay.classList.add("is-visible");
    modalOverlay.setAttribute("aria-hidden", "false");
    console.log("[Landing] Ko-fi modal shown.");
  }

  function hideModal() {
    modalOverlay.classList.remove("is-visible");
    modalOverlay.setAttribute("aria-hidden", "true");
    console.log("[Landing] Ko-fi modal hidden.");
  }
});
