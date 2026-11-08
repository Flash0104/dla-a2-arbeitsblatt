/* ==========================================================================
   DLA — Deutsch Lernen mit Ata | Interaktives Arbeitsblatt (A2)
   Inhalt: Almanca_A2_Alistirma_Kagidi.pdf · Lösungen: Almanca_A2_Cevap_Anahtari.pdf
   ========================================================================== */
"use strict";

/* --------------------------------------------------------------------------
   1. DATA (worksheet + answer key)
   -------------------------------------------------------------------------- */
const DATA = {
  // 1 | Wortschatz — answers: 1–C · 2–J · 3–E · 4–B · 5–F · 6–A · 7–I · 8–D · 9–H · 10–G
  wortschatz: [
    { de: "das Wohnzimmer", a: "C" },
    { de: "das Schlafzimmer", a: "J" },
    { de: "das Arbeitszimmer", a: "E" },
    { de: "der Dachboden", a: "B" },
    { de: "der Keller", a: "F" },
    { de: "die Küche", a: "A" },
    { de: "die Garage", a: "I" },
    { de: "der Garten", a: "D" },
    { de: "das Kinderzimmer", a: "H" },
    { de: "das Badezimmer", a: "G" },
  ],
  meanings: {
    A: "mutfak", B: "çatı katı", C: "oturma odası / salon", D: "bahçe", E: "çalışma odası",
    F: "bodrum", G: "banyo", H: "çocuk odası", I: "garaj", J: "yatak odası",
  },

  // 2 | Artikel
  artikel: [
    { w: "Balkon", a: "der" }, { w: "Villa", a: "die" }, { w: "Haus", a: "das" },
    { w: "Küche", a: "die" }, { w: "Garten", a: "der" }, { w: "Mütze", a: "die" },
    { w: "Kleid", a: "das" }, { w: "Hose", a: "die" }, { w: "Pullover", a: "der" },
    { w: "Hemd", a: "das" },
  ],

  // 3 | Kleidung
  kleidung: [
    { pre: "Im Winter trage ich warme", post: "an den Füßen.", a: "Stiefel" },
    { pre: "Auf dem Kopf trage ich eine", post: ". (mit Schirm)", a: "Kappe" },
    { pre: "Meine Schwester trägt ein rotes", post: ".", a: "Kleid" },
    { pre: "Bei Kälte ziehe ich einen warmen", post: "an.", a: "Pullover" },
    { pre: "Zum Sport trage ich eine bequeme", post: ".", a: "Hose" },
    { pre: "Die", post: "ist ein Oberteil, oft mit Knöpfen.", a: "Bluse" },
    { pre: "Eine warme", post: "bedeckt den Kopf im Winter.", a: "Mütze" },
    { pre: "Mein", post: "hat lange Ärmel und ist sehr bequem.", a: "Sweatshirt" },
  ],

  // 4 | Fragen und Antworten (2 P each)
  fragen: [
    { q: "Wo wohnt Max?", info: "in einer Villa", a: ["Max wohnt in einer Villa.", "Er wohnt in einer Villa."] },
    { q: "Wie viele Balkone haben Sie?", info: "zwei Balkone", a: ["Wir haben zwei Balkone.", "Ich habe zwei Balkone."] },
    { q: "Wie ist das Haus?", info: "klein, aber schön", a: ["Das Haus ist klein, aber schön.", "Es ist klein, aber schön."] },
    { q: "Haben Sie eine Küche?", info: "ja", a: ["Ja, wir haben eine Küche.", "Ja, ich habe eine Küche."] },
    { q: "Hast du ein eigenes Zimmer?", info: "ja", a: ["Ja, ich habe ein eigenes Zimmer."] },
  ],

  // 5 | Wo? Präpositionen (2 P each)
  praep: [
    { pre: "Das Buch liegt", post: "dem Tisch.", hint: "auf", a: ["auf"] },
    { pre: "Die Schuhe stehen", post: "dem Bett.", hint: "neben", a: ["neben"] },
    { pre: "Die Tasche ist", post: "dem Schrank.", hint: "hinter", a: ["hinter"] },
    { pre: "Der Stuhl steht", post: "dem Bett und dem Tisch.", hint: "zwischen", a: ["zwischen"] },
    { pre: "Die Kleidung liegt", post: "dem Schrank.", hint: "in", a: ["in"], note: "„in dem Schrank“ = „im Schrank“" },
  ],
  praepExtra: "Ayakkabılar yatağın yanında duruyor.",

  // 6 | Satzbau (2 P each)
  satzbau: [
    { tiles: ["wohnt", "Max", "in einer Villa"], a: ["Max wohnt in einer Villa."] },
    { tiles: ["zwei Balkone", "haben", "Sie"], a: ["Sie haben zwei Balkone."] },
    { tiles: ["in meinem Zimmer", "ein Bett", "gibt es"], a: ["In meinem Zimmer gibt es ein Bett."] },
    { tiles: ["ist", "mein Zimmer", "groß"], a: ["Mein Zimmer ist groß."] },
    {
      tiles: ["eine Küche", "haben", "wir", "nicht"], a: ["Wir haben keine Küche."],
      note: "İpucu: „nicht + eine“ yerine Almancada „keine“ kullanılır.",
    },
  ],

  // 7 | Leseverstehen (2 P each) — keyword based
  lesen: [
    {
      q: "Wie ist Linas Haus?", model: "Ihr Haus ist klein.",
      check: (t) => /\bklein(e|es)?\b/i.test(t) && !/\bnicht\s+klein/i.test(t),
    },
    {
      q: "Wie viele Schlafzimmer hat das Haus?", model: "Das Haus hat drei Schlafzimmer.",
      check: (t) => /\b(drei|3)\b/i.test(t),
    },
    {
      q: "Hat die Familie einen Balkon?", model: "Nein, die Familie hat keinen Balkon.",
      check: (t) => /\b(nein|keinen?)\b/i.test(t) && !/^\s*ja\b/i.test(t),
    },
    {
      q: "Was gibt es in Linas Zimmer? (Nenne zwei Dinge.)",
      model: "Es gibt ein Bett, einen Schreibtisch und einen Schrank. (İkisi yeterli.)",
      check: (t) => countMatches(t, [/\bbett\b/i, /\bschreibtisch\b/i, /\bschrank\b/i]) >= 2,
    },
    {
      q: "Wo steht der Schreibtisch?", model: "Der Schreibtisch steht neben dem Bett.",
      check: (t) => /\bneben\s+dem\s+bett\b/i.test(t),
    },
    {
      q: "Was trägt Lina im Winter? (Nenne zwei Dinge.)",
      model: "Sie trägt einen Pullover, eine Mütze und Stiefel. (İkisi yeterli.)",
      check: (t) => countMatches(t, [/\bpullover\b/i, /\bmütze\b/i, /\bstiefel\b/i]) >= 2,
    },
  ],

  // 8 | Fehler korrigieren (2 P each)
  fehler: [
    { wrong: "Wo wohnt max?", a: ["Wo wohnt Max?"] },
    { wrong: "Das haus ist klein.", a: ["Das Haus ist klein."] },
    { wrong: "Wir haben eine küche.", a: ["Wir haben eine Küche."] },
    { wrong: "In mein Zimmer gibt es ein Bett.", a: ["In meinem Zimmer gibt es ein Bett."] },
    { wrong: "Die Schuhe steht neben das Bett.", a: ["Die Schuhe stehen neben dem Bett."] },
  ],

  // 9 | Mini-Dialog (2 P each) — heuristic
  dialog: [
    { who: "A", q: "Wo wohnst du?", model: "Ich wohne in Duisburg.", check: (t) => /\bwohne\b/i.test(t) },
    {
      who: "B", q: "Wie ist dein Haus / deine Wohnung?", model: "Meine Wohnung ist klein, aber schön.",
      check: (t) => /\bist\b/i.test(t) && ADJECTIVES.some((r) => r.test(t)),
    },
    {
      who: "A", q: "Hast du ein eigenes Zimmer?", model: "Ja, ich habe ein eigenes Zimmer.",
      check: (t) => /\b(ja|nein)\b/i.test(t) && /\bhabe\b/i.test(t),
    },
    {
      who: "B", q: "Was gibt es in deinem Zimmer?", model: "In meinem Zimmer gibt es ein Bett und einen Tisch.",
      check: (t) => /\b(gibt\s+es|es\s+gibt|habe)\b/i.test(t) && FURNITURE.some((r) => r.test(t)),
    },
  ],

  zimmerModel:
    "Mein Zimmer ist groß und hell. In meinem Zimmer gibt es ein Bett, einen Schreibtisch und einen Schrank. " +
    "Mein Bett steht neben dem Fenster. Der Schreibtisch steht vor dem Bett. Meine Tasche liegt auf dem Bett. " +
    "Ich mag mein Zimmer.",
};

/** Unicode-aware whole-word regex (JS `\b` fails next to ä/ö/ü/ß). */
function wordRe(word, suffix = "") {
  return new RegExp(`(?<!\\p{L})${word}${suffix}(?!\\p{L})`, "iu");
}

const FURNITURE = [
  "bett", "schreibtisch", "schrank", "kleiderschrank", "tisch", "stuhl", "sessel", "sofa", "couch", "regal",
  "bücherregal", "lampe", "teppich", "fenster", "tür", "spiegel", "computer", "laptop", "fernseher", "kommode",
  "nachttisch", "poster", "bild", "pflanze", "vorhang", "gardine", "kissen", "decke", "uhr", "tasche", "buch",
  "bücher", "schuhe", "kleidung", "ball", "gitarre", "heizung", "wand",
].map((w) => wordRe(w, "(e|en|n|s)?"));

const PREPOSITIONS = ["in", "im", "auf", "neben", "zwischen", "hinter", "vor", "unter", "über", "an", "am"]
  .map((w) => wordRe(w));

const ADJECTIVES = [
  "groß", "gross", "klein", "hell", "dunkel", "schön", "gemütlich", "modern", "alt", "neu", "bequem", "ordentlich",
  "sauber", "warm", "kalt", "ruhig", "laut", "toll", "super", "praktisch", "bunt", "weiß", "blau", "rot", "grün",
  "gelb", "schwarz", "grau", "rosa", "lila", "braun", "hübsch", "eng", "breit", "lang", "kurz", "teuer", "billig",
].map((w) => wordRe(w, "(e|er|es|en|em)?"));

const MAX_POINTS = { 1: 10, 2: 10, 3: 8, 4: 10, 5: 10, 6: 10, 7: 12, 8: 10, 9: 8, 10: 12 };
const STORAGE_KEY = "dla-a2-arbeitsblatt-v1";

/* --------------------------------------------------------------------------
   2. HELPERS
   -------------------------------------------------------------------------- */
function countMatches(text, regexes) {
  return regexes.filter((r) => r.test(text)).length;
}

/** Normalise a sentence: unify quotes/spaces, drop punctuation (. , ! ?). Case is kept. */
function normalize(s) {
  return (s || "")
    .replace(/[„“”"']/g, "")
    .replace(/[.,!?;:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Returns "ok" | "case" (only capitalisation wrong) | "wrong" */
function compareSentence(input, answers) {
  const n = normalize(input);
  if (!n) return "empty";
  if (answers.some((a) => normalize(a) === n)) return "ok";
  if (answers.some((a) => normalize(a).toLowerCase() === n.toLowerCase())) return "case";
  return "wrong";
}

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") node.className = v;
    else if (k === "dataset") Object.assign(node.dataset, v);
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const c of children) {
    if (c == null) continue;
    node.append(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

function textInput(id, extraClass = "", placeholder = "") {
  return el("input", {
    type: "text", id, name: id, class: `text-input ${extraClass}`.trim(),
    autocomplete: "off", autocapitalize: "off", spellcheck: "false", lang: "de", placeholder,
  });
}

function feedbackBox(id) {
  return el("div", { class: "item-feedback", id, role: "status" });
}

function showFeedback(id, state, message, answerText) {
  const box = document.getElementById(id);
  if (!box) return;
  box.className = `item-feedback active ${state === "ok" ? "correct" : "incorrect"}`;
  box.textContent = message;
  if (answerText) box.append(el("span", { class: "answer-key", text: answerText }));
}

function markInput(input, ok) {
  if (!input) return;
  input.classList.toggle("is-correct", ok === true);
  input.classList.toggle("is-wrong", ok === false);
}

function clearItemFeedback(id) {
  const box = document.getElementById(id);
  if (box) { box.className = "item-feedback"; box.textContent = ""; }
}

/* --------------------------------------------------------------------------
   3. RENDERING
   -------------------------------------------------------------------------- */
function renderAll() {
  // 1 | Wortschatz
  const matching = document.getElementById("matching-list");
  DATA.wortschatz.forEach((item, i) => {
    const id = `s1-${i}`;
    const select = el("select", { id, name: id, class: "match-select" },
      el("option", { value: "", text: "— seç —" }),
      ...Object.entries(DATA.meanings).map(([k, v]) => el("option", { value: k, text: `${k}. ${v}` })));
    matching.append(el("div", { class: "match-item-wrap" },
      el("div", { class: "match-item" },
        el("label", { for: id, class: "match-label", lang: "de", text: `${i + 1}. ${item.de}` }), select),
      feedbackBox(`fb-${id}`)));
  });

  // 2 | Artikel
  const artikel = document.getElementById("artikel-list");
  DATA.artikel.forEach((item, i) => {
    const id = `s2-${i}`;
    const group = el("div", { class: "artikel-btn-group", role: "radiogroup", "aria-label": `${i + 1}. ${item.w}` },
      ...["der", "die", "das"].map((art) =>
        el("button", { type: "button", class: "artikel-btn", role: "radio", "aria-checked": "false",
          dataset: { group: id, value: art }, text: art })));
    artikel.append(el("div", { class: "artikel-item", id },
      el("span", { class: "artikel-word", lang: "de", text: `${i + 1}. ___ ${item.w}` }), group,
      feedbackBox(`fb-${id}`)));
  });

  // 3 | Kleidung
  const kleidung = document.getElementById("kleidung-list");
  DATA.kleidung.forEach((item, i) => {
    const id = `s3-${i}`;
    const input = textInput(id, "inline-input kleidung-input");
    input.setAttribute("aria-label", `Satz ${i + 1}: Lücke`);
    kleidung.append(el("li", { class: "sentence-item", lang: "de" },
      `${item.pre} `, input, ` ${item.post}`, feedbackBox(`fb-${id}`)));
  });

  // 4 | Fragen und Antworten
  const qa = document.getElementById("qa-list");
  DATA.fragen.forEach((item, i) => {
    const id = `s4-${i}`;
    qa.append(qaBlock(id, `${i + 1}. ${item.q}`, `(${item.info})`, "Tam cümleyle cevap yaz…"));
  });

  // 5 | Präpositionen
  const praep = document.getElementById("praep-list");
  DATA.praep.forEach((item, i) => {
    const id = `s5-${i}`;
    const input = textInput(id, "inline-input");
    input.setAttribute("aria-label", `Satz ${i + 1}: Präposition`);
    praep.append(el("li", { class: "sentence-item", lang: "de" },
      `${item.pre} `, input, ` ${item.post} `, el("span", { class: "sub-hint", text: `(${item.hint})` }),
      feedbackBox(`fb-${id}`)));
  });

  // 6 | Satzbau
  const satz = document.getElementById("satzbau-list");
  DATA.satzbau.forEach((item, i) => {
    const id = `s6-${i}`;
    const block = qaBlock(id, `${i + 1}. ${item.tiles.join(" / ")}`, "", "Cümleyi buraya yaz veya kelimelere tıkla…");
    const bank = el("div", { class: "word-tile-bank" },
      ...item.tiles.map((t) => el("button", { type: "button", class: "word-tile", dataset: { target: id, word: t }, text: t })),
      el("button", { type: "button", class: "word-tile tile-clear", dataset: { clear: id }, text: "⌫ Temizle" }));
    block.insertBefore(bank, block.querySelector("input"));
    satz.append(block);
  });

  // 7 | Lesen
  const lesen = document.getElementById("lesen-list");
  DATA.lesen.forEach((item, i) => {
    lesen.append(qaBlock(`s7-${i}`, `${i + 1}. ${item.q}`, "", "Almanca cevap yaz…"));
  });

  // 8 | Fehler
  const fehler = document.getElementById("fehler-list");
  DATA.fehler.forEach((item, i) => {
    const block = qaBlock(`s8-${i}`, `${i + 1}. ${item.wrong}`, "hatalı cümle", "Doğru cümleyi yaz…");
    block.querySelector(".qa-prompt span").classList.add("wrong-sentence");
    fehler.append(block);
  });

  // 9 | Dialog
  const dialog = document.getElementById("dialog-list");
  DATA.dialog.forEach((item, i) => {
    dialog.append(qaBlock(`s9-${i}`, `${item.who}: ${item.q}`, `${item.who === "A" ? "B" : "A"} cevaplar`, "Cevabını yaz…"));
  });
}

function qaBlock(id, prompt, sub, placeholder) {
  const label = el("label", { for: id, class: "qa-prompt" },
    el("span", { lang: "de", text: prompt }), sub ? el("span", { class: "qa-subinfo", text: sub }) : null);
  return el("div", { class: "qa-item" }, label, textInput(id, "full-width", placeholder), feedbackBox(`fb-${id}`));
}

/* --------------------------------------------------------------------------
   4. CHECKING / SCORING
   -------------------------------------------------------------------------- */
const sectionScores = {};
const val = (id) => (document.getElementById(id)?.value || "").trim();

const CHECKERS = {
  1() {
    let pts = 0;
    DATA.wortschatz.forEach((item, i) => {
      const id = `s1-${i}`, v = val(id), ok = v === item.a;
      if (ok) pts++;
      markInput(document.getElementById(id), ok);
      showFeedback(`fb-${id}`, ok ? "ok" : "bad", ok ? "✓ Doğru" : v ? "✗ Yanlış" : "✗ Boş",
        ok ? "" : `Doğru: ${item.a}. ${DATA.meanings[item.a]}`);
    });
    return pts;
  },

  2() {
    let pts = 0;
    DATA.artikel.forEach((item, i) => {
      const id = `s2-${i}`;
      const chosen = document.querySelector(`[data-group="${id}"][aria-checked="true"]`)?.dataset.value || "";
      const ok = chosen === item.a;
      if (ok) pts++;
      showFeedback(`fb-${id}`, ok ? "ok" : "bad", ok ? "✓" : chosen ? "✗" : "✗ Boş", ok ? "" : `${item.a} ${item.w}`);
    });
    return pts;
  },

  3() {
    let pts = 0;
    DATA.kleidung.forEach((item, i) => {
      const id = `s3-${i}`, r = compareSentence(val(id), [item.a]);
      if (r === "ok") pts++;
      markInput(document.getElementById(id), r === "ok");
      showFeedback(`fb-${id}`, r === "ok" ? "ok" : "bad", messageFor(r), r === "ok" ? "" : `Doğru: ${item.a}`);
    });
    return pts;
  },

  4: () => sentenceSection(4, DATA.fragen),

  5() {
    let pts = 0;
    DATA.praep.forEach((item, i) => {
      const id = `s5-${i}`, v = normalize(val(id)).toLowerCase();
      const ok = item.a.includes(v);
      if (ok) pts += 2;
      markInput(document.getElementById(id), ok);
      const full = `${item.pre} ${item.a[0]} ${item.post}`;
      showFeedback(`fb-${id}`, ok ? "ok" : "bad", ok ? "✓ Doğru (+2)" : v ? "✗ Yanlış" : "✗ Boş",
        ok ? (item.note || "") : `Doğru: ${full}${item.note ? ` · ${item.note}` : ""}`);
    });
    // Extra (not scored) — keyword check on the Turkish translation
    const extra = val("praep-extra").toLowerCase();
    if (extra) {
      const ok = /ayakkab/.test(extra) && /yata(ğ|g)/.test(extra) && /yan/.test(extra);
      showFeedback("fb-praep-extra", ok ? "ok" : "bad", ok ? "✓ Güzel çeviri!" : "Tekrar kontrol et.",
        `Örnek: ${DATA.praepExtra}`);
    } else {
      showFeedback("fb-praep-extra", "bad", "Extra (puansız) — boş bırakıldı.", `Örnek: ${DATA.praepExtra}`);
    }
    return pts;
  },

  6: () => sentenceSection(6, DATA.satzbau),

  7() {
    let pts = 0;
    DATA.lesen.forEach((item, i) => {
      const id = `s7-${i}`, v = val(id);
      const ok = v.split(/\s+/).length >= 2 && item.check(v);
      if (ok) pts += 2;
      markInput(document.getElementById(id), ok);
      showFeedback(`fb-${id}`, ok ? "ok" : "bad",
        ok ? "✓ Doğru (+2)" : v ? "✗ Cevap metinle uyuşmuyor ya da eksik." : "✗ Boş",
        `Örnek cevap: ${item.model}`);
    });
    return pts;
  },

  8: () => sentenceSection(8, DATA.fehler),

  9() {
    let pts = 0;
    DATA.dialog.forEach((item, i) => {
      const id = `s9-${i}`, v = val(id);
      const ok = v.split(/\s+/).length >= 3 && item.check(v);
      if (ok) pts += 2;
      markInput(document.getElementById(id), ok);
      showFeedback(`fb-${id}`, ok ? "ok" : "bad",
        ok ? "✓ Anlamlı cevap (+2)" : v ? "✗ Tam bir cümle olarak cevap ver." : "✗ Boş",
        `Örnek: ${item.model}`);
    });
    return pts;
  },

  10() {
    const r = analyzeZimmer();
    showFeedback("fb-zimmer", r.total >= 10 ? "ok" : "bad",
      `Puan: ${r.total} / 12 · Cümle ${r.sentPts}/4 · Nesne ${r.nounPts}/3 · Edat ${r.prepPts}/3 · Sıfat ${r.adjPts}/2` +
      " (Otomatik tahmini puan — dilbilgisi öğretmen tarafından kontrol edilmelidir.)",
      `Örnek metin: ${DATA.zimmerModel}`);
    return r.total;
  },
};

function messageFor(r) {
  return r === "ok" ? "✓ Doğru" : r === "case" ? "✗ Büyük/küçük harfe dikkat!" : r === "empty" ? "✗ Boş" : "✗ Yanlış";
}

function sentenceSection(sec, items) {
  let pts = 0;
  items.forEach((item, i) => {
    const id = `s${sec}-${i}`, r = compareSentence(val(id), item.a);
    if (r === "ok") pts += 2;
    markInput(document.getElementById(id), r === "ok");
    const extra = item.note && r !== "ok" ? ` · ${item.note}` : "";
    showFeedback(`fb-${id}`, r === "ok" ? "ok" : "bad",
      r === "ok" ? "✓ Doğru (+2)" : messageFor(r) + extra,
      r === "ok" ? "" : `Doğru: ${item.a.join("  /  ")}`);
  });
  return pts;
}

function analyzeZimmer() {
  const text = val("mein-zimmer-text");
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length >= 3);
  const nouns = countMatches(text, FURNITURE);
  const preps = countMatches(text, PREPOSITIONS);
  const adjs = countMatches(text, ADJECTIVES);
  const sentPts = sentences.length >= 5 ? 4 : sentences.length >= 3 ? 2 : sentences.length >= 1 ? 1 : 0;
  const nounPts = Math.min(nouns, 3);
  const prepPts = preps >= 2 ? 3 : preps === 1 ? 1 : 0;
  const adjPts = adjs >= 1 ? 2 : 0;
  return { sentences: sentences.length, nouns, preps, adjs, sentPts, nounPts, prepPts, adjPts,
    total: sentPts + nounPts + prepPts + adjPts };
}

function updateZimmerChecklist() {
  const r = analyzeZimmer();
  const set = (pill, countId, txt, ok) => {
    document.getElementById(countId).textContent = txt;
    const p = document.getElementById(pill);
    p.classList.toggle("satisfied", ok);
    p.querySelector(".crit-icon").textContent = ok ? "✓" : "○";
  };
  set("crit-sentences", "count-sentences", String(r.sentences), r.sentences >= 5);
  set("crit-nouns", "count-nouns", `${Math.min(r.nouns, 3)}/3`, r.nouns >= 3);
  set("crit-preps", "count-preps", `${Math.min(r.preps, 2)}/2`, r.preps >= 2);
  set("crit-adjs", "count-adjs", `${Math.min(r.adjs, 1)}/1`, r.adjs >= 1);
}

function checkSection(sec) {
  const pts = CHECKERS[sec]();
  sectionScores[sec] = pts;
  const max = MAX_POINTS[sec];
  const scoreEl = document.getElementById(`score-sec-${sec}`);
  scoreEl.textContent = `${pts} / ${max} P`;
  scoreEl.dataset.state = pts === max ? "full" : pts >= max / 2 ? "mid" : "low";
  document.getElementById(`feedback-sec-${sec}`).textContent =
    pts === max ? "Mükemmel! Hepsi doğru. 🎉" : `${pts} / ${max} puan aldın. Kırmızı kutulara göz at.`;
  updateTotal();
  return pts;
}

function updateTotal() {
  const total = Object.values(sectionScores).reduce((a, b) => a + b, 0);
  document.getElementById("live-score").textContent = total;
  document.getElementById("final-total-score").textContent = total;
  return total;
}

/* --------------------------------------------------------------------------
   5. PROGRESS & PERSISTENCE
   -------------------------------------------------------------------------- */
function allFields() {
  return [...document.querySelectorAll("#worksheet-form input, #worksheet-form select, #worksheet-form textarea")];
}

function updateProgress() {
  const fields = allFields().filter((f) => f.id !== "praep-extra");
  let filled = fields.filter((f) => f.value.trim() !== "").length;
  let total = fields.length;
  DATA.artikel.forEach((_, i) => {
    total++;
    if (document.querySelector(`[data-group="s2-${i}"][aria-checked="true"]`)) filled++;
  });
  document.getElementById("progress-fill").style.width = `${Math.round((filled / total) * 100)}%`;
}

function save() {
  const state = { fields: {}, artikel: {} };
  allFields().forEach((f) => { state.fields[f.id] = f.value; });
  ["student-name", "student-date"].forEach((id) => { state.fields[id] = val(id); });
  DATA.artikel.forEach((_, i) => {
    const c = document.querySelector(`[data-group="s2-${i}"][aria-checked="true"]`);
    if (c) state.artikel[`s2-${i}`] = c.dataset.value;
  });
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* storage unavailable */ }
}

function load() {
  let state;
  try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { state = null; }
  if (!state) return;
  for (const [id, v] of Object.entries(state.fields || {})) {
    const f = document.getElementById(id);
    if (f) f.value = v;
  }
  for (const [group, v] of Object.entries(state.artikel || {})) selectArtikel(group, v);
}

function selectArtikel(group, value) {
  document.querySelectorAll(`[data-group="${group}"]`).forEach((b) => {
    const on = b.dataset.value === value;
    b.classList.toggle("active", on);
    b.setAttribute("aria-checked", String(on));
  });
}

/* --------------------------------------------------------------------------
   6. INTERACTIONS
   -------------------------------------------------------------------------- */
let lastFocused = null;

function insertAtCursor(field, text) {
  if (!field) return;
  const start = field.selectionStart ?? field.value.length;
  const end = field.selectionEnd ?? field.value.length;
  field.setRangeText(text, start, end, "end");
  field.focus();
  field.dispatchEvent(new Event("input", { bubbles: true }));
}

function bindEvents() {
  const form = document.getElementById("worksheet-form");

  document.addEventListener("focusin", (e) => {
    if (e.target.matches("input[type=text], textarea")) lastFocused = e.target;
  });

  // Prevent the umlaut / word buttons from stealing focus (keeps caret position)
  document.addEventListener("mousedown", (e) => {
    if (e.target.closest(".char-btn, .word-chip, .word-tile, .starter-chip")) e.preventDefault();
  });

  document.addEventListener("click", (e) => {
    const t = e.target;

    if (t.closest(".char-btn")) {
      insertAtCursor(lastFocused, t.closest(".char-btn").dataset.char);
      return;
    }

    if (t.matches(".artikel-btn")) {
      selectArtikel(t.dataset.group, t.dataset.value);
      clearItemFeedback(`fb-${t.dataset.group}`);
      save(); updateProgress();
      return;
    }

    if (t.matches(".word-chip")) {
      // Section 3: insert into focused blank or the first empty one
      let target = lastFocused?.classList.contains("kleidung-input") ? lastFocused : null;
      if (!target) target = [...document.querySelectorAll(".kleidung-input")].find((i) => !i.value.trim());
      if (target) { target.value = t.dataset.word; target.focus(); target.dispatchEvent(new Event("input", { bubbles: true })); }
      return;
    }

    if (t.matches(".word-tile")) {
      if (t.dataset.clear) {
        const f = document.getElementById(t.dataset.clear);
        f.value = ""; f.dispatchEvent(new Event("input", { bubbles: true })); f.focus();
        return;
      }
      const f = document.getElementById(t.dataset.target);
      let next = f.value.trim() ? `${f.value.trim()} ${t.dataset.word}` : t.dataset.word;
      next = next.charAt(0).toUpperCase() + next.slice(1);
      f.value = next;
      f.dispatchEvent(new Event("input", { bubbles: true }));
      return;
    }

    if (t.matches(".starter-chip")) {
      const ta = document.getElementById("mein-zimmer-text");
      const sep = ta.value && !/\s$/.test(ta.value) ? " " : "";
      ta.value += sep + t.dataset.insert;
      ta.focus();
      ta.setSelectionRange(ta.value.length, ta.value.length);
      ta.dispatchEvent(new Event("input", { bubbles: true }));
      return;
    }

    if (t.matches(".btn-check-section")) {
      checkSection(Number(t.dataset.target));
    }
  });

  form.addEventListener("input", (e) => {
    const f = e.target;
    if (f.id) { markInput(f, null); clearItemFeedback(`fb-${f.id}`); }
    if (f.id === "mein-zimmer-text") updateZimmerChecklist();
    save(); updateProgress();
  });
  form.addEventListener("change", () => { save(); updateProgress(); });
  document.getElementById("student-info-form").addEventListener("input", save);

  // Check all
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    Object.keys(MAX_POINTS).forEach((s) => checkSection(Number(s)));
    const total = updateTotal();
    const pct = Math.round((total / 98) * 100);
    const name = val("student-name");
    const banner = document.getElementById("overall-result-banner");
    banner.hidden = false;
    banner.className = `result-banner ${pct >= 70 ? "success" : "warning"}`;
    banner.textContent = `${name ? name + ", " : ""}toplam puanın: ${total} / 98 (%${pct}). ` +
      (pct >= 85 ? "Sehr gut! 🌟" : pct >= 70 ? "Gut gemacht! 👍" : pct >= 50 ? "Nicht schlecht — eksiklere tekrar bak." : "Weiter üben! Kırmızı kutulardaki doğru cevapları incele.");
    banner.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // Grammar notes
  const hintsBtn = document.getElementById("toggle-hints-btn");
  hintsBtn.addEventListener("click", () => {
    const panel = document.getElementById("grammar-notes-panel");
    panel.hidden = !panel.hidden;
    hintsBtn.setAttribute("aria-expanded", String(!panel.hidden));
  });

  document.getElementById("print-btn").addEventListener("click", () => window.print());

  document.getElementById("reset-all-btn").addEventListener("click", () => {
    if (!confirm("Tüm cevaplar silinecek. Emin misin?")) return;
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    location.reload();
  });

  // Theme toggle (two-state: system ↔ opposite, pinned)
  const meta = document.querySelector('meta[name="color-scheme"]');
  const systemDark = matchMedia("(prefers-color-scheme: dark)");
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const pinned = localStorage.getItem("dla-color-scheme");
    if (pinned) {
      localStorage.removeItem("dla-color-scheme");
      meta.content = "light dark";
      delete document.documentElement.dataset.theme;
    } else {
      const opposite = systemDark.matches ? "light" : "dark";
      localStorage.setItem("dla-color-scheme", opposite);
      meta.content = opposite;
      document.documentElement.dataset.theme = opposite;
    }
  });
}

/* --------------------------------------------------------------------------
   7. INIT
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  load();
  bindEvents();
  updateZimmerChecklist();
  updateProgress();
  if (!val("student-date")) document.getElementById("student-date").valueAsDate = new Date();
});
