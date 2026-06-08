# Doce Lar e Jardim — Site (HTML / CSS / JS)

Loja online estática (sem backend) de decoração para casa e jardim.
Carrinho funcional salvo no navegador e finalização de pedido via **WhatsApp + Pix**.

## 📁 Estrutura

```
index.html        → Home
produtos.html     → Catálogo (filtros: Todos / Doce Lar / Jardim)
produto.html      → Página de produto (abre via ?id=)
carrinho.html     → Sacola + checkout WhatsApp
sobre.html        → Sobre a marca
contato.html      → Contato
faq.html          → Perguntas frequentes
frete.html        → Frete e devoluções
politicas.html    → Políticas (LGPD)
css/estilo.css    → Todo o visual (paleta, fontes, componentes)
js/dados.js       → ⭐ PRODUTOS + CONFIG (edite aqui)
js/loja.js        → Carrinho, cabeçalho/rodapé, render, checkout
```

## ✏️ Antes de publicar — edite `js/dados.js`

1. **WhatsApp**: troque `whatsapp: "5511999999999"` pelo número real (DDI + DDD, só números).
2. **Pix**: troque `pixChave` pela sua chave.
3. **Produtos**: adicione/edite itens no array `PRODUTOS`.
   - Para usar **fotos reais**, suba as imagens e troque o card pelo seu `<img>`
     (hoje cada produto usa um fundo colorido + ícone como placeholder).

## 🚀 Publicar no GitHub Pages

1. Crie um repositório e suba todos os arquivos (mantendo as pastas `css/` e `js/`).
2. No repositório: **Settings → Pages → Branch: main / root → Save**.
3. Em alguns minutos o site fica no ar em `https://SEU-USUARIO.github.io/SEU-REPO/`.

## 🚀 Publicar na Vercel

1. Suba o projeto no GitHub.
2. Em vercel.com → **Add New → Project** → importe o repositório.
3. Framework: **Other** (é site estático). Clique em **Deploy**. Pronto.

## 🛠️ Levar para o Wix Studio (opcional)

Use este projeto como referência fiel: recrie o layout no Wix Studio
seguindo as cores (`:root` do `estilo.css`), as fontes (Fraunces + Mulish)
e a estrutura de cada página. As interações (carrinho, filtros) podem ser
refeitas com o Wix Stores nativo + código Velo.

## 💡 Observações

- Os links entre páginas usam caminhos relativos (`produtos.html`), então
  funciona em qualquer hospedagem sem configuração extra.
- O carrinho usa `localStorage` (fica salvo no navegador do cliente).
- Para um checkout com pagamento automático (cartão/Pix online), seria
  necessário um backend ou uma plataforma de e-commerce — hoje o fluxo é
  pedido via WhatsApp, ideal para começar sem custo.
