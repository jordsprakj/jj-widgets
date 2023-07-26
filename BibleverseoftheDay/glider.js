// Version slider
const tabs = document.querySelectorAll('.tab');
const glider = document.querySelector('.glider');

tabs.forEach (tab => {
    tab.addEventListener('click', () => {
        const checkedRadio = tab.getAttribute('for');
        const gliderPosition = tabs.findIndex(tab => tab.getAttribute('for') === checkedRadio);

        glider.style.transform = `translateX(${gliderPosition * 100}%)`;
    })
})