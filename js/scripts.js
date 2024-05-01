/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

document.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // LeetCode count animation
    let leetCodeCards = document.querySelectorAll("#leetcode .num");
    let interval = 2500;
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent != entry.target.getAttribute("data-val")) {
                let startValue = 0;
                let endValue = parseInt(entry.target.getAttribute("data-val"));
                let duration = Math.floor(interval / endValue);

                let counter = setInterval(function() {
                    startValue += 2;
                    entry.target.textContent = startValue;
                    if(startValue >= endValue) {
                        entry.target.textContent = endValue;
                        clearInterval(counter);
                    }
                }, duration);
            }
        })
    })

    leetCodeCards.forEach(card => {
        observer.observe(card);
    });


    // Contact -> Copy e-mail to clipboard
    const email = document.getElementById("copy-to-clipboard");
    email.onclick = (e) => {
        navigator.clipboard.writeText("joaovitorforgearinibeltrame@gmail.com");

        const clipboardIcon = document.getElementById("clipboard-icon");

        clipboardIcon.innerHTML = "<i class=\"bi bi-clipboard-check\"></i>"

        setTimeout(() => {
            clipboardIcon.innerHTML = "<i class=\"bi bi-clipboard\"></i>"
        }, 3000);
    }

});