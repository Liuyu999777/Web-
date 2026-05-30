const engineConfig = {
    baidu: {
        name: '百度',
        url: 'https://www.baidu.com/s',
        param: 'wd',
        icon: 'icons/baidu.svg',
        placeholder: '搜点什么？'
    },
    google: {
        name: 'Google',
        url: 'https://www.google.com/search',
        param: 'q',
        icon: 'icons/google.svg',
        placeholder: '搜点什么？'
    },
    bing: {
        name: 'Bing',
        url: 'https://www.bing.com/search',
        param: 'q',
        icon: 'icons/bing.svg',
        placeholder: '搜点什么？'
    }
};

function setEngine(key) {
    const config = engineConfig[key];
    const form = document.getElementById('search-form');
    const input = document.getElementById('search-input');
    const icon = document.getElementById('current-engine-icon');

    form.action = config.url;
    input.name = config.param;
    input.placeholder = config.placeholder;
    icon.src = config.icon;
    icon.alt = config.name;

    localStorage.setItem('selectedEngine', key);

    document.getElementById('engine-menu').classList.add('hide');
    document.getElementById('engine-menu').classList.remove('show');
}

function toggleEngineMenu() {
    const menu = document.getElementById('engine-menu');
    menu.classList.toggle('show');
    menu.classList.toggle('hide');
}

document.addEventListener('click', function (e) {
    const menu = document.getElementById('engine-menu');
    const selector = document.querySelector('.search-engine-selector');
    if (menu.classList.contains('show') && !menu.contains(e.target) && e.target !== selector && !selector.contains(e.target)) {
        menu.classList.add('hide');
        menu.classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const savedEngine = localStorage.getItem('selectedEngine');
    if (savedEngine && engineConfig[savedEngine]) {
        applyEngine(savedEngine);
    }
});

function applyEngine(key) {
    const config = engineConfig[key];
    document.getElementById('search-form').action = config.url;
    document.getElementById('search-input').name = config.param;
    document.getElementById('search-input').placeholder = config.placeholder;
    document.getElementById('current-engine-icon').src = config.icon;
    document.getElementById('current-engine-icon').alt = config.name;
}
