/* ════════════════════════════════════════════════════════════
   DOCE LAR E JARDIM — Motor da loja
   Carrinho (localStorage) · cabeçalho/rodapé · produtos · checkout WhatsApp
   ════════════════════════════════════════════════════════════ */

/* ---------- Utilidades ---------- */
const brl = (v) => "R$ " + Number(v).toFixed(2).replace(".", ",");
const pixDe = (v) => v * (1 - CONFIG.descontoPix);
const acharProduto = (id) => PRODUTOS.find(p => p.id === id);
const nomeCategoria = (c) => (c === "jardim" ? "Jardim" : "Doce Lar");

/* ---------- Ícones por tipo de produto ---------- */
const ICONES = {
  vaso: '<path d="M6 9h12l-1.5 11a1 1 0 0 1-1 .9H8.5a1 1 0 0 1-1-.9L6 9Z"/><path d="M5 9h14l-1-4H6L5 9Z"/>',
  planta: '<path d="M12 22c-5-3-8-7-8-12a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 5-3 9-8 12Z"/><path d="M12 22V8"/>',
  vela: '<path d="M9 3h6v5l3 4v9H6v-9l3-4V3Z"/><path d="M9 13h6"/>',
  ferramenta: '<path d="M4 20h16M6 20V9l6-5 6 5v11M10 20v-6h4v6"/>',
  cachepo: '<path d="M5 9h14l-1.5 11h-11L5 9Z"/><path d="M4 9h16"/>',
  regador: '<path d="M3 12h9v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6Z"/><path d="M12 13l6-4 3 2"/><path d="M5 12V9a3 3 0 0 1 3-3"/>',
  textil: '<path d="M4 5h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V5Z"/><path d="M4 13v6h16v-6"/>',
  decor: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 14l4-4 4 4 4-5 4 4"/>'
};
const iconeSVG = (tipo, tam = 88) =>
  `<svg width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.2" opacity=".9">${ICONES[tipo] || ICONES.decor}</svg>`;

/* ---------- Carrinho (localStorage) ---------- */
const CART_KEY = "dlj_carrinho";
function getCarrinho(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){ return []; } }
function setCarrinho(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); atualizarContador(); }
function addCarrinho(id, qtd = 1){
  const c = getCarrinho();
  const item = c.find(i => i.id === id);
  if(item){ item.qtd += qtd; } else { c.push({ id, qtd }); }
  setCarrinho(c);
}
function removerCarrinho(id){ setCarrinho(getCarrinho().filter(i => i.id !== id)); }
function mudarQtd(id, delta){
  const c = getCarrinho(); const item = c.find(i => i.id === id);
  if(!item) return;
  item.qtd += delta;
  if(item.qtd < 1) return removerCarrinho(id);
  setCarrinho(c);
}
function totalItens(){ return getCarrinho().reduce((s,i)=>s+i.qtd,0); }
function totalValor(){ return getCarrinho().reduce((s,i)=>{ const p=acharProduto(i.id); return s + (p? p.preco*i.qtd : 0); },0); }

function atualizarContador(){
  const n = totalItens();
  document.querySelectorAll(".cesta").forEach(el=>{
    el.textContent = n; el.style.display = n>0 ? "grid" : "none";
  });
}

/* ---------- Toast ---------- */
function toast(msg){
  let t = document.querySelector(".toast");
  if(!t){ t = document.createElement("div"); t.className="toast"; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._timer); t._timer = setTimeout(()=>t.classList.remove("show"), 2200);
}

/* ---------- Cabeçalho e rodapé compartilhados ---------- */
function montarHeader(){
  const el = document.getElementById("site-header");
  if(!el) return;
  el.outerHTML = `
  <div class="aviso">🌿 Frete grátis acima de <b>${brl(CONFIG.freteGratis)}</b> para todo o Brasil • 10% OFF no <b>Pix</b> • até 6x sem juros</div>
  <header class="topbar">
    <div class="nav">
      <a href="index.html" class="logo">
        ${logoSVG()}
        <span class="nome">${CONFIG.nomeLoja}<small>casa · decoração · jardim</small></span>
      </a>
      <ul class="menu" id="menu">
        <li><a href="produtos.html?cat=casa">Doce Lar</a></li>
        <li><a href="produtos.html?cat=jardim">Jardim</a></li>
        <li><a href="produtos.html">Todos os produtos</a></li>
        <li><a href="sobre.html">Sobre</a></li>
        <li><a href="contato.html">Contato</a></li>
      </ul>
      <div class="acoes">
        <a href="carrinho.html" class="icon-btn" aria-label="Carrinho">
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L22 8H6"/><circle cx="10" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></svg>
          <span class="cesta">0</span>
        </a>
        <button class="hamburguer" id="hamburguer" aria-label="Menu">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
  </header>`;
  const ham = document.getElementById("hamburguer");
  const menu = document.getElementById("menu");
  if(ham) ham.addEventListener("click", ()=> menu.classList.toggle("aberto"));
}

function montarFooter(){
  const el = document.getElementById("site-footer");
  if(!el) return;
  el.outerHTML = `
  <footer class="rodape">
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <span class="nome">${CONFIG.nomeLoja}</span>
          <p>Casa, decoração e jardim com curadoria brasileira. Transformamos cantinhos em lares desde o primeiro vaso.</p>
          <div class="pagamentos">
            <span class="pg-badge">Pix</span><span class="pg-badge">Visa</span><span class="pg-badge">Master</span><span class="pg-badge">Boleto</span><span class="pg-badge">Elo</span>
          </div>
        </div>
        <div><h5>Loja</h5><ul>
          <li><a href="produtos.html?cat=casa">Doce Lar</a></li>
          <li><a href="produtos.html?cat=jardim">Jardim</a></li>
          <li><a href="produtos.html">Todos os produtos</a></li>
        </ul></div>
        <div><h5>Ajuda</h5><ul>
          <li><a href="frete.html">Frete e devoluções</a></li>
          <li><a href="faq.html">Perguntas frequentes</a></li>
          <li><a href="contato.html">Fale conosco</a></li>
        </ul></div>
        <div><h5>A marca</h5><ul>
          <li><a href="sobre.html">Sobre nós</a></li>
          <li><a href="politicas.html">Políticas</a></li>
          <li><a href="https://instagram.com/${CONFIG.instagram}" target="_blank" rel="noopener">Instagram</a></li>
        </ul></div>
      </div>
      <div class="foot-base">
        <span>© ${new Date().getFullYear()} ${CONFIG.nomeLoja} · CNPJ ${CONFIG.cnpj}</span>
        <span>${CONFIG.cidade} · Feito com 🌿 no Brasil</span>
      </div>
    </div>
  </footer>`;
}

function logoSVG(){
  return `<svg class="mark" viewBox="0 0 48 48" fill="none"><path d="M24 4 7 18v24a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V18L24 4Z" fill="#c5683f"/><path d="M24 30c0-6 4-10 9-11-1 7-4 11-9 11Zm0 0c0-6-4-10-9-11 1 7 4 11 9 11Z" fill="#5a6b4a"/><path d="M24 44V28" stroke="#352f29" stroke-width="2.4" stroke-linecap="round"/></svg>`;
}

/* ---------- Card de produto ---------- */
function cardProduto(p){
  const off = p.precoDe ? `<span class="tag">${p.tag || ""}</span>` : (p.tag ? `<span class="tag">${p.tag}</span>` : "");
  return `
  <div class="prod">
    <div class="prod-img" style="background:${p.cor}" onclick="irProduto('${p.id}')">
      ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
      ${iconeSVG(p.tipo)}
    </div>
    <div class="prod-info">
      <span class="cat">${nomeCategoria(p.categoria)}</span>
      <h4 onclick="irProduto('${p.id}')">${p.nome}</h4>
      <div class="preco">
        <span class="atual">${brl(p.preco)}</span>
        <span class="pix">${brl(pixDe(p.preco))} no Pix</span>
      </div>
      <button class="add" onclick="addCarrinho('${p.id}'); toast('🛍️ Adicionado à sacola!')">Adicionar à sacola</button>
    </div>
  </div>`;
}
function irProduto(id){ location.href = "produto.html?id=" + id; }

/* ---------- Render: grade de produtos (Home/catálogo) ---------- */
function renderGrade(seletor, lista){
  const cont = document.querySelector(seletor);
  if(!cont) return;
  cont.innerHTML = lista.map(cardProduto).join("");
}

/* ---------- Página: Home ---------- */
function initHome(){
  renderGrade("#grade-destaques", PRODUTOS.filter(p=>p.destaque).slice(0,8));
}

/* ---------- Página: Catálogo ---------- */
function initCatalogo(){
  const params = new URLSearchParams(location.search);
  let catAtual = params.get("cat") || "todos";
  const titulo = document.getElementById("cat-titulo");

  function aplica(cat){
    catAtual = cat;
    const lista = cat === "todos" ? PRODUTOS : PRODUTOS.filter(p=>p.categoria===cat);
    renderGrade("#grade-catalogo", lista);
    document.querySelectorAll(".filtro").forEach(f=> f.classList.toggle("ativo", f.dataset.cat===cat));
    if(titulo) titulo.textContent = cat==="casa" ? "Doce Lar" : cat==="jardim" ? "Jardim" : "Todos os produtos";
  }
  document.querySelectorAll(".filtro").forEach(f=>{
    f.addEventListener("click", ()=> aplica(f.dataset.cat));
  });
  aplica(catAtual);
}

/* ---------- Página: Produto ---------- */
function initProduto(){
  const id = new URLSearchParams(location.search).get("id");
  const p = acharProduto(id) || PRODUTOS[0];
  const c = document.getElementById("produto-conteudo");
  if(!c) return;
  document.title = p.nome + " — " + CONFIG.nomeLoja;
  const off = p.precoDe ? `<span class="off">-${Math.round((1-p.preco/p.precoDe)*100)}%</span>` : "";
  const de = p.precoDe ? `<span class="de">De ${brl(p.precoDe)}</span>` : "";
  c.innerHTML = `
    <div class="crumb"><a href="index.html">Início</a> / <a href="produtos.html?cat=${p.categoria}">${nomeCategoria(p.categoria)}</a> / <span>${p.nome}</span></div>
    <div class="pgrid">
      <div class="galeria">
        <div class="gimg" style="background:${p.cor}">
          ${p.tag ? `<span class="ribbon">${p.tag}</span>`:""}
          ${iconeSVG(p.tipo,150)}
        </div>
      </div>
      <div class="info">
        <span class="marca-cat">${nomeCategoria(p.categoria)} · ${p.subcat}</span>
        <h1>${p.nome}</h1>
        <div class="aval"><span class="estrelas">★★★★★</span> 4,9 · 128 avaliações · <span style="color:var(--verde);font-weight:700">Em estoque</span></div>
        <div class="preco-bloco">
          ${de}
          <div class="por"><span class="v">${brl(p.preco)}</span>${off}</div>
          <div class="pix-linha"><span class="badge">PIX</span> ${brl(pixDe(p.preco))} à vista (10% OFF)</div>
          <div class="parcela">ou em até <b>6x de ${brl(p.preco/6)}</b> sem juros</div>
        </div>
        <div class="compra">
          <div class="stepper">
            <button onclick="ajustaQtd(-1)">−</button><span class="n" id="qtd">1</span><button onclick="ajustaQtd(1)">+</button>
          </div>
          <button class="btn btn-primario btn-add-g" onclick="addCarrinho('${p.id}', getQtd()); toast('🛍️ Adicionado à sacola!')">Adicionar à sacola</button>
        </div>
        <button class="btn btn-verde btn-bloco" onclick="addCarrinho('${p.id}', getQtd()); location.href='carrinho.html'">Comprar agora</button>
        <div class="descricao">
          <h3>Sobre o produto</h3>
          <p>${p.descricao}</p>
          <ul>${p.itens.map(i=>`<li>${i}</li>`).join("")}</ul>
        </div>
        <div class="garantias">
          <div class="g"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2 4 6v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6l-8-4Z"/></svg><b>Compra segura</b><span>Pagamento protegido</span></div>
          <div class="g"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 12a9 9 0 0 1-15 6.7L3 16"/></svg><b>7 dias p/ troca</b><span>Sem complicação</span></div>
          <div class="g"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg><b>Pix e 6x</b><span>Sem juros</span></div>
        </div>
      </div>
    </div>
    <section class="produtos" style="padding-top:54px">
      <div class="secao-titulo"><span class="eyebrow">Combina com o seu cantinho</span><h2>Você também vai amar</h2></div>
      <div class="prod-grid" id="grade-relacionados"></div>
    </section>`;
  const relacionados = PRODUTOS.filter(x=>x.id!==p.id && x.categoria===p.categoria).slice(0,4);
  renderGrade("#grade-relacionados", relacionados.length?relacionados:PRODUTOS.filter(x=>x.id!==p.id).slice(0,4));
}
function getQtd(){ const el=document.getElementById("qtd"); return el?parseInt(el.textContent):1; }
function ajustaQtd(d){ const el=document.getElementById("qtd"); let q=parseInt(el.textContent)+d; if(q<1)q=1; el.textContent=q; }

/* ---------- Página: Carrinho ---------- */
function initCarrinho(){
  const cont = document.getElementById("carrinho-conteudo");
  if(!cont) return;
  const c = getCarrinho();
  if(c.length===0){
    cont.innerHTML = `
      <div class="vazio">
        <div class="emoji">🛒</div>
        <h2>Sua sacola está vazia</h2>
        <p>Que tal dar uma olhada nos nossos queridinhos?</p>
        <a href="produtos.html" class="btn btn-primario">Explorar a loja</a>
      </div>`;
    return;
  }
  const total = totalValor();
  const pix = pixDe(total);
  const frete = total >= CONFIG.freteGratis ? 0 : null;
  cont.innerHTML = `
    <div class="cart-grid">
      <div class="cart-itens">
        ${c.map(i=>{ const p=acharProduto(i.id); if(!p) return ""; return `
          <div class="cart-item">
            <div class="ci-img" style="background:${p.cor}">${iconeSVG(p.tipo,40)}</div>
            <div>
              <span class="ci-cat">${nomeCategoria(p.categoria)}</span>
              <h4>${p.nome}</h4>
              <div class="ci-preco">${brl(p.preco)}</div>
            </div>
            <div class="ci-controles">
              <div class="ci-stepper">
                <button onclick="mudarQtd('${p.id}',-1); initCarrinho()">−</button>
                <span class="n">${i.qtd}</span>
                <button onclick="mudarQtd('${p.id}',1); initCarrinho()">+</button>
              </div>
              <button class="ci-remover" onclick="removerCarrinho('${p.id}'); initCarrinho()">remover</button>
            </div>
          </div>`; }).join("")}
      </div>
      <div class="resumo">
        <h3>Resumo</h3>
        <div class="linha"><span>Subtotal (${totalItens()} itens)</span><span>${brl(total)}</span></div>
        <div class="linha"><span>Frete</span><span>${frete===0?'<b style="color:var(--verde)">Grátis</b>':'calculado no checkout'}</span></div>
        <div class="pix-box">💚 No Pix: ${brl(pix)} (10% OFF)</div>
        <div class="linha total"><span>Total</span><span>${brl(total)}</span></div>
        <button class="btn btn-primario btn-bloco" style="margin-top:14px" onclick="finalizarPedido()">Finalizar pelo WhatsApp</button>
        <a href="produtos.html" class="btn btn-fantasma btn-bloco" style="margin-top:10px">Continuar comprando</a>
        ${frete!==0?`<p style="font-size:.8rem;color:var(--carvao-suave);margin-top:12px;text-align:center">Faltam ${brl(CONFIG.freteGratis-total)} para o frete grátis 🌿</p>`:""}
      </div>
    </div>`;
}

/* ---------- Checkout via WhatsApp ---------- */
function finalizarPedido(){
  const c = getCarrinho();
  if(c.length===0) return;
  let msg = `Olá, ${CONFIG.nomeLoja}! 🌿 Quero fazer um pedido:%0A%0A`;
  let total = 0;
  c.forEach(i=>{ const p=acharProduto(i.id); if(!p) return; const sub=p.preco*i.qtd; total+=sub;
    msg += `• ${i.qtd}x ${p.nome} — ${brl(sub)}%0A`;
  });
  msg += `%0ATotal: ${brl(total)}%0ANo Pix (10% OFF): ${brl(pixDe(total))}%0A%0APode confirmar a disponibilidade e o frete? 😊`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, "_blank");
}

/* ---------- FAQ accordion ---------- */
function initFAQ(){
  document.querySelectorAll(".faq-q").forEach(b=>{
    b.addEventListener("click", ()=>{
      const item=b.parentElement; const aberto=item.classList.contains("aberto");
      document.querySelectorAll(".faq-item").forEach(i=>i.classList.remove("aberto"));
      if(!aberto) item.classList.add("aberto");
    });
  });
}

/* ---------- Reveal on scroll ---------- */
function initReveal(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("on"); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", ()=>{
  montarHeader();
  montarFooter();
  atualizarContador();
  initReveal();
  const page = document.body.dataset.page;
  if(page==="home") initHome();
  if(page==="catalogo") initCatalogo();
  if(page==="produto") initProduto();
  if(page==="carrinho") initCarrinho();
  if(page==="faq") initFAQ();
  // marca link ativo no menu
  document.querySelectorAll(".menu a").forEach(a=>{
    if(a.getAttribute("href")?.split("?")[0] === location.pathname.split("/").pop()) a.classList.add("ativo");
  });
});
