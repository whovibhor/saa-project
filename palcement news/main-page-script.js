function shareCard(icon) {
    // Find the closest card to the clicked icon
    const card = icon.closest(".news-card");
  
    // Get content from the card
    const title = card.querySelector("h3").innerText;
    const description = card.querySelector("p:not(.date)").innerText;
    const imageUrl = card.querySelector("img").src; // Optional if you want to share the image
    const url = window.location.href; // Use the current page URL, or replace with the "Read More" link
  
    // Use the Web Share API to share the card's content
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: `${description}\n\nRead more at:`,
          url: url,
        })
        .then(() => console.log("Card shared successfully!"))
        .catch((error) => console.error("Error sharing card:", error));
    } else {
      alert("Sharing is not supported in this browser.");
    }
  }

  const toTop = document.querySelector(".to-top");

  window.addEventListener("scroll", () => {
      if(window.pageYOffset > 100) {
          toTop.classList.add("active");
      } else {
          toTop.classList.remove("active");
      }
  })

 