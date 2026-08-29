import { Part } from './types';

// Função para gerar um preço aleatório realista para preencher o catálogo
const getPrice = (min: number, max: number) => parseFloat((Math.random() * (max - min) + min).toFixed(2));

// Matriz bruta extraída de TODAS as 12 páginas da planilha PDF 
// Formato: [Item, Descrição/Equivalência, Categoria, Adaptação/Motivo, Código, Origem, Link]
const rawData: string[][] = [
  // --- PÁGINA 1: ACESSÓRIOS E DIANTEIRA ---
  ["Banco", "Banco antiderrapante para Kansas 150", "ACESSÓRIOS", "Nenhuma", "N/A", "Site do Fabricante", "http://gilbertobancos.com.br"],
  ["Banco", "Banco com botões para Kansas 150", "ACESSÓRIOS", "Nenhuma", "N/A", "Site do Fabricante", "http://gilbertobancos.com.br"],
  ["Banco", "Banco Erê Kansas 150", "ACESSÓRIOS", "Nenhuma", "N/A", "Site do Fabricante", "http://www.erebancos.com.br"],
  ["Banco", "Mirage 150", "ACESSÓRIOS", "Maior e encaixes não batem", "N/A", "Ricardo Aragão", ""],
  ["Bolha", "Motovisor Código: 623", "ACESSÓRIOS", "Nenhuma", "623", "Site do Fabricante", "http://www.motovisor.com.br/"],
  ["Bolha", "Roncar Para-brisa modelo BMW 7/8", "ACESSÓRIOS", "Nenhuma", "N/A", "Site do Fabricante", ""],
  ["Bolha", "Roncar Para-brisa modelo Harley-Davidson 7/8", "ACESSÓRIOS", "Nenhuma", "N/A", "Site do Fabricante", ""],
  ["Comando avançado", "Comando Avançado Dalavas", "ACESSÓRIOS", "Nenhuma", "N/A", "Site do Fabricante", ""],
  ["Farol Auxiliar", "Jogo de Farol Auxiliar s/ abas Roncar", "ACESSÓRIOS", "Nenhuma", "N/A", "Site do Fabricante", ""],
  ["Farol Auxiliar", "Suporte com Faróis Auxiliares Dalavas", "ACESSÓRIOS", "Nenhuma", "N/A", "Site do Fabricante", ""],
  ["Mola pedal descanso", "Mola Cavalete Lateral Patriarca", "ACESSÓRIOS", "Nenhuma", "N/A", "Patriarca", ""],
  ["Mola pedal descanso", "Strada / Titan", "ACESSÓRIOS", "Nenhuma", "N/A", "Honda", ""],
  ["Pedal (Passageiro)", "CBX200 / CBX250 Twister", "ACESSÓRIOS", "Nenhuma", "N/A", "Honda", ""],
  ["Pedal (Passageiro)", "Pedal do passageiro CG", "ACESSÓRIOS", "Nenhuma", "N/A", "Honda", ""],
  ["Pedaleira (Piloto)", "Fazer 250 / Twister / Strada", "ACESSÓRIOS", "Precisam ser montadas invertidas", "N/A", "Sérgio Leite", ""],
  ["Pesos de Guidon", "Burgman (com buchas)", "ACESSÓRIOS", "Nenhuma", "N/A", "L340 Vinícius", ""],
  ["Pesos de Guidon", "CROMADO Circuit / GMX / Roncar", "ACESSÓRIOS", "Nenhuma", "N/A", "Circuit / GMX", ""],
  ["Protetor de Motor", "6065 - Protetor oval Cromado", "ACESSÓRIOS", "Nenhuma", "6065", "Site do Fabricante", ""],
  ["Protetor de Motor", "Dalavas / Wild Style / Hot Shoe", "ACESSÓRIOS", "Nenhuma", "N/A", "Diversos", ""],
  ["Sissy bar", "Dalavas / Roncar / Caramori", "ACESSÓRIOS", "Nenhuma", "N/A", "Diversos", ""],
  ["Suporte alforges", "V2 Custom / Dalavas", "ACESSÓRIOS", "Nenhuma", "N/A", "Diversos", ""],
  ["Retentor eixo de câmbio", "Vedamotors LOC L-3-5 OP", "CAMBIO", "Nenhuma", "31889901001", "Zanchetta", ""],
  ["Bengala (Cilindro)", "Honda XLR 125 (alonga 10cm)", "DIANTEIRA", "Pode ser necessário trocar mola e espaçador", "51410-kfc-901", "Desconhecida", ""],
  ["Bengala (Cilindro)", "XR200 (alonga 10cm) / Broz (maior)", "DIANTEIRA", "Nenhuma", "N/A", "Honda", ""],
  ["Caixa de Direção", "Titan/CBX-200 Strada / CG 150", "DIANTEIRA", "Nenhuma", "N/A", "Danidrea", ""],
  ["Espelho Retrovisor", "Intruder 125 2012", "DIANTEIRA", "Nenhuma", "L340", "Vinícius", ""],
  ["Espelho Retrovisor", "Mirage 150 / XM-B 01926", "DIANTEIRA", "Nenhuma", "L340", "Kasinski / VW", ""],
  ["Farol", "Intruder 125 / MIRAGE 150", "DIANTEIRA", "Precisa trocar suporte e borrachas", "N/A", "Teko Martins", ""],
  ["Flexível de Freio", "Tornado / Bros / Intruder / Sahara", "DIANTEIRA", "Embarrigado se for usar seca", "L340", "Diversos", ""],

  // --- PÁGINAS 2 E 3: DIANTEIRA E OPTICA ---
  ["Flexível de Freio", "XR 200 / XT 600 / XTZ", "DIANTEIRA", "1,30 m bom para ape hanger", "N/A", "Ícaro Mendonça", ""],
  ["Conjunto óptico", "Intruder 125", "DIANTEIRA", "Precisa limar aprox. 1mm. Vidro mais pesado", "35121H442A0H000", "L340", ""],
  ["Conjunto óptico", "VW Brasília / CG 82 / Yes 125", "DIANTEIRA", "Vidro mais pesado, sem vigia", "N/A", "L340", ""],
  ["Guarda pó - Bengala", "Titan 150 / Bros 125", "DIANTEIRA", "Nenhuma", "91254-GAA-003", "L340", ""],
  ["Guidon", "CB 400 II / Dayun / Rx180", "DIANTEIRA", "Substituir flexível por um maior", "N/A", "Diversos", ""],
  ["Manete embreagem", "CG Titan / Twister / Speed150", "DIANTEIRA", "Substituir manicoto", "N/A", "L340", ""],
  ["Manicoto Direito", "CG Titan150 / CBX 150", "DIANTEIRA", "Pintar ou polir", "N/A", "L340", ""],
  ["Manicoto Esquerdo", "Honda CG 125/150", "DIANTEIRA", "Ângulo aberto, atentar ao punho de luz", "N/A", "L340", ""],
  ["Parafuso mesa", "Fazer 250 / Paralamas Titan", "DIANTEIRA", "Nenhuma", "N/A", "L340", ""],
  ["Paralamas", "CG 82 / 86 / 88 / Intruder / Mirage", "DIANTEIRA", "Colocar metal por dentro (Intruder)", "N/A", "Diversos", ""],
  ["Pastilha de freio", "Fischer Semi-Metálica", "DIANTEIRA", "Nenhuma", "FJ940SM", "Fabricante", "http://leaoesuamoto.blogspot.com.br/2011/08/pastilhas-de-freio.html"],
  ["Pinça do freio", "Intruder 125 / XTZ / Yes 125", "DIANTEIRA", "Precisa manter suporte original", "N/A", "Thiago Silva / Teko", ""],
  ["Pneu Dianteiro", "Michellin Sporty Pilot 90/90", "DIANTEIRA", "Sem adaptações", "N/A", "Michellin", ""],
  ["Retentor bengala", "CG 150 Sport / Corteco", "DIANTEIRA", "Dimensões: 27x39x10,5mm", "414N", "Corteco", ""],
  ["Roda", "Intruder 125 2008 / Mirage 150", "DIANTEIRA", "Trocar disco / Rolamentos 6301", "N/A", "L340 Vinícius", ""],
  ["Rolamento roda", "Código universal: 6302", "DIANTEIRA", "Utilizar SKF, Nachi, Fag", "6302", "L340", ""],
  
  // --- PÁGINAS 4, 5, 6 E 7: ELÉTRICA ---
  ["Bateria", "Route YTX9-BS 12V 8Ah", "ELÉTRICA", "Nenhuma", "YTX9-BS", "Route", "http://www.bateriasroute.com.br"],
  ["Bateria", "ERBS Mod. 9 BRD", "ELÉTRICA", "Nenhuma", "901", "ERBS", "http://www.erbs.com.br/"],
  ["Bateria", "Konder KTX9L-BS", "ELÉTRICA", "Nenhuma", "KTX9L-BS", "Konder", ""],
  ["Bateria", "AJAX AJ 9 TC BS / Naja NJ 12-9", "ELÉTRICA", "Nenhuma", "128B076F4E", "Ajax", ""],
  ["Bobina de Ignição", "CG Titan 03 ED / Speed", "ELÉTRICA", "Nenhuma", "90202520", "Magnetron", ""],
  ["Buzina", "Fusca / Broz / Twister", "ELÉTRICA", "Fica muito grande", "90265700", "Foka / Alex", ""],
  ["Cachimbo de vela", "CB400 / CG 150", "ELÉTRICA", "Nenhuma", "90250840", "NGK", ""],
  ["CDI", "Servitec Modelo Original Digital", "ELÉTRICA", "Nenhuma", "50.146.10", "Servitec", ""],
  ["CDI", "Magnetron CG/Titan / Mirage", "ELÉTRICA", "Nenhuma", "90270920", "Magnetron", ""],
  ["Chave Ignição", "Sundown neo / Duas Barras", "ELÉTRICA", "Nenhuma", "N/A", "Dafra", ""],
  ["Chicote principal", "Magnetron", "ELÉTRICA", "Nenhuma", "90287030", "L340 Vinícius", ""],
  ["Coxim do Pisca", "CG TITAN 2000", "ELÉTRICA", "Entortar local do parafuso", "N/A", "L340 Vinícius", ""],
  ["Interruptor Freio", "XR 200 / CG125 / Twister", "ELÉTRICA", "Preservar rabicho original", "35340-MA5-671", "Zan", ""],
  ["Motor Arranque", "Speed 150 / Partida Dafra", "ELÉTRICA", "Mesmo da Kansas", "90205710", "Magnetron", ""],
  ["Piscas", "Intruder 125 / v-blade", "ELÉTRICA", "Lâmpadas 16w podem comprometer relê", "N/A", "ZongShen", ""],
  ["Punho luz esquerdo", "Honda Twister até 2005", "ELÉTRICA", "Substituir cabo afogador, rearranjar fios", "N/A", "L340 Vinícius", ""],
  ["Regulador de tensão", "Tornado/Twister", "ELÉTRICA", "Manter plug do regulador original", "50.144.10", "Peterpolis", ""],
  ["Relê de Partida", "Twister até 2005 / CG", "ELÉTRICA", "Inverter polos (CG)", "N/A", "Paulo Torres", ""],
  ["Relê de pisca", "VW Fusca/ Gol até G2", "ELÉTRICA", "São 3 polos invertidos", "N/A", "Karlos Mesquita", ""],

  // --- PÁGINAS 8 E 9: MECÂNICA (TRANSMISSÃO E MOTOR) ---
  ["Bucha da coroa", "Bucha Nylon CG Titan Moto Bor", "MECÂNICA", "Colocar meia bucha de nylon (8mm)", "MB-001", "Moto Bor / L340", ""],
  ["Bucha da coroa", "Bucha balança Fiat Uno", "MECÂNICA", "Esmerilhar metade do anel", "N/A", "Diversos", ""],
  ["Bucha da coroa", "Fazer sob medida TECNIL", "MECÂNICA", "Nenhuma", "N/A", "L340 Vinícius", ""],
  ["Cabeçote / Bujão", "Titan 99 / Yes / Intruder", "MECÂNICA", "Medidas diferentes no bujão", "N/A", "L340", ""],
  ["Cabo Acelerador", "Strada / Titan / XL 125", "MECÂNICA", "XL 125 fica sem curva de metal", "D02531700000SI", "Grua/Scherer", ""],
  ["Cabo de Embreagem", "Yamaha Jog / Falcon / Bros", "MECÂNICA", "Usado com quebra galho", "D02531690000SI", "Scherer / L340", "http://leaoesuamoto.blogspot.com.br"],
  ["Cabo velocímetro", "CBX-750F / Sahara / Shadow", "MECÂNICA", "Corte a ponta do conduíte (Sahara)", "N/A", "Diversos", ""],
  ["Carburador", "PZ30 - Ideal (Motor Strada)", "MECÂNICA", "Nenhuma", "PZ30", "Ricardo Aragão", ""],
  ["Carburador", "Honda CG 125 / Titan 150", "MECÂNICA", "Trocar cabo do acelerador por Y", "N/A", "Honda", ""],
  ["Coroa", "Power Racing 42 T", "MECÂNICA", "Igual a original", "N/A", "Power Racing", ""],
  ["Coroa", "CG 150 até 99 (38 dentes)", "MECÂNICA", "Nenhuma", "N/A", "Zanchetta", ""],
  ["Corrente", "VAZ - 428h120", "MECÂNICA", "Nenhuma", "428h120", "VAZ", ""],
  ["Corrente", "Brandy / KMC / DID", "MECÂNICA", "Nenhuma", "428UO", "Brandy / KMC", ""],
  ["Discos embreagem", "Vedamotors S410210250003", "MECÂNICA", "Nenhuma", "S410210250003", "Vedamotors", ""],
  ["Engrenagens", "Titan 150 / Fan 125", "MECÂNICA", "Manter eixo primário", "23426-439-320", "Dan Floripa", ""],
  ["Junta (jogo)", "Dafra Kansas Vedamotors", "MECÂNICA", "Nenhuma", "N/A", "Vedamotors", ""],
  ["Kit Reparo Carburador", "CG Ecco", "MECÂNICA", "Aproveite os vedantes, desc. giclê", "N/A", "L340", ""],
  ["Mola Pedal Freio", "Kansas-150 Patriarca", "MECÂNICA", "Nenhuma", "N/A", "Patriarca", ""],
  ["Kit Pistão STD", "Vedamotors / Athena", "MECÂNICA", "Nenhuma", "S4C062000020", "Vedamotors", ""],
  ["Pinhão 16 dentes", "VAZ HB03.216 / RIFFEL", "MECÂNICA", "Nenhuma", "HB03.216", "VAZ/Riffel", ""],
  ["Registro combustível", "Honda CB 400/450 / Agrale", "MECÂNICA", "Rosca R 18x1.0", "N/A", "Honda / Agrale", ""],
  ["Relação", "CG 150 VAZ / Riffel", "MECÂNICA", "Acrescentar 5 elos na corrente", "91047", "VAZ/Riffel", ""],
  ["Válvulas (Adm/Esc)", "CG83 Metal Leve", "MECÂNICA", "Nenhuma", "VE0510045", "Metal Leve", ""],
  
  // --- PÁGINAS 10 E 11: TRASEIRA ---
  ["Válvula Pair", "Suzuki Intruder 125", "MECÂNICA", "Nenhuma", "N/A", "L340 Vinícius", ""],
  ["Vareta Nível Óleo", "Biz / Strada / Titan", "MECÂNICA", "Serve para fechar, não medir (curta)", "N/A", "Diversos", ""],
  ["Vela", "Magnetron D8C / NGK DR8EIX", "MECÂNICA", "Nenhuma", "9022211", "Magnetron/NGK", ""],
  ["Amortecedor", "Strada (COFAP) 5cm +alto", "TRASEIRA", "Menos problema com garupa", "N/A", "COFAP", ""],
  ["Amortecedor", "Intruder 125 / Mirage 250", "TRASEIRA", "Ficou mais alto que o original", "N/A", "L340 / Gerson", ""],
  ["Coxim do escape", "Borracha radiador Mercedez", "TRASEIRA", "Cortar ao meio, mais largo", "N/A", "Edifrans", ""],
  ["Cubo traseiro", "TITAN 150 (aro 16)", "TRASEIRA", "Adaptação de rodas raiadas", "N/A", "Honda", ""],
  ["Escape", "Customer Motos / Torbal", "TRASEIRA", "Nenhuma", "N/A", "Customer/Torbal", ""],
  ["Espelho Freio", "FAN 125", "TRASEIRA", "Cortar abas e esmerilhar", "N/A", "Honda", ""],
  ["Lona de Freio", "FABRECK Speed 150", "TRASEIRA", "Trava roda com facilidade", "00539", "Jeff", ""],
  ["Lona de Freio", "Fischer / Titan 150", "TRASEIRA", "Nenhuma", "PV0897", "Fischer", ""],
  ["Pneu Traseiro", "Michelin City Grip 130/70 R16", "TRASEIRA", "Mais baixo e largo, não bate", "130/70", "Ricardo Aragão", ""],
  ["Pneu Traseiro", "Pirelli City Demon 120/90-16", "TRASEIRA", "Corte no protetor de corrente", "120/90-16", "Bizzarro", ""],
  ["Pneu Traseiro", "Michellin Sporty Pilot 110/90", "TRASEIRA", "Nenhuma", "110/90", "Michellin", ""],
  ["Roda Traseira", "Intruder 250 / Mirage 150", "TRASEIRA", "Adaptação: Cubo Titan + Aro Intruder", "N/A", "Anderson L. V.", ""],
  
  // --- PÁGINA 12: FERRAMENTAS ---
  ["Rolamento Roda", "Código universal 6302", "FERRAMENTAS", "Utilizar bons fabricantes (SKF)", "6302", "Edifrans", ""],
  ["Saca Magneto", "CBX/XR/NX 200 Cg 2000", "FERRAMENTAS", "Nenhuma", "N/A", "L340 Vinícius", ""],
  ["Chave Castelo", "Filtro Centrífugo CG 99", "FERRAMENTAS", "Nenhuma", "N/A", "L340 Vinícius", ""]
];

const categoryImages: Record<string, string[]> = {
  'ACESSÓRIOS': [
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=400'
  ],
  'DIANTEIRA': [
    'https://images.unsplash.com/photo-1610411330366-26786c243eb0?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1628169128032-493ce71d18f5?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&q=80&w=400'
  ],
  'ELÉTRICA': [
    'https://images.unsplash.com/photo-1621217066035-717010260428?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1590502598379-37f2a1eb29cc?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1557022138-0cb93a5a73dd?auto=format&fit=crop&q=80&w=400'
  ],
  'MECÂNICA': [
    'https://images.unsplash.com/photo-1623912192776-658b43fb46e1?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1589178496417-640b3ffeb92b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1524313271291-766a01dfb006?auto=format&fit=crop&q=80&w=400'
  ],
  'TRASEIRA': [
    'https://images.unsplash.com/photo-1621217111003-34e8ce9ec802?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1563721388313-100fb62d29cb?auto=format&fit=crop&q=80&w=400'
  ],
  'FERRAMENTAS': [
    'https://images.unsplash.com/photo-1581092334242-491b5c2a1389?auto=format&fit=crop&q=80&w=400'
  ]
};

// Converte a matriz de strings em array de objetos do tipo Part, com preços realistas e imagens rotativas
export const partsData: Part[] = rawData.map((data, index) => {
  const categoryImagesList = categoryImages[data[2]] || categoryImages['MECÂNICA'];
  const randomImage = categoryImagesList[index % categoryImagesList.length];

  return {
    id: String(index + 1),
    item: data[0],
    description: data[1],
    category: data[2],
    adaptation: data[3],
    code: data[4],
    origin: data[5],
    price: getPrice(15, 450), 
    imageUrl: randomImage,
    link: data[6]
  };
});
