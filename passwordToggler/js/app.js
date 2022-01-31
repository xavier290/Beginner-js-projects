const toggle = document.getElementById('toggler')
const password = document.getElementById('password')

toggle.addEventListener('click', function() {
    const type = password.getAttribute('type') === 'text' ? 'password' : 'text'
    password.setAttribute('type', type);

    this.classList.toggle('bi-eye');
})

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault();
})