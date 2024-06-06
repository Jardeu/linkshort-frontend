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
    window.location.replace('list-links.html');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const tooltip = document.querySelector('#tooltip');

        tooltip.querySelector('p').innerHTML = "URL copiada para a área de transferência.";
        tooltip.classList.add('active');
        setTimeout(() => {
            tooltip.classList.remove('active');
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar para a área de transferência', err);
    });
}

window.addEventListener('load', () => {
    let linkList = JSON.parse(localStorage.getItem('links'));

    const listElement = document.querySelector('.links-list');

    linkList.forEach(link => {

        let title = "";

        if (link.title) {
            title = link.title;
        } else {
            title = window.location.hostname + "/" + link.code;
        }

        const ListItemHtml = `
            <li>
                <p>${title}</p>
                <div>
                    <a onclick="copyToClipboard('${window.location.hostname + "/" + link.code}')">
                        <i class="fa-regular fa-copy"></i>
                    </a>
                    <a href="${link.originalUrl}" target"_blank">
                        <i class="fa fa-share"></i>
                    </a>
                </div>
            </li>
        `;

        listElement.innerHTML += ListItemHtml;
    });
});