document.addEventListener('DOMContentLoaded', () => {
    burgerMenu();

    const nav = document.querySelector('.nav-sticky');
    if (nav) {
        const onNavScroll = () => {
            nav.classList.toggle('nav-sticky--scrolled', window.scrollY > 32);
        };
        onNavScroll();
        window.addEventListener('scroll', onNavScroll, { passive: true });
    }

    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        setupProjectModal(projectModal);
    }

    document.querySelectorAll('.projetos-section').forEach((card) => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-project');
            if (id && projectModal) {
                openProjectModal(projectModal, id, card);
            }
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    window.onresize = function () {
        burgerMenu();
    };
});

const PROJECT_CONTENT_GETTERS = {
    marketplace: MarketplaceContent,
    calculator: calculatorContent,
    piano: PianoContent,
    modelo: siteModeloContent,
    'earth-defensor': EarthDefensorContent,
    timberman: TimbermanContent,
};

function setupProjectModal(modalEl) {
    const onKeydown = (e) => {
        if (e.key === 'Escape' && modalEl.classList.contains('project-modal--open')) {
            e.preventDefault();
            closeProjectModal(modalEl);
        }
    };

    modalEl.addEventListener('click', (e) => {
        const t = e.target;
        if (t && t.closest && t.closest('[data-modal-dismiss]')) {
            closeProjectModal(modalEl);
        }
    });

    modalEl._onDocumentKeydown = onKeydown;
}

function openProjectModal(modalEl, projectId, triggerEl) {
    const getter = PROJECT_CONTENT_GETTERS[projectId];
    const content = getter ? getter() : null;
    if (!content || !content.images || !content.images.length) {
        return;
    }

    if (triggerEl) {
        modalEl._lastFocus = triggerEl;
    }

    const titleEl = modalEl.querySelector('#projectModalTitle');
    const bodyEl = modalEl.querySelector('.project-modal__body');
    if (!titleEl || !bodyEl) {
        return;
    }

    titleEl.textContent = content.title;

    const slidesHtml = content.images
        .map(
            (src, idx) => `
        <figure class="native-carousel__slide${idx === 0 ? ' native-carousel__slide--active' : ''}" data-carousel-slide role="group" aria-roledescription="slide" aria-label="${idx + 1} de ${content.images.length}">
            <img src="${src}" alt="${content.title} — imagem ${idx + 1}" loading="lazy" width="800" height="450">
        </figure>`
        )
        .join('');

    bodyEl.innerHTML = `
        <p class="project-modal__desc">${content.description}</p>
        <a class="project-modal__gh" href="${content.url}" target="_blank" rel="noopener noreferrer">
            <svg height="24" aria-hidden="true" viewBox="0 0 24 24" width="24">
                <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
            </svg>
            Veja no GitHub
        </a>
        <div class="native-carousel" data-native-carousel>
            <div class="native-carousel__viewport">
                <div class="native-carousel__track">
                    ${slidesHtml}
                </div>
            </div>
            <button type="button" class="native-carousel__btn native-carousel__btn--prev" data-carousel-prev aria-label="Imagem anterior">‹</button>
            <button type="button" class="native-carousel__btn native-carousel__btn--next" data-carousel-next aria-label="Próxima imagem">›</button>
        </div>
    `;

    const carousel = bodyEl.querySelector('[data-native-carousel]');
    if (carousel) {
        initNativeCarousel(carousel);
    }

    modalEl.removeAttribute('hidden');
    modalEl.setAttribute('aria-hidden', 'false');
    modalEl.classList.add('project-modal--open');
    document.body.classList.add('project-modal-active');

    document.addEventListener('keydown', modalEl._onDocumentKeydown);

    requestAnimationFrame(() => {
        const closeBtn = modalEl.querySelector('.project-modal__close');
        if (closeBtn) {
            closeBtn.focus();
        }
    });
}

function closeProjectModal(modalEl) {
    modalEl.classList.remove('project-modal--open');
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.setAttribute('hidden', '');
    document.body.classList.remove('project-modal-active');
    document.removeEventListener('keydown', modalEl._onDocumentKeydown);

    const prev = modalEl._lastFocus;
    if (prev && typeof prev.focus === 'function') {
        prev.focus();
    }
    modalEl._lastFocus = null;
}

function initNativeCarousel(root) {
    const slides = Array.from(root.querySelectorAll('[data-carousel-slide]'));
    const prevBtn = root.querySelector('[data-carousel-prev]');
    const nextBtn = root.querySelector('[data-carousel-next]');
    if (!slides.length || !prevBtn || !nextBtn) {
        return;
    }

    let index = 0;

    const render = () => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('native-carousel__slide--active', i === index);
        });
    };

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        render();
    });
    nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        render();
    });

    render();
}

function EarthDefensorContent() {
    return {
        title: 'Earth Defensor',
        description:
            'Earth Defensor insere o jogador em um cenário onde a Terra será atingida por meteoróides e seu objetivo é protegê-la através do controle da Lua. Nosso satélite natural servirá como escudo, colidindo e destruindo os inimigos antes que cheguem à Terra. Além de controlar a Lua, o jogador dispõe de potencializadores que influenciam as métricas do jogo, auxiliando-o no decorrer das rodadas. Cada rodada apresenta mais dificuldades, o objetivo do jogador torna-se alcançar uma rodada nunca antes jogada, ultrapassando seus limites.',
        images: ['files/earth-defensor/damage.gif', 'files/earth-defensor/menu.jpg', 'files/earth-defensor/start-game.jpg'],
        url: 'https://github.com/luizdevfelipe/earth-defensor',
    };
}

function TimbermanContent() {
    return {
        title: 'Timberman-on-Arduino',
        description:
            'Esse foi um projeto realizado para a disciplina de Microprocessadores e Microcontroladores em modelo de artigo científico, onde foi utilizada a plataforma microcontrolada Arduino para comandar dispositivos periféricos responsáveis pela captação de entradas e exibição de saídas com o intuito de fazer uma recriação do jogo virtual <a href="https://store.steampowered.com/app/398710/Timberman/" target="_blank" rel="noopener noreferrer">Timberman</a>. Nele, o objetivo principal é quebrar o máximo de troncos possíveis sem ser atingido por eles.',
        images: ['files/timberman/schema.jpg', 'files/timberman/projeto.jpg', 'files/timberman/timberman.gif'],
        url: 'https://github.com/luizdevfelipe/timberman-on-arduino',
    };
}

function PianoContent() {
    return {
        title: 'Piano virtual com Gemini API',
        description:
            'Primeiro, esse projeto era apenas um piano virtual que tocava notas conforme as teclas eram pressionadas. Depois, com o conhecimento adquirido sobre APIs, foi implementada a API Gemini, uma IA, para o usuário inserir um prompt, instrução, que é processado pelo Gemini resultando em um conjunto de notas que são processadas pelo sistema do piano, automaticamente. Uma versão sem a API Gemini também está disponível e pode ser acessada em <a href="https://luizdevfelipe.github.io/piano/" target="_blank" rel="noopener noreferrer">Piano Virtual</a>.',
        images: ['files/piano/piano.gif', 'files/piano/piano.png', 'files/piano/piano-site.png'],
        url: 'https://github.com/luizdevfelipe/piano',
    };
}

function MarketplaceContent() {
    return {
        title: 'Marketplace com Mercado Pago',
        description:
            'Este foi o meu primeiro projeto de desenvolvimento Backend, inicialmente implementado utilizando o servidor Apache e PHP puro para a manipulação da lógica de negócios. Com o avanço no aprendizado sobre o framework Laravel, o projeto foi migrado para essa tecnologia, permitindo a adição de novas funcionalidades, como autenticação multifator, validação de formulários, envio de e-mails, paginação e visualização de dados com requisições XHR, agendamento de tarefas e integração com a API do Mercado Pago.',
        images: ['files/marketplace/perfil.gif', 'files/marketplace/email.png', 'files/marketplace/marketplace.gif'],
        url: 'https://github.com/luizdevfelipe/marketplace',
    };
}

function calculatorContent() {
    return {
        title: 'Calculadora do Windows 10',
        description:
            'O projeto de calculadora em JavaScript é famoso por ser um dos primeiros de muitos desenvolvedores, por isso esta escolha. A calculadora foi feita com HTML, CSS e JavaScript, e possui as mesmas funcionalidades da calculadora do Windows 10, como cálculos simples, cálculos com porcentagem, com raiz quadrada e potência. Uma versão funcional pode ser acessada em <a href="https://luizdevfelipe.github.io/calc/" target="_blank" rel="noopener noreferrer">Calculadora</a>.',
        images: ['files/calc/memory.gif', 'files/calc/fixed.jpg', 'files/calc/calc.gif'],
        url: 'https://github.com/luizdevfelipe/calc',
    };
}

function siteModeloContent() {
    return {
        title: 'Site Modelo',
        description:
            'Com a ideia de praticar alguns conceitos e técnicas aprendidos em HTML e CSS, esse projeto foi desenvolvido. Ao decorrer do desenvolvimento do projeto houve a necessidade de buscar por uma solução mais automatizada para a implementação de itens complexos, como o carrossel, por não conhecer JS até então o Bootstrap foi escolhido para complementar o projeto. Esse projeto está hospedado em <a href="https://luizdevfelipe.github.io/site-modelo/src/" target="_blank" rel="noopener noreferrer">Site Modelo</a>.',
        images: ['files/modelo/contato.gif', 'files/modelo/location.jpg', 'files/modelo/home.gif'],
        url: 'https://github.com/luizdevfelipe/site-modelo',
    };
}

function burgerMenu() {
    if (window.innerWidth < 820 && !document.querySelector('button#menuBurguer')) {
        document.querySelectorAll('li a.linkMenu').forEach(function (link) {
            link.style = 'display: none;';
        });
        const menu = document.querySelector('ul.menu');
        menu.innerHTML +=
            "<li><button class='linkMenu' aria-label='Menu' id='menuBurguer' style='display: block;color:#000;'><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z'/></svg></button></li>";
        document.querySelector('button#menuBurguer').addEventListener('click', function () {
            document.querySelectorAll('li a.linkMenu').forEach(function (link) {
                if (link.style.display === 'block') {
                    link.style.display = 'none';
                } else {
                    link.style.display = 'block';
                }
            });
        });
    } else if (window.innerWidth >= 820) {
        document.querySelectorAll('li a.linkMenu').forEach(function (link) {
            link.style += 'display: block;';
        });
        document.querySelector('button#menuBurguer')?.remove();
    }
}

function copyEmail() {
    navigator.clipboard.writeText('luizdevfelipe@gmail.com');
    alert('E-mail copiado para a área de transferência!');
}
