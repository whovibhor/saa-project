 //for Header

 window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});



let calcScrollValue = () => {
    let scrollprogress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let calcScrollValue = Math.round((pos * 100) / calcHeight);
    if(pos > 100){
        scrollprogress.style.display = "grid";
    }
    else{
        scrollprogress.style.display = "none";
    }

    scrollprogress.addEventListener("click",() => {
        document.documentElement.scrollTop = 0;
    })
    scrollprogress.style.background = 'conic-gradient ( #ff4d4d ${scrollValue}%,  #d7d7d7 ${scrollValue}%)';
};


window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

function loadContent(url) {
    const iframe = document.getElementById('contentFrame'); // Get the iframe element
    iframe.src = url; // Set the iframe's src attribute to the provided URL
}

// Load the first link by default
document.addEventListener('DOMContentLoaded', () => {
    const firstLink = document.querySelector('.horizontalMenu_Section .menu li a');
    if (firstLink) {
        loadContent(firstLink.getAttribute('href')); // Load the first link's content
    }
});

// Select all list items in the horizontal menu
document.querySelectorAll('.horizontalMenu_Section .menu li a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault(); // Prevent default navigation behavior
        
        const iframe = document.getElementById('contentFrame'); // Get the iframe element
        const targetUrl = event.target.getAttribute('href'); // Get the link's href attribute

        iframe.src = targetUrl; // Load the target URL into the iframe
    });
});


