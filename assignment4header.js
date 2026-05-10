/*
Author: Marcus Debose-Hubbard
Date Created: 05/09/2026
Date last edited: 05/09/2026
Version: 1.0
Description: Hide the header on scroll down and show it on scroll up.
*/


// Adds an event listener to main content to track scroll and toggle header visibility

document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    if (!header || !main) return;

    let lastScrollTop = 0;
    const threshold = 10;

    const updateMainPadding = () => {
        const height = header.getBoundingClientRect().height;
        main.style.paddingTop = `${height + 20}px`;
    };

// Initial padding update and adjust on window resize

    updateMainPadding();
    window.addEventListener('resize', updateMainPadding);

    main.addEventListener('scroll', function() {
        const currentScroll = main.scrollTop;

        if (currentScroll > lastScrollTop + threshold) {
            header.classList.add('hidden');
        } else if (currentScroll < lastScrollTop - threshold || currentScroll === 0) {
            header.classList.remove('hidden');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });
});