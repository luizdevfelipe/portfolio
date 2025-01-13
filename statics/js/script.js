const exampleModal = document.getElementById('exampleModal');
exampleModal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;

    const projectName = button.getAttribute('data-bs-content');
    const modalTitle = exampleModal.querySelector('.modal-title');
    const modalBody = exampleModal.querySelector('.modal-body');

    switch (projectName) {
        case 'marketplace':
            var content = MarketplaceContent();
            break;
        case 'calculator':
            var content = calculatorContent();
            break;
        case 'piano':
            var content = PianoContent();
            break;
        case 'modelo':
            var content = siteModeloContent();
            break;
        case 'timberman':
            var content = TimbermanContent();
            break;
    }

    modalTitle.textContent = content.title;
    modalBody.innerHTML = `
        <p>${content.description}</p>
        <a href="${content.url}" target="_blank" rel="external" style="display: flex; align-items: center; margin-bottom: 10px; max-width: 160px;">
            <svg height="24" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="24"
                data-view-component="true" style="margin-right: 5px;">
                <path
                    d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z">
                </path>
            </svg>
            Veja no GitHub
        </a>
        <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner" id="carrosselImageDiv">
                <div class="carousel-item active">
                    <img src="${content.images[0]}" class="d-block w-100" alt="..." style="height: 100%;">
                </div>
                <div class="carousel-item">
                    <img src="${content.images[1]}" class="d-block w-100" alt="..." style="height: 100%;">
                </div>
                <div class="carousel-item">
                    <img src="${content.images[2]}" class="d-block w-100" alt="..." style="height: 100%;">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" style="background-color:rgba(0, 0, 0, 0.2)">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next" style="background-color:rgba(0, 0, 0, 0.2)">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `;
});

function TimbermanContent() {
    return {
        title: 'Timberman-on-Arduino',
        description: 'Esse foi um projeto realizado para a disciplina de Microprocessadores e Microcontroladores, onde foi utilizada a plataforma microcontrolada do Arduino para fazer a recriação do jogo virual <a href="https://store.steampowered.com/app/398710/Timberman/"target="_blank" rel="external">Timberman</a> onde o objetivo principal é quebrar o máximo de troncos possíveis sem ser atingido por eles.',
        images: ['files/timberman/schema.png', 'files/timberman/projeto.png', 'files/timberman/timberman.gif'],
        url: 'https://github.com/luizdevfelipe/timberman-on-arduino'
    }
}

function PianoContent() {
    return {
        title: 'Piano virtual com Gemini API',
        description: 'Primeiro, esse projeto era apenas um piano virtual que tocava notas conforme as teclas eram pressionadas. Depois, com um conhecimento adquirido sobre APIs, foi implementado a API Gemini para o usuário inserir um prompt que é processado pelo Gemini e resulta em um conjunto de notas que são processadas pelo sistema anterior, automaticamente. Uma versão sem a API Gemini também está disponível e pode ser acessada em <a href="https://luizdevfelipe.github.io/piano/" target="_blank" rel="external">Piano Virtual</a>',
        images: ['files/piano/piano.gif', 'files/piano/piano.png', 'files/piano/piano-site.png'],
        url: 'https://github.com/luizdevfelipe/piano'
    }
}

function MarketplaceContent() {
    return {
        title: 'Marketplace',
        description: 'Este foi meu primeiro projeto Backend, comecei em uma versão com Apache, para o servidor, e PHP puro para lidar com a lógica de negócios. Ao conhecer o Laravel, decidi migrar o projeto para ele e, com isso, adicionei novas funcionalidades como autenticação multifator, validação de formulários, envio de e-mails, paginação e visualização de dados com XHR.',
        images: ['files/marketplace/perfil.gif', 'files/marketplace/email.png', 'files/marketplace/marketplace.gif'],
        url: 'https://github.com/luizdevfelipe/marketplace'
    }
}

function calculatorContent() {
    return {
        title: 'Calculadora do Windows 10',
        description: 'O projeto de calculadora em JavaScript é famoso por ser um dos primeiros de muitos desenvolvedores, por isso esta escolha. A calculadora foi feita com HTML, CSS e JavaScript, e possui as mesmas funcionalidades da calculadora do Windows 10, como cálculos simples, cálculos com porcentagem, cálculos com raiz quadrada e cálculos com potência. Uma versão funcional pode ser acessada em <a href="https://luizdevfelipe.github.io/calc/" target="_blank" rel="external">Calculadora</a>',
        images: ['files/calc/memory.gif', 'files/calc/fixed.png', 'files/calc/calc.gif'],
        url: 'https://github.com/luizdevfelipe/calc'
    }
}

function siteModeloContent() {
    return {
        title: 'Site Modelo',
        description: 'Durante meu aprendizado de HTML e CSS decidi fazer esse projeto para consolidar os conceitos e técnicas aprendidos. Ao decorrer do projeto senti a necessidade de buscar por uma solução mais automatizada para a implementação de itens complexos, como o carrossel, por não conhecer JS até então, foi aí que descobir o Bootstrap. Esse projeto está hospedado em <a href="https://luizdevfelipe.github.io/site-modelo/src/" target="_blank" rel="external">Site Modelo</a>',
        images: ['files/modelo/contato.gif','files/modelo/location.png','files/modelo/home.gif'],
        url: ' https://github.com/luizdevfelipe/site-modelo'
    }
}