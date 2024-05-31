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
    let code = formData.get('back-half');
    const title = formData.get('title');

    if (code == null || code == '') {
        code = generateCode(8);
    }

    const shortUrl = {
        originalUrl: link,
        code: code,
        title: title
    }

    let shortedLinks = JSON.parse(localStorage.getItem('links'));

    if (shortedLinks != null) {
        shortedLinks.push(shortUrl);
    } else {
        shortedLinks = [shortUrl];
    }

    localStorage.setItem('links', JSON.stringify(shortedLinks));

    successSubmit();

    return false;
}

function successSubmit() {
    window.location.replace('list-links.html')
    /* const form = document.querySelector('#shorten-url-form');

    form.querySelector('input').value = '';

    const tooltip = document.querySelector('#tooltip');

    tooltip.querySelector('p').innerHTML = "Link curto criado com sucesso!";
    tooltip.classList.add('active');
    setTimeout(() => {
        tooltip.classList.remove('active');
    }, 2000); */
}