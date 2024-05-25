function generateCode(size) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';

    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars.charAt(randomIndex);
    }

    return code;
}

function shortenUrl(event) {
    event.preventDefault();

    const form = document.querySelector('#shorten-url-form');
    const formData = new FormData(form);

    const link = formData.get('link');

    const code = generateCode(8);

    const shortUrl = {
        originalUrl: link,
        code: code
    }

    localStorage.setItem(code, JSON.stringify(shortUrl));

    successSubmit();

    return false;
}

function successSubmit() {
    const form = document.querySelector('#shorten-url-form');

    form.querySelector('input').value = '';

    const tooltip = document.querySelector('#tooltip');

    tooltip.querySelector('p').innerHTML = "Link curto criado com sucesso!";
    tooltip.classList.add('active');
    setTimeout(() => {
        tooltip.classList.remove('active');
    }, 2000);
}