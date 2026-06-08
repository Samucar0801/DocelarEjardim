/* ════════════════════════════════════════════════════════════
   DOCE LAR E JARDIM — Dados da loja
   👉 EDITE AQUI: produtos, WhatsApp, chave Pix e informações da loja.
   ════════════════════════════════════════════════════════════ */

const CONFIG = {
  nomeLoja: "Doce Lar e Jardim",
  // ⚠️ Troque pelo seu WhatsApp com DDI+DDD (só números). Ex: 55 11 9XXXXXXXX
  whatsapp: "5511999999999",
  // ⚠️ Sua chave Pix (e-mail, telefone, CPF/CNPJ ou aleatória)
  pixChave: "contato@docelarejardim.com.br",
  email: "contato@docelarejardim.com.br",
  instagram: "docelarejardim",
  cidade: "São Paulo · SP",
  cnpj: "00.000.000/0001-00",
  freteGratis: 199,        // valor mínimo p/ frete grátis (R$)
  descontoPix: 0.10        // 10% no Pix
};

/* Cada produto:
   id (único, sem espaços) | nome | categoria ('casa' ou 'jardim') | subcat (texto livre)
   preco | precoDe (opcional, p/ mostrar desconto) | tag (selo opcional)
   tipo (ícone: vaso, planta, vela, ferramenta, cachepo, regador, textil, decor)
   cor (gradiente do card) | destaque (true = aparece na Home) | descricao | itens[] */
const PRODUTOS = [
  {
    id: "vaso-ceramica-terra", nome: "Vaso de Cerâmica Artesanal", categoria: "casa",
    subcat: "Vasos · Coleção Terra", preco: 89.90, precoDe: 105.90, tag: "Mais vendido",
    tipo: "vaso", cor: "linear-gradient(150deg,#e7b06a,#c5683f)", destaque: true,
    descricao: "Produzido por artesãos brasileiros, traz acabamento rústico e imperfeições naturais que tornam cada peça única. Acompanha prato de apoio.",
    itens: ["Cerâmica esmaltada fosca", "Furo de drenagem + prato", "Uso interno e externo coberto", "Peça feita à mão"]
  },
  {
    id: "suculenta-echeveria", nome: "Suculenta Echeveria em Vaso", categoria: "jardim",
    subcat: "Plantas · Suculentas", preco: 34.90, tag: "Novidade",
    tipo: "planta", cor: "linear-gradient(150deg,#869b6e,#5a6b4a)", destaque: true,
    descricao: "Suculenta resistente e cheia de charme, ideal para quem está começando. Vem em vaso de cerâmica pronto para decorar.",
    itens: ["Planta viva cultivada localmente", "Vaso de cerâmica incluso", "Pouca manutenção", "Guia de cuidados na embalagem"]
  },
  {
    id: "vela-capim-limao", nome: "Vela Aromática Capim-Limão", categoria: "casa",
    subcat: "Decoração · Aromas", preco: 49.90, tipo: "vela",
    cor: "linear-gradient(150deg,#d8b48a,#9c7a52)", destaque: true,
    descricao: "Vela de cera vegetal com aroma suave de capim-limão. Queima limpa e perfuma o ambiente por até 40 horas.",
    itens: ["Cera vegetal natural", "Até 40h de queima", "Aroma capim-limão", "Pote reutilizável"]
  },
  {
    id: "kit-jardinagem", nome: "Kit Ferramentas de Jardinagem", categoria: "jardim",
    subcat: "Ferramentas", preco: 119.90, precoDe: 141.00, tag: "-15%",
    tipo: "ferramenta", cor: "linear-gradient(150deg,#7a9460,#46563a)", destaque: true,
    descricao: "Kit completo com pá, ancinho e transplantadora em aço inox com cabo de madeira. Para cuidar do seu jardim com estilo.",
    itens: ["3 ferramentas em aço inox", "Cabo de madeira tratada", "Estojo de tecido", "Resistente à ferrugem"]
  },
  {
    id: "cachepo-vime", nome: "Cachepô de Vime Natural", categoria: "casa",
    subcat: "Decoração · Cestaria", preco: 59.90, tipo: "cachepo",
    cor: "linear-gradient(150deg,#cdbfa6,#8a7560)", destaque: true,
    descricao: "Cachepô trançado à mão em fibra natural, perfeito para dar um toque aconchegante a qualquer planta de interior.",
    itens: ["Fibra natural trançada", "Forro impermeável", "Leve e resistente", "Combina com qualquer ambiente"]
  },
  {
    id: "regador-esmaltado", nome: "Regador Esmaltado Vintage", categoria: "jardim",
    subcat: "Acessórios", preco: 74.90, tipo: "regador",
    cor: "linear-gradient(150deg,#869b6e,#46563a)", destaque: true,
    descricao: "Regador de metal esmaltado com visual retrô. Funcional e decorativo ao mesmo tempo — bonito até parado na estante.",
    itens: ["Metal esmaltado", "Capacidade 1,5L", "Bico difusor removível", "Acabamento vintage"]
  },
  {
    id: "manta-trico", nome: "Manta de Tricô Aconchego", categoria: "casa",
    subcat: "Têxteis", preco: 129.90, tipo: "textil",
    cor: "linear-gradient(150deg,#e0d3bf,#b89b7a)", destaque: false,
    descricao: "Manta macia em tricô para deixar o sofá ou a cama ainda mais convidativos nas noites mais frias.",
    itens: ["Fio macio antialérgico", "1,20m x 1,50m", "Lavável à máquina", "Toque quentinho"]
  },
  {
    id: "jiboia-pendente", nome: "Jiboia em Vaso Pendente", categoria: "jardim",
    subcat: "Plantas · Pendentes", preco: 64.90, tipo: "planta",
    cor: "linear-gradient(150deg,#7a9460,#5a6b4a)", destaque: false,
    descricao: "Planta pendente clássica, purifica o ar e cresce fácil. Linda em prateleiras e cantos altos.",
    itens: ["Planta viva", "Vaso pendente incluso", "Purifica o ar", "Cresce em meia-sombra"]
  },
  {
    id: "trio-quadros", nome: "Trio de Quadros Botânicos", categoria: "casa",
    subcat: "Decoração · Parede", preco: 99.90, precoDe: 119.90, tag: "Combo",
    tipo: "decor", cor: "linear-gradient(150deg,#d8c9b6,#9c8a72)", destaque: false,
    descricao: "Conjunto de três quadros com ilustrações botânicas em moldura clara. Transforma qualquer parede em um cantinho de natureza.",
    itens: ["3 quadros 20x30cm", "Moldura em madeira clara", "Vidro protetor", "Suporte para pendurar incluso"]
  },
  {
    id: "horta-temperos", nome: "Kit Horta de Temperos", categoria: "jardim",
    subcat: "Sementes · Horta", preco: 54.90, tipo: "planta",
    cor: "linear-gradient(150deg,#9bb07a,#5a6b4a)", destaque: false,
    descricao: "Tudo para começar sua horta em casa: sementes de manjericão, salsa e cebolinha, vasos e substrato.",
    itens: ["3 variedades de sementes", "Vasos de fibra", "Substrato incluso", "Manual de plantio"]
  },
  {
    id: "luminaria-rattan", nome: "Luminária de Rattan", categoria: "casa",
    subcat: "Iluminação", preco: 149.90, tipo: "decor",
    cor: "linear-gradient(150deg,#dcc6a0,#a2825a)", destaque: false,
    descricao: "Luminária de mesa em rattan natural que cria uma luz aconchegante e desenhos lindos na parede.",
    itens: ["Cúpula em rattan", "Soquete E27", "Luz quente aconchegante", "Estilo natural/boho"]
  },
  {
    id: "vaso-autoirrigavel", nome: "Vaso Autoirrigável", categoria: "jardim",
    subcat: "Vasos · Inteligentes", preco: 44.90, tipo: "vaso",
    cor: "linear-gradient(150deg,#8aa0b0,#5a6b4a)", destaque: false,
    descricao: "Vaso com reservatório de água que mantém a planta hidratada por dias. Ideal para quem viaja ou esquece de regar.",
    itens: ["Reservatório de água", "Rega por até 10 dias", "Indicador de nível", "Vários tamanhos"]
  }
];
