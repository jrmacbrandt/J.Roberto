const fs = require('fs');
const path = require('path');

const cssToInject = `
        .breadcrumb {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
        }
        .back-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: var(--bg-card, #151515);
            border: 1px solid var(--border, rgba(255, 255, 255, 0.05));
            color: var(--text-light, #ffffff);
            transition: all 0.3s ease;
        }
        .back-button:hover {
            border-color: var(--primary, #ff0000);
            color: var(--primary, #ff0000);
        }
        .back-button svg {
            width: 18px;
            height: 18px;
        }
        .breadcrumb nav ol {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .breadcrumb nav ol li {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .breadcrumb nav ol li:not(:last-child)::after {
            content: "/";
            color: var(--text-muted, #a0a0a0);
        }
        .breadcrumb nav a {
            color: var(--text-muted, #a0a0a0);
            text-decoration: none;
            transition: color 0.3s;
        }
        .breadcrumb nav a:hover {
            color: var(--primary, #ff0000);
        }
        .breadcrumb nav span {
            color: var(--primary, #ff0000);
            font-weight: 600;
        }
`;

const getBreadcrumbHtml = (items) => {
    let listItems = '';
    items.forEach((item, index) => {
        if (index === items.length - 1) {
            listItems += `<li><span aria-current="page">${item.label}</span></li>`;
        } else {
            listItems += `<li><a href="${item.url}">${item.label}</a></li>`;
        }
    });

    return `
    <div class="breadcrumb">
        <a href="javascript:history.back()" class="back-button" aria-label="Voltar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
        </a>
        <nav aria-label="Breadcrumb">
            <ol>
                ${listItems}
            </ol>
        </nav>
    </div>
    `;
};

const pages = [
    {
        file: 'public/blog/index.html',
        items: [{label: 'Home', url: '/'}, {label: 'Blog', url: '/blog/'}]
    },
    {
        file: 'public/blog/como-criar-site-profissional-pequenas-empresas/index.html',
        items: [{label: 'Home', url: '/'}, {label: 'Blog', url: '/blog/'}, {label: 'Guia de Sites', url: ''}]
    },
    {
        file: 'public/blog/seo-para-pequenos-negocios/index.html',
        items: [{label: 'Home', url: '/'}, {label: 'Blog', url: '/blog/'}, {label: 'Guia de SEO', url: ''}]
    },
    {
        file: 'public/criacao-de-sites/index.html',
        items: [{label: 'Home', url: '/'}, {label: 'Criação de Sites', url: ''}]
    },
    {
        file: 'public/seo/index.html',
        items: [{label: 'Home', url: '/'}, {label: 'Otimização SEO', url: ''}]
    },
    {
        file: 'public/landing-pages/index.html',
        items: [{label: 'Home', url: '/'}, {label: 'Landing Pages', url: ''}]
    },
    {
        file: 'public/criacao-de-sites-rio-de-janeiro/index.html',
        items: [{label: 'Home', url: '/'}, {label: 'Criação de Sites RJ', url: ''}]
    },
    {
        file: 'public/criacao-de-sites-sao-paulo/index.html',
        items: [{label: 'Home', url: '/'}, {label: 'Criação de Sites SP', url: ''}]
    },
    {
        file: 'public/404.html',
        items: [{label: 'Home', url: '/'}, {label: 'Página não encontrada', url: ''}]
    },
    {
        file: 'public/politica-de-privacidade.html',
        items: [{label: 'Home', url: '/'}, {label: 'Política de Privacidade', url: ''}]
    },
    {
        file: 'public/termos-de-uso.html',
        items: [{label: 'Home', url: '/'}, {label: 'Termos de Uso', url: ''}]
    }
];

const workspacePath = 'C:/Users/J.ROBERTO/Downloads/J.Roberto';

pages.forEach(page => {
    const fullPath = path.join(workspacePath, page.file);
    if (!fs.existsSync(fullPath)) {
        console.log("File not found: " + fullPath);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');

    // Remove old breadcrumb if exists to prevent duplicates (rudimentary check)
    if (content.includes('<div class="breadcrumb">')) {
        console.log("Breadcrumb already exists in " + page.file + ", skipping.");
        return;
    }

    // Insert CSS before </style>
    content = content.replace('</style>', cssToInject + '</style>');

    // Insert HTML after <main... > or <div class="container">
    const breadcrumbHtml = getBreadcrumbHtml(page.items);
    
    if (content.includes('<main id="main-content" class="container">')) {
        content = content.replace('<main id="main-content" class="container">', '<main id="main-content" class="container">\n' + breadcrumbHtml);
    } else if (content.includes('<div class="container">')) {
        // e.g. for privacy policy and terms
        content = content.replace('<div class="container">', '<div class="container">\n' + breadcrumbHtml);
    } else {
        console.log("Could not find insertion point in " + page.file);
    }

    fs.writeFileSync(fullPath, content);
    console.log("Updated " + page.file);
});
