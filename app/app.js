const STORAGE_KEY = 'dashboard_medicina_persistente_state_v6';
const DB_NAME = 'dashboard_medicina_persistente_v6_db';
const DB_STORE = 'state';
const LIB = window.BIBLIOTECA_DATA || { tree: { id: 'f-root', type: 'folder', title: 'Temas', children: [] } };
const VALID_EXTS = ['.gif', '.htm', '.html', '.jpeg', '.jpg', '.pdf', '.png', '.webp'];
const IMAGE_EXTS = ['.gif', '.jpeg', '.jpg', '.png', '.webp'];
const HTML_EXTS = ['.htm', '.html'];
const AUDIENCES = [
  { id: 'medicina', label: 'Medicina' },
  { id: 'enfermeria', label: 'Enfermería' },
  { id: 'tcae', label: 'TCAE' }
];
const DEFAULT_AUDIENCE = 'medicina';
const CALCULADORAS = [
  {
    id: 'sedacion-uci',
    title: 'Sedación UCI',
    description: 'Perfusión continua de sedantes, analgésicos, agitación y relajantes.',
    path: '../biblioteca/assets/calculadoras/calculadora-sedacion-uci.html?v=20260807i'
  },
  {
    id: 'nutricion-clinica-uci',
    title: 'Nutrición Clínica UCI',
    description: 'Dashboard de nutrición clínica en UCI.',
    url: 'https://icuconnect-nutricion.web.app'
  }
];
const PROTOCOLOS = [
  {
    id: 'dds',
    title: 'DDS (Descontaminación Digestiva)',
    description: 'Guía rápida y protocolo detallado de descontaminación digestiva selectiva en UCI.',
    audiences: ['medicina', 'enfermeria'],
    parts: [
      {
        id: 'folleto',
        title: 'Folleto general',
        description: 'Guía rápida de pared para enfermería y medicina.',
        path: '../biblioteca/assets/protocolos/dds/folleto-general.png',
        ext: '.png'
      },
      {
        id: 'detallado',
        title: 'Protocolo detallado',
        description: 'Documento completo con índice navegable.',
        path: '../biblioteca/assets/protocolos/dds/protocolo-detallado.html?v=20260814l',
        ext: '.html',
        view: 'document'
      }
    ]
  },
  {
    id: 'estrenimiento',
    title: 'Estreñimiento en UCI',
    description: 'Guía clínica y tabla de fármacos para el manejo del estreñimiento en UCI.',
    audiences: ['medicina', 'enfermeria'],
    parts: [
      {
        id: 'guia',
        title: 'Guía clínica',
        description: 'Protocolo de estreñimiento en UCI.',
        path: '../biblioteca/assets/protocolos/estrenimiento/guia-clinica.pdf',
        ext: '.pdf'
      },
      {
        id: 'tabla',
        title: 'Tabla de fármacos',
        description: 'Fármacos para el estreñimiento en UCI.',
        path: '../biblioteca/assets/protocolos/estrenimiento/tabla-farmacos.pdf',
        ext: '.pdf'
      }
    ]
  },
  {
    id: 'diarrea-ne',
    title: 'Diarrea en paciente en UCI con NE',
    description: 'Manejo de la diarrea en nutrición enteral en UCI.',
    audiences: ['medicina'],
    parts: [
      {
        id: 'poster',
        title: 'Diarrea en paciente en UCI con NE',
        description: 'Póster clínico de manejo de diarrea con nutrición enteral.',
        path: '../biblioteca/assets/protocolos/diarrea/diarrea-uci-ne.html?v=20260815a',
        ext: '.html'
      }
    ]
  },
  {
    id: 'tep',
    title: 'TEP',
    description: 'Guía rápida de bolsillo de tromboembolismo pulmonar agudo en UCI.',
    audiences: ['medicina'],
    parts: [
      {
        id: 'guia',
        title: 'TEP',
        description: 'Protocolo TEP con índice lateral navegable.',
        path: '../biblioteca/assets/protocolos/tep/tep-guia.html?v=20260818c',
        ext: '.html',
        view: 'document'
      }
    ]
  }
];
const HOME_IMAGE = '../biblioteca/assets/inicio-uci.png';
const DUTYDOCTOR = {
  title: 'DutyDoctor',
  description: 'Gestión de guardias médicas.',
  url: 'https://studio-4278811655-e6d72.web.app'
};

const els = {
  tree: document.getElementById('tree'),
  results: document.getElementById('results'),
  search: document.getElementById('search'),
  homeBtn: document.getElementById('homeBtn'),
  expandAllBtn: document.getElementById('expandAllBtn'),
  collapseAllBtn: document.getElementById('collapseAllBtn'),
  calculadorasBtn: document.getElementById('calculadorasBtn'),
  protocolosBtn: document.getElementById('protocolosBtn'),
  dutydoctorBtn: document.getElementById('dutydoctorBtn'),
  title: document.getElementById('title'),
  meta: document.getElementById('meta'),
  crumbs: document.getElementById('crumbs'),
  viewer: document.getElementById('viewer'),
  statFiles: document.getElementById('statFiles'),
  statAreas: document.getElementById('statAreas'),
  saveState: document.getElementById('saveState'),
  selectedInfo: document.getElementById('selectedInfo'),
  addRootFolderBtn: document.getElementById('addRootFolderBtn'),
  addSubfolderBtn: document.getElementById('addSubfolderBtn'),
  moveFolderBtn: document.getElementById('moveFolderBtn'),
  moveFolderTargetSelect: document.getElementById('moveFolderTargetSelect'),
  renameFolderBtn: document.getElementById('renameFolderBtn'),
  deleteFolderBtn: document.getElementById('deleteFolderBtn'),
  addFilesBtn: document.getElementById('addFilesBtn'),
  renamePosterBtn: document.getElementById('renamePosterBtn'),
  movePosterBtn: document.getElementById('movePosterBtn'),
  deletePosterBtn: document.getElementById('deletePosterBtn'),
  moveTargetSelect: document.getElementById('moveTargetSelect'),
  saveLibraryBtn: document.getElementById('saveLibraryBtn'),
  loadLibraryBtn: document.getElementById('loadLibraryBtn'),
  exportBtn: document.getElementById('exportBtn'),
  restoreBtn: document.getElementById('restoreBtn'),
  toggleInfoBtn: document.getElementById('toggleInfoBtn'),
  infoLine: document.getElementById('infoLine'),
  infoHiddenNote: document.getElementById('infoHiddenNote'),
  filePicker: document.getElementById('filePicker'),
  importPicker: document.getElementById('importPicker'),
  savedFeedback: document.getElementById('savedFeedback'),
  lightbox: document.getElementById('lightbox'),
  lightboxImage: document.getElementById('lightboxImage'),
  lightboxTitle: document.getElementById('lightboxTitle'),
  lightboxClose: document.getElementById('lightboxClose'),
  lbPrev: document.getElementById('lbPrev'),
  lbNext: document.getElementById('lbNext'),
  lbZoomIn: document.getElementById('lbZoomIn'),
  lbZoomOut: document.getElementById('lbZoomOut'),
  lbReset: document.getElementById('lbReset'),
  lbFullscreen: document.getElementById('lbFullscreen'),
  htmlLightbox: document.getElementById('htmlLightbox'),
  htmlLbTitle: document.getElementById('htmlLbTitle'),
  htmlLbStage: document.getElementById('htmlLbStage'),
  htmlLbBoard: document.getElementById('htmlLbBoard'),
  htmlLbFrame: document.getElementById('htmlLbFrame'),
  htmlLbZoomIn: document.getElementById('htmlLbZoomIn'),
  htmlLbZoomOut: document.getElementById('htmlLbZoomOut'),
  htmlLbFit: document.getElementById('htmlLbFit'),
  htmlLbFullscreen: document.getElementById('htmlLbFullscreen'),
  htmlLbClose: document.getElementById('htmlLbClose'),
  htmlLbZoomLabel: document.getElementById('htmlLbZoomLabel'),
  pdfLightbox: document.getElementById('pdfLightbox'),
  pdfLbTitle: document.getElementById('pdfLbTitle'),
  pdfLbFrame: document.getElementById('pdfLbFrame'),
  pdfLbFullscreen: document.getElementById('pdfLbFullscreen'),
  pdfLbClose: document.getElementById('pdfLbClose'),
  newPosterAudienceSelect: document.getElementById('newPosterAudienceSelect'),
  audienceMedicinaBtn: document.getElementById('audienceMedicinaBtn'),
  audienceEnfermeriaBtn: document.getElementById('audienceEnfermeriaBtn'),
  audienceTcaeBtn: document.getElementById('audienceTcaeBtn')
};

const state = {
  tree: null,
  currentPath: null,
  currentFile: null,
  currentFileParentId: null,
  selectedId: null,
  selectedType: null,
  loadedFromSaved: false,
  draggedItem: null,
  infoVisible: true,
  lightboxScale: 1,
  lightboxPanX: 0,
  lightboxPanY: 0,
  lightboxDragging: false,
  lightboxDragStartX: 0,
  lightboxDragStartY: 0,
  lightboxStartPanX: 0,
  lightboxStartPanY: 0,
  lightboxGallery: [],
  lightboxIndex: -1,
  htmlLbScale: 1,
  htmlLbFitScale: 1,
  htmlLbNaturalW: 1200,
  htmlLbNaturalH: 800,
  htmlLbDragging: false,
  htmlLbDragStartX: 0,
  htmlLbDragStartY: 0,
  htmlLbScrollLeft: 0,
  htmlLbScrollTop: 0,
  lastSavedMode: 'base',
  audienceFilter: DEFAULT_AUDIENCE
};

function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
function uuid(prefix = 'n') { return prefix + '-' + Math.random().toString(36).slice(2, 10) + '-' + Date.now().toString(36); }
function extFromName(name) { const m = /\.[^.]+$/.exec(name || ''); return m ? m[0].toLowerCase() : ''; }
function isImageExt(ext) { return IMAGE_EXTS.includes(ext); }
function isHtmlExt(ext) { return HTML_EXTS.includes(ext); }
function kindLabel(ext) {
  if (ext === '.pdf') return 'PDF';
  if (isHtmlExt(ext)) return 'HTML';
  return 'Imagen';
}
function icon(ext) {
  if (ext === '.pdf') return '📄';
  if (isHtmlExt(ext)) return '🌐';
  return '🖼️';
}
function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function normalizeAssetPath(path) {
  if (!path) return path;
  let p = String(path).replace(/\\/g, '/').trim();
  p = p.replace(/^file:\/\//i, '');
  p = p.replace(/^\.\//, '');
  const idxBiblioteca = p.toLowerCase().lastIndexOf('biblioteca/assets/');
  if (idxBiblioteca >= 0) return '../' + p.slice(idxBiblioteca);
  const idxAssets = p.toLowerCase().lastIndexOf('assets/');
  if (idxAssets >= 0) return '../biblioteca/' + p.slice(idxAssets);
  return p;
}
function isValidAudience(value) {
  return AUDIENCES.some(item => item.id === value);
}
function isSharedAudience(value) {
  return value === 'todos' || value === 'all';
}
function getAudiences(file) {
  if (!file) return [DEFAULT_AUDIENCE];
  if (isSharedAudience(file.audience)) return AUDIENCES.map(item => item.id);
  if (Array.isArray(file.audiences) && file.audiences.length) {
    const list = [...new Set(file.audiences.filter(isValidAudience))];
    if (list.length) return list;
  }
  return [isValidAudience(file.audience) ? file.audience : DEFAULT_AUDIENCE];
}
function getAudience(file) {
  return getAudiences(file)[0] || DEFAULT_AUDIENCE;
}
function audienceLabel(id) {
  if (isSharedAudience(id)) return 'Todos';
  const found = AUDIENCES.find(item => item.id === id);
  return found ? found.label : AUDIENCES[0].label;
}
function fileAudienceLabel(file) {
  const list = getAudiences(file);
  if (list.length >= AUDIENCES.length) return 'Todos';
  return list.map(audienceLabel).join(' · ');
}
function normalizeAudienceField(file) {
  if (!file || file.type !== 'file') return;
  if (isSharedAudience(file.audience)) {
    file.audience = 'todos';
    delete file.audiences;
    return;
  }
  if (Array.isArray(file.audiences) && file.audiences.length) {
    const list = [...new Set(file.audiences.filter(isValidAudience))];
    if (list.length >= AUDIENCES.length) {
      file.audience = 'todos';
      delete file.audiences;
      return;
    }
    if (list.length === 1) {
      file.audience = list[0];
      delete file.audiences;
      return;
    }
    if (list.length > 1) {
      file.audiences = list;
      file.audience = list[0];
      return;
    }
  }
  file.audience = isValidAudience(file.audience) ? file.audience : DEFAULT_AUDIENCE;
}
function ensureAudience(node) {
  if (!node) return;
  if (node.type === 'file') {
    normalizeAudienceField(node);
    return;
  }
  (node.children || []).forEach(ensureAudience);
}
function matchesAudienceFilter(file) {
  return getAudiences(file).includes(state.audienceFilter);
}
function normalizeTreePaths(node) {
  if (!node) return;
  if (node.type === 'file') {
    if (node.source !== 'upload' && node.path) node.path = normalizeAssetPath(node.path);
    normalizeAudienceField(node);
    return;
  }
  (node.children || []).forEach(normalizeTreePaths);
}
function fileSrc(file) { return file.source === 'upload' ? file.dataUrl : normalizeAssetPath(file.path); }

function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) return reject(new Error('IndexedDB no disponible'));
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('No se pudo abrir IndexedDB'));
  });
}
function idbSet(key, value) {
  return openDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  }));
}
function idbGet(key) {
  return openDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readonly');
    const req = tx.objectStore(DB_STORE).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }));
}
function idbDelete(key) {
  return openDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  }));
}

async function persistState(payload) {
  let localSaved = false;
  let idbSaved = false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    localSaved = true;
  } catch (e) {}
  try {
    await idbSet('treeState', payload);
    idbSaved = true;
  } catch (e) {}
  state.loadedFromSaved = localSaved || idbSaved;
  state.lastSavedMode = localSaved || idbSaved ? 'autosaved' : 'session_only';
  updateStats();
  return { localSaved, idbSaved, saved: localSaved || idbSaved };
}
function saveLocalState() {
  persistState(state.tree).then(result => {
    if (!result.saved) alert('No se pudo guardar localmente todo el contenido. Usa Guardar biblioteca para no perder cambios.');
  }).catch(() => {
    alert('No se pudo guardar localmente todo el contenido. Usa Guardar biblioteca para no perder cambios.');
  });
}

function rebuildMetadata(node, parentFolders = []) {
  if (node.type === 'file') {
    node.breadcrumb = [...parentFolders, node.title].join(' / ');
    node.specialty = parentFolders[0] || 'General';
    return;
  }
  (node.children || []).forEach(child => rebuildMetadata(child, node.title === 'Temas' ? parentFolders : [...parentFolders, node.title]));
}

function countFiles(node, filtered = false) {
  if (node.type === 'file') return filtered ? (matchesAudienceFilter(node) ? 1 : 0) : 1;
  let total = 0;
  (node.children || []).forEach(c => { total += countFiles(c, filtered); });
  if (!filtered) node.file_count = total;
  return total;
}

function flatten(node) {
  if (!node) return [];
  if (node.type === 'file') return [node];
  return (node.children || []).flatMap(flatten);
}

function flattenVisible(node = state.tree) {
  return flatten(node).filter(matchesAudienceFilter);
}

function listRootAreas() {
  return (state.tree?.children || []).filter(n => n.type === 'folder').map(n => n.title);
}

function listAllFolders(node = state.tree, parentTitles = []) {
  if (!node || node.type === 'file') return [];
  const currentTitles = node.title === 'Temas' ? parentTitles : [...parentTitles, node.title];
  let out = [];
  if (node.title !== 'Temas') out.push({ id: node.id, label: currentTitles.join(' / ') });
  (node.children || []).forEach(child => { out = out.concat(listAllFolders(child, currentTitles)); });
  return out;
}

function findNodeAndParentById(id, node = state.tree, parent = null) {
  if (!node) return { node: null, parent: null };
  if (node.id === id) return { node, parent };
  if (node.type === 'folder') {
    for (const child of (node.children || [])) {
      const found = findNodeAndParentById(id, child, node);
      if (found.node) return found;
    }
  }
  return { node: null, parent: null };
}

function firstFile(node = state.tree) {
  if (!node) return null;
  if (node.type === 'file') return matchesAudienceFilter(node) ? node : null;
  for (const child of (node.children || [])) {
    const found = firstFile(child);
    if (found) return found;
  }
  return null;
}

function setSelection(id, type) {
  state.selectedId = id;
  state.selectedType = type;
  clearSectionButtons();
  const found = findNodeAndParentById(id);
  if (!found.node) {
    els.selectedInfo.textContent = 'Selección actual: ninguna';
    return;
  }
  els.selectedInfo.textContent = 'Selección actual: ' + (found.node.type === 'folder' ? 'carpeta · ' : 'póster · ') + found.node.title;
  document.querySelectorAll('.folder-label.selected').forEach(el => el.classList.remove('selected'));
  const folderBtn = document.querySelector('.folder-label[data-id="' + id + '"]');
  if (found.node.type === 'folder' && folderBtn) folderBtn.classList.add('selected');
}

function setActive(path) {
  document.querySelectorAll('.file-label.active, .result-item.active').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('[data-path]').forEach(el => { if (el.dataset.path === path) el.classList.add('active'); });
  state.currentPath = path;
}

function openParentsByFilePath(path) {
  const target = Array.from(document.querySelectorAll('.file-label')).find(el => el.dataset.path === path);
  if (!target) return;
  let node = target.closest('.folder-children');
  while (node) {
    const folder = node.parentElement;
    if (folder && folder.classList.contains('folder')) {
      folder.classList.add('open');
      const caret = folder.querySelector(':scope > .folder-label .caret');
      if (caret) caret.textContent = '▾';
    }
    node = folder ? folder.closest('.folder-children') : null;
  }
}

function getSiblingFiles(fileId) {
  const found = findNodeAndParentById(fileId);
  if (!found.parent || found.parent.type !== 'folder') return [];
  return (found.parent.children || []).filter(child => child.type === 'file' && matchesAudienceFilter(child));
}

function getLightboxWrap() {
  return els.lightbox.querySelector('.lightbox-img-wrap');
}
function clampLightboxPan() {
  if (state.lightboxScale <= 1) {
    state.lightboxPanX = 0;
    state.lightboxPanY = 0;
    return;
  }
  const wrap = getLightboxWrap();
  const img = els.lightboxImage;
  if (!wrap || !img || !img.clientWidth || !img.clientHeight) return;
  const scaledW = img.clientWidth * state.lightboxScale;
  const scaledH = img.clientHeight * state.lightboxScale;
  const maxX = Math.max(0, (scaledW - wrap.clientWidth) / 2);
  const maxY = Math.max(0, (scaledH - wrap.clientHeight) / 2);
  state.lightboxPanX = Math.max(-maxX, Math.min(maxX, state.lightboxPanX));
  state.lightboxPanY = Math.max(-maxY, Math.min(maxY, state.lightboxPanY));
}
function stopLightboxDrag() {
  state.lightboxDragging = false;
  const wrap = getLightboxWrap();
  if (wrap) wrap.classList.remove('dragging');
}
function applyLightboxTransform() {
  clampLightboxPan();
  els.lightboxImage.style.transform = 'translate3d(' + state.lightboxPanX + 'px,' + state.lightboxPanY + 'px,0) scale(' + state.lightboxScale + ')';
  els.lightboxImage.classList.toggle('can-pan', state.lightboxScale > 1);
}
function fitLightboxToWidth() {
  state.lightboxScale = 1;
  state.lightboxPanX = 0;
  state.lightboxPanY = 0;
  stopLightboxDrag();
  applyLightboxTransform();
  const wrap = getLightboxWrap();
  if (wrap) {
    wrap.scrollLeft = 0;
    wrap.scrollTop = 0;
  }
}
function resetLightboxView() {
  fitLightboxToWidth();
}
function openLightboxFromFile(file) {
  if (!file || !isImageExt(file.ext)) return;
  state.lightboxGallery = getSiblingFiles(file.id).filter(f => isImageExt(f.ext));
  state.lightboxIndex = state.lightboxGallery.findIndex(f => f.id === file.id);
  state.lightboxScale = 1;
  state.lightboxPanX = 0;
  state.lightboxPanY = 0;
  els.lightboxImage.src = fileSrc(file);
  els.lightboxImage.alt = file.title || 'Póster ampliado';
  els.lightboxTitle.textContent = file.title || '';
  applyLightboxTransform();
  els.lightbox.classList.add('open');
}
async function toggleFullscreenLightbox() {
  const target = getLightboxWrap() || els.lightbox;
  if (!document.fullscreenElement) {
    if (target.requestFullscreen) {
      await target.requestFullscreen();
    } else {
      alert('La pantalla completa no está disponible en este navegador.');
    }
  } else {
    if (document.exitFullscreen) await document.exitFullscreen();
  }
}

async function closeLightbox() {
  stopLightboxDrag();
  if (document.fullscreenElement && document.exitFullscreen) {
    try { await document.exitFullscreen(); } catch (e) {}
  }
  els.lightbox.classList.remove('open');
  els.lightboxImage.removeAttribute('src');
}
function lightboxShowAt(index) {
  if (!state.lightboxGallery.length) return;
  if (index < 0) index = state.lightboxGallery.length - 1;
  if (index >= state.lightboxGallery.length) index = 0;
  const file = state.lightboxGallery[index];
  if (!file || !isImageExt(file.ext)) return;
  state.lightboxIndex = index;
  state.lightboxScale = 1;
  state.lightboxPanX = 0;
  state.lightboxPanY = 0;
  els.lightboxImage.src = fileSrc(file);
  els.lightboxImage.alt = file.title || 'Póster ampliado';
  els.lightboxTitle.textContent = file.title || '';
  applyLightboxTransform();
}

function clearSectionButtons() {
  if (els.calculadorasBtn) els.calculadorasBtn.classList.remove('active');
  if (els.protocolosBtn) els.protocolosBtn.classList.remove('active');
  if (els.dutydoctorBtn) els.dutydoctorBtn.classList.remove('active');
}

function showHome() {
  closeLightbox().catch(() => {});
  closeHtmlLightbox().catch(() => {});
  closePdfLightbox().catch(() => {});
  state.currentFile = null;
  state.currentFileParentId = null;
  state.currentPath = null;
  state.selectedId = null;
  state.selectedType = null;
  document.querySelectorAll('.file-label.active, .result-item.active, .folder-label.selected').forEach(el => el.classList.remove('active', 'selected'));
  clearSectionButtons();
  els.selectedInfo.textContent = 'Selección actual: ninguna';
  els.title.textContent = 'Cuidados intensivos';
  els.meta.textContent = 'Inicio';
  els.crumbs.textContent = 'Inicio';
  els.viewer.innerHTML =
    '<div class="home-view">' +
      '<img class="home-image" src="' + escapeHtml(normalizeAssetPath(HOME_IMAGE)) + '" alt="Cuidados intensivos">' +
    '</div>';
}

function showCalculadoras() {
  closeLightbox().catch(() => {});
  closeHtmlLightbox().catch(() => {});
  closePdfLightbox().catch(() => {});
  state.currentFile = null;
  state.currentFileParentId = null;
  state.currentPath = null;
  state.selectedId = null;
  state.selectedType = null;
  document.querySelectorAll('.file-label.active, .result-item.active, .folder-label.selected').forEach(el => el.classList.remove('active', 'selected'));
  clearSectionButtons();
  if (els.calculadorasBtn) els.calculadorasBtn.classList.add('active');
  els.selectedInfo.textContent = 'Selección actual: Calculadoras';
  els.title.textContent = 'Calculadoras';
  els.meta.textContent = 'Dashboards de cálculo';
  els.crumbs.textContent = 'Calculadoras';
  const cards = CALCULADORAS.map(calc =>
    '<button type="button" class="calculadora-card" data-calc-id="' + escapeHtml(calc.id) + '">' +
      '<span class="calculadora-card-title">' + escapeHtml(calc.title) + '</span>' +
      '<span class="calculadora-card-desc">' + escapeHtml(calc.description) + '</span>' +
      '<span class="calculadora-card-cta">Abrir</span>' +
    '</button>'
  ).join('');
  els.viewer.innerHTML =
    '<div class="calculadoras-panel">' +
      '<div class="calculadoras-panel-head">' +
        '<div>' +
          '<h2 class="calculadoras-title">Calculadoras</h2>' +
          '<p class="calculadoras-lead">Elige un dashboard de cálculo.</p>' +
        '</div>' +
        '<button type="button" class="btn" id="closeCalculadorasSectionBtn">Cerrar</button>' +
      '</div>' +
      '<div class="calculadoras-grid" id="calculadorasGrid">' + cards + '</div>' +
    '</div>';
  const closeSectionBtn = document.getElementById('closeCalculadorasSectionBtn');
  if (closeSectionBtn) closeSectionBtn.addEventListener('click', () => showHome());
  els.viewer.querySelectorAll('.calculadora-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const calc = CALCULADORAS.find(c => c.id === btn.dataset.calcId);
      if (calc) openCalculadora(calc);
    });
  });
}

function openCalculadora(calc) {
  if (!calc) return;
  closeLightbox().catch(() => {});
  closeHtmlLightbox().catch(() => {});
  closePdfLightbox().catch(() => {});
  clearSectionButtons();
  if (els.calculadorasBtn) els.calculadorasBtn.classList.add('active');
  els.title.textContent = calc.title;
  els.meta.textContent = calc.url ? 'Enlace externo' : 'Calculadora';
  els.crumbs.textContent = 'Calculadoras / ' + calc.title;
  els.selectedInfo.textContent = 'Selección actual: ' + calc.title;
  const src = calc.url || normalizeAssetPath(calc.path);
  const openExternalBtn = calc.url
    ? '<a class="btn" href="' + escapeHtml(calc.url) + '" target="_blank" rel="noopener noreferrer">Abrir en pestaña</a>'
    : '';
  els.viewer.innerHTML =
    '<div class="calculadora-view">' +
      '<div class="calculadora-toolbar">' +
        '<div class="calculadora-toolbar-title">' + escapeHtml(calc.title) + '</div>' +
        '<div class="calculadora-toolbar-actions">' +
          openExternalBtn +
          '<button type="button" class="btn btn-accent" id="closeCalculadoraBtn">Cerrar</button>' +
        '</div>' +
      '</div>' +
      '<iframe class="calculadora-frame" id="calculadoraFrame" title="' + escapeHtml(calc.title) + '" src="' + escapeHtml(src) + '"></iframe>' +
    '</div>';
  const closeBtn = document.getElementById('closeCalculadoraBtn');
  if (closeBtn) closeBtn.addEventListener('click', () => showCalculadoras());
}

function openDutyDoctor() {
  closeLightbox().catch(() => {});
  closeHtmlLightbox().catch(() => {});
  closePdfLightbox().catch(() => {});
  state.currentFile = null;
  state.currentFileParentId = null;
  state.currentPath = null;
  state.selectedId = null;
  state.selectedType = null;
  document.querySelectorAll('.file-label.active, .result-item.active, .folder-label.selected').forEach(el => el.classList.remove('active', 'selected'));
  clearSectionButtons();
  if (els.dutydoctorBtn) els.dutydoctorBtn.classList.add('active');
  els.title.textContent = DUTYDOCTOR.title;
  els.meta.textContent = 'Enlace externo';
  els.crumbs.textContent = DUTYDOCTOR.title;
  els.selectedInfo.textContent = 'Selección actual: ' + DUTYDOCTOR.title;
  els.viewer.innerHTML =
    '<div class="calculadora-view">' +
      '<div class="calculadora-toolbar">' +
        '<div class="calculadora-toolbar-title">' + escapeHtml(DUTYDOCTOR.title) + '</div>' +
        '<div class="calculadora-toolbar-actions">' +
          '<a class="btn" href="' + escapeHtml(DUTYDOCTOR.url) + '" target="_blank" rel="noopener noreferrer">Abrir en pestaña</a>' +
          '<button type="button" class="btn btn-accent" id="closeDutyDoctorBtn">Cerrar</button>' +
        '</div>' +
      '</div>' +
      '<iframe class="calculadora-frame" id="dutydoctorFrame" title="' + escapeHtml(DUTYDOCTOR.title) + '" src="' + escapeHtml(DUTYDOCTOR.url) + '"></iframe>' +
    '</div>';
  const closeBtn = document.getElementById('closeDutyDoctorBtn');
  if (closeBtn) closeBtn.addEventListener('click', () => showHome());
}

function visibleProtocolos() {
  return PROTOCOLOS.filter(item => getAudiences(item).includes(state.audienceFilter));
}

function showProtocolos() {
  closeLightbox().catch(() => {});
  closeHtmlLightbox().catch(() => {});
  closePdfLightbox().catch(() => {});
  state.currentFile = null;
  state.currentFileParentId = null;
  state.currentPath = null;
  state.selectedId = null;
  state.selectedType = null;
  document.querySelectorAll('.file-label.active, .result-item.active, .folder-label.selected').forEach(el => el.classList.remove('active', 'selected'));
  clearSectionButtons();
  if (els.protocolosBtn) els.protocolosBtn.classList.add('active');
  els.selectedInfo.textContent = 'Selección actual: Protocolos UCI';
  els.title.textContent = 'Protocolos UCI';
  els.meta.textContent = 'Protocolos clínicos';
  els.crumbs.textContent = 'Protocolos UCI';
  const list = visibleProtocolos();
  const cards = list.length
    ? list.map(item =>
      '<button type="button" class="calculadora-card" data-protocolo-id="' + escapeHtml(item.id) + '">' +
        '<span class="calculadora-card-title">' + escapeHtml(item.title) + '</span>' +
        '<span class="calculadora-card-desc">' + escapeHtml(item.description) + '</span>' +
        '<span class="calculadora-card-cta">Abrir</span>' +
      '</button>'
    ).join('')
    : '<div class="empty"><strong>Protocolos UCI</strong>No hay protocolos para ' + escapeHtml(audienceLabel(state.audienceFilter)) + '.</div>';
  els.viewer.innerHTML =
    '<div class="calculadoras-panel">' +
      '<div class="calculadoras-panel-head">' +
        '<div>' +
          '<h2 class="calculadoras-title">Protocolos UCI</h2>' +
          '<p class="calculadoras-lead">Elige un protocolo para visualizarlo.</p>' +
        '</div>' +
        '<button type="button" class="btn" id="closeProtocolosSectionBtn">Cerrar</button>' +
      '</div>' +
      '<div class="calculadoras-grid" id="protocolosGrid">' + cards + '</div>' +
    '</div>';
  const closeSectionBtn = document.getElementById('closeProtocolosSectionBtn');
  if (closeSectionBtn) closeSectionBtn.addEventListener('click', () => showHome());
  els.viewer.querySelectorAll('[data-protocolo-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = PROTOCOLOS.find(p => p.id === btn.dataset.protocoloId);
      if (item) openProtocolo(item);
    });
  });
}

function openProtocolo(item) {
  if (!item) return;
  closeLightbox().catch(() => {});
  closeHtmlLightbox().catch(() => {});
  closePdfLightbox().catch(() => {});
  clearSectionButtons();
  if (els.protocolosBtn) els.protocolosBtn.classList.add('active');
  const parts = item.parts || [];
  if (parts.length === 1) {
    openProtocoloPart(item, parts[0]);
    return;
  }
  if (!parts.length && (item.path || item.url)) {
    openProtocoloPart(item, item);
    return;
  }
  els.title.textContent = item.title;
  els.meta.textContent = fileAudienceLabel(item);
  els.crumbs.textContent = 'Protocolos UCI / ' + item.title;
  els.selectedInfo.textContent = 'Selección actual: ' + item.title;
  const cards = parts.map(part =>
    '<button type="button" class="calculadora-card" data-part-id="' + escapeHtml(part.id) + '">' +
      '<span class="calculadora-card-title">' + escapeHtml(part.title) + '</span>' +
      '<span class="calculadora-card-desc">' + escapeHtml(part.description || '') + '</span>' +
      '<span class="calculadora-card-cta">Abrir</span>' +
    '</button>'
  ).join('');
  els.viewer.innerHTML =
    '<div class="calculadoras-panel">' +
      '<div class="calculadoras-panel-head">' +
        '<div>' +
          '<h2 class="calculadoras-title">' + escapeHtml(item.title) + '</h2>' +
          '<p class="calculadoras-lead">Elige la parte que quieres visualizar.</p>' +
        '</div>' +
        '<button type="button" class="btn" id="backProtocolosBtn">Volver</button>' +
      '</div>' +
      '<div class="calculadoras-grid">' + cards + '</div>' +
    '</div>';
  const backBtn = document.getElementById('backProtocolosBtn');
  if (backBtn) backBtn.addEventListener('click', () => showProtocolos());
  els.viewer.querySelectorAll('[data-part-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const part = parts.find(p => p.id === btn.dataset.partId);
      if (part) openProtocoloPart(item, part);
    });
  });
}

function openProtocoloPart(protocolo, part) {
  if (!protocolo || !part) return;
  closeLightbox().catch(() => {});
  closeHtmlLightbox().catch(() => {});
  closePdfLightbox().catch(() => {});
  clearSectionButtons();
  if (els.protocolosBtn) els.protocolosBtn.classList.add('active');
  const ext = part.ext || extFromName(part.path || '') || '.pdf';
  const src = part.url || normalizeAssetPath(part.path);
  const fileLike = { id: protocolo.id + '-' + (part.id || 'doc'), title: part.title, ext, path: src, source: 'asset' };
  els.title.textContent = part.title;
  els.meta.textContent = kindLabel(ext) + ' · ' + protocolo.title;
  els.crumbs.textContent = 'Protocolos UCI / ' + protocolo.title + ' / ' + part.title;
  els.selectedInfo.textContent = 'Selección actual: ' + part.title;
  const backBtn = '<button type="button" class="btn" id="closeProtocoloBtn">Volver</button>';
  if (ext === '.pdf') {
    const pdfSrc = src + (src.includes('#') ? '' : '#view=FitH&toolbar=1&navpanes=0');
    els.viewer.innerHTML =
      '<div class="calculadora-view">' +
        '<div class="calculadora-toolbar">' +
          '<div class="calculadora-toolbar-title">' + escapeHtml(part.title) + '</div>' +
          '<div class="calculadora-toolbar-actions">' + backBtn + '</div>' +
        '</div>' +
        '<div class="viewer-pdf-wrap">' +
          '<iframe class="viewer-pdf-frame" id="viewerPdfFrame" title="' + escapeHtml(part.title) + '" src="' + escapeHtml(pdfSrc) + '"></iframe>' +
          '<button type="button" class="viewer-html-open" id="openPdfLbBtn">Ampliar a pantalla completa</button>' +
        '</div>' +
      '</div>';
    const openPdfBtn = document.getElementById('openPdfLbBtn');
    if (openPdfBtn) openPdfBtn.addEventListener('click', () => openPdfLightbox(fileLike));
  } else if (isImageExt(ext)) {
    els.viewer.innerHTML =
      '<div class="calculadora-view">' +
        '<div class="calculadora-toolbar">' +
          '<div class="calculadora-toolbar-title">' + escapeHtml(part.title) + '</div>' +
          '<div class="calculadora-toolbar-actions">' + backBtn + '</div>' +
        '</div>' +
        '<img class="fit-poster" src="' + escapeHtml(src) + '" alt="' + escapeHtml(part.title) + '">' +
      '</div>';
    const img = els.viewer.querySelector('img');
    if (img) img.addEventListener('click', () => openLightboxFromFile(fileLike));
  } else if (isHtmlExt(ext) && part.view !== 'document') {
    els.viewer.innerHTML =
      '<div class="calculadora-view">' +
        '<div class="calculadora-toolbar">' +
          '<div class="calculadora-toolbar-title">' + escapeHtml(part.title) + '</div>' +
          '<div class="calculadora-toolbar-actions">' + backBtn + '</div>' +
        '</div>' +
        '<div class="viewer-html-wrap">' +
          '<div class="viewer-html-stage" id="viewerHtmlStage">' +
            '<div class="viewer-html-board" id="viewerHtmlBoard">' +
              '<iframe class="html-poster" id="viewerHtmlFrame" title="' + escapeHtml(part.title) + '" scrolling="no" src="' + escapeHtml(src) + '" sandbox="allow-scripts allow-same-origin allow-popups allow-forms"></iframe>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="viewer-html-open" id="openHtmlLbBtn">Ampliar a pantalla completa</button>' +
        '</div>' +
      '</div>';
    const openBtn = document.getElementById('openHtmlLbBtn');
    if (openBtn) openBtn.addEventListener('click', () => openHtmlLightbox(fileLike));
    const previewFrame = document.getElementById('viewerHtmlFrame');
    if (previewFrame) {
      previewFrame.addEventListener('load', () => fitHtmlPreview());
      if (previewFrame.contentDocument?.readyState === 'complete') fitHtmlPreview();
    }
  } else {
    els.viewer.innerHTML =
      '<div class="calculadora-view">' +
        '<div class="calculadora-toolbar">' +
          '<div class="calculadora-toolbar-title">' + escapeHtml(part.title) + '</div>' +
          '<div class="calculadora-toolbar-actions">' + backBtn + '</div>' +
        '</div>' +
        '<iframe class="calculadora-frame" id="protocoloFrame" title="' + escapeHtml(part.title) + '" src="' + escapeHtml(src) + '"></iframe>' +
      '</div>';
  }
  const closeBtn = document.getElementById('closeProtocoloBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if ((protocolo.parts || []).length <= 1) showProtocolos();
      else openProtocolo(protocolo);
    });
  }
}

function showFile(file) {
  if (!file) return;
  const found = findNodeAndParentById(file.id);
  state.currentFile = file;
  state.currentFileParentId = found.parent?.id || null;
  setActive(file.path || file.id);
  setSelection(file.id, 'file');
  els.title.textContent = file.title;
  const canZoom = isImageExt(file.ext) || isHtmlExt(file.ext) || file.ext === '.pdf';
  let metaExtra = '';
  if (isImageExt(file.ext)) metaExtra = ' · clic para ampliar';
  else if (isHtmlExt(file.ext) || file.ext === '.pdf') metaExtra = ' · scroll y pantalla completa';
  els.meta.textContent = kindLabel(file.ext) + ' · ' + fileAudienceLabel(file) + ' · ' + (file.specialty || 'General') + metaExtra;
  els.crumbs.textContent = file.breadcrumb || file.title;
  const src = fileSrc(file);
  if (file.ext === '.pdf') {
    const pdfSrc = src + (src.includes('#') ? '' : '#view=FitH&toolbar=1&navpanes=0');
    els.viewer.innerHTML =
      '<div class="viewer-pdf-wrap">' +
        '<iframe class="viewer-pdf-frame" id="viewerPdfFrame" title="' + escapeHtml(file.title) + '" src="' + escapeHtml(pdfSrc) + '"></iframe>' +
        '<button type="button" class="viewer-html-open" id="openPdfLbBtn">Ampliar a pantalla completa</button>' +
      '</div>';
    const openPdfBtn = document.getElementById('openPdfLbBtn');
    if (openPdfBtn) openPdfBtn.addEventListener('click', () => openPdfLightbox(file));
  } else if (isHtmlExt(file.ext)) {
    els.viewer.innerHTML =
      '<div class="viewer-html-wrap">' +
        '<div class="viewer-html-stage" id="viewerHtmlStage">' +
          '<div class="viewer-html-board" id="viewerHtmlBoard">' +
            '<iframe class="html-poster" id="viewerHtmlFrame" title="' + escapeHtml(file.title) + '" scrolling="no" src="' + escapeHtml(src) + '" sandbox="allow-scripts allow-same-origin allow-popups allow-forms"></iframe>' +
          '</div>' +
        '</div>' +
        '<button type="button" class="viewer-html-open" id="openHtmlLbBtn">Ampliar a pantalla completa</button>' +
      '</div>';
    const openBtn = document.getElementById('openHtmlLbBtn');
    if (openBtn) openBtn.addEventListener('click', () => openHtmlLightbox(file));
    const previewFrame = document.getElementById('viewerHtmlFrame');
    if (previewFrame) {
      previewFrame.addEventListener('load', () => fitHtmlPreview());
      if (previewFrame.contentDocument?.readyState === 'complete') fitHtmlPreview();
    }
  } else {
    els.viewer.innerHTML = '<img class="fit-poster" src="' + escapeHtml(src) + '" alt="' + escapeHtml(file.title) + '">';
    const img = els.viewer.querySelector('img');
    img.addEventListener('click', () => openLightboxFromFile(file));
  }
  openParentsByFilePath(file.path || file.id);
}

function prepareHtmlDocument(doc, forMeasure, mode = 'poster') {
  if (!doc || !doc.documentElement) return;
  let style = doc.getElementById('dashboard-html-viewer-fix');
  if (!style) {
    style = doc.createElement('style');
    style.id = 'dashboard-html-viewer-fix';
    (doc.head || doc.documentElement).appendChild(style);
  }
  const overflow = forMeasure ? 'visible' : 'hidden';
  if (mode === 'table') {
    style.textContent = [
      'html, body { margin: 0 !important; padding: 0 !important; overflow: ' + overflow + ' !important; height: auto !important; max-width: none !important; }',
      '.wrap, .table-wrap, main, section { overflow: visible !important; max-width: none !important; }',
      'table { width: max-content !important; max-width: none !important; }'
    ].join('\n');
  } else {
    // Pósteres HTML: conservar padding y max-width para medir el tamaño real (legible)
    style.textContent = [
      'html, body { overflow: ' + overflow + ' !important; height: auto !important; }',
      '.wrap, .table-wrap, main, section { overflow: visible !important; }'
    ].join('\n');
  }
  try {
    doc.documentElement.style.overflow = overflow;
    if (doc.body) doc.body.style.overflow = overflow;
  } catch (e) {}
}

function detectHtmlLayoutMode(doc) {
  if (!doc || !doc.body) return 'poster';
  if (doc.querySelector('.wrap')) return 'poster';
  const table = doc.querySelector('table');
  if (!table) return 'poster';
  const bodyKids = Array.from(doc.body.children).filter(el => el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE');
  if (bodyKids.some(el => el.tagName === 'TABLE' || el.classList.contains('post-tabla') || el.classList.contains('table-wrap'))) {
    return 'table';
  }
  return 'poster';
}

function readHtmlContentSize(iframe) {
  let w = 1200;
  let h = 800;
  try {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc || !doc.documentElement) return { w, h };
    const mode = detectHtmlLayoutMode(doc);
    prepareHtmlDocument(doc, true, mode);
    const body = doc.body;
    const root = doc.documentElement;
    iframe.style.zoom = '1';
    iframe.style.transform = 'none';
    if (mode === 'table') {
      // Lienzo grande para que la tabla no se comprima al medir
      iframe.style.width = '5000px';
      iframe.style.height = '20000px';
      void root.offsetHeight;
      const table = doc.querySelector('table');
      const tableRect = table ? table.getBoundingClientRect() : null;
      w = Math.max(
        root.scrollWidth || 0,
        body ? body.scrollWidth : 0,
        body ? body.offsetWidth : 0,
        tableRect ? Math.ceil(tableRect.width) : 0,
        900
      );
      h = Math.max(
        root.scrollHeight || 0,
        body ? body.scrollHeight : 0,
        body ? body.offsetHeight : 0,
        tableRect && body ? Math.ceil(tableRect.bottom - body.getBoundingClientRect().top + 40) : 0,
        700
      );
    } else {
      // Medir el póster a su ancho natural, sin expandirlo a 5000px
      iframe.style.width = '1400px';
      iframe.style.height = '12000px';
      void root.offsetHeight;
      const wrap = doc.querySelector('.wrap');
      const target = wrap || body || root;
      const rect = target.getBoundingClientRect();
      w = Math.max(
        Math.ceil(rect.width),
        wrap ? wrap.scrollWidth : 0,
        body ? Math.min(body.scrollWidth, 1400) : 0,
        900
      );
      h = Math.max(
        Math.ceil(rect.height),
        wrap ? wrap.scrollHeight : 0,
        body ? body.scrollHeight : 0,
        root.scrollHeight || 0,
        700
      );
      // Incluir padding del body
      if (body) {
        const cs = doc.defaultView.getComputedStyle(body);
        const padX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
        const padY = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
        w = Math.ceil(w + padX);
        h = Math.ceil(h + padY);
      }
    }
    prepareHtmlDocument(doc, false, mode);
  } catch (e) {}
  return { w: Math.ceil(w), h: Math.ceil(h) };
}

function fitHtmlPreview() {
  const stage = document.getElementById('viewerHtmlStage');
  const board = document.getElementById('viewerHtmlBoard');
  const iframe = document.getElementById('viewerHtmlFrame');
  if (!stage || !board || !iframe) return;
  const size = readHtmlContentSize(iframe);
  iframe.style.width = size.w + 'px';
  iframe.style.height = size.h + 'px';
  board.style.width = size.w + 'px';
  board.style.height = size.h + 'px';
  board.style.transform = 'none';
  const pad = 8;
  // Preferir legibilidad: no achicar por debajo de ~95%; scroll horizontal si hace falta
  const raw = Math.max(80, stage.clientWidth - pad) / size.w;
  const scale = Math.min(1, Math.max(raw, 0.95));
  board.style.zoom = String(scale);
  stage.scrollLeft = 0;
  stage.scrollTop = 0;
}

function applyHtmlLbTransform() {
  const board = els.htmlLbBoard;
  const iframe = els.htmlLbFrame;
  const scale = state.htmlLbScale;
  iframe.style.width = state.htmlLbNaturalW + 'px';
  iframe.style.height = state.htmlLbNaturalH + 'px';
  board.style.width = state.htmlLbNaturalW + 'px';
  board.style.height = state.htmlLbNaturalH + 'px';
  board.style.transform = 'none';
  // zoom cambia el tamaño layout: permite scroll real en ambos ejes
  board.style.zoom = String(scale);
  els.htmlLbZoomLabel.textContent = Math.round(scale * 100) + '%';
}

function fitHtmlLightbox() {
  const size = readHtmlContentSize(els.htmlLbFrame);
  state.htmlLbNaturalW = size.w;
  state.htmlLbNaturalH = size.h;
  const stage = els.htmlLbStage;
  const pad = 16;
  const availW = Math.max(200, stage.clientWidth - pad);
  const raw = availW / size.w;
  const scale = Math.min(1, Math.max(raw, 0.95));
  state.htmlLbFitScale = scale;
  state.htmlLbScale = scale;
  applyHtmlLbTransform();
  stage.scrollLeft = 0;
  stage.scrollTop = 0;
}

function setHtmlLbScale(next) {
  const stage = els.htmlLbStage;
  const prev = state.htmlLbScale || 1;
  const scale = Math.max(0.15, Math.min(5, next));
  const midX = stage.scrollLeft + stage.clientWidth / 2;
  const midY = stage.scrollTop + stage.clientHeight / 2;
  const contentX = midX / prev;
  const contentY = midY / prev;
  state.htmlLbScale = scale;
  applyHtmlLbTransform();
  stage.scrollLeft = contentX * scale - stage.clientWidth / 2;
  stage.scrollTop = contentY * scale - stage.clientHeight / 2;
}

function openHtmlLightbox(file) {
  if (!file || !isHtmlExt(file.ext)) return;
  closeLightbox();
  closePdfLightbox().catch(() => {});
  els.htmlLbTitle.textContent = file.title || 'Póster HTML';
  els.htmlLightbox.classList.add('open');
  els.htmlLightbox.setAttribute('aria-hidden', 'false');
  const src = fileSrc(file);
  const frame = els.htmlLbFrame;
  const onLoad = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => fitHtmlLightbox());
    });
  };
  frame.onload = onLoad;
  if (frame.getAttribute('src') !== src) frame.src = src;
  else onLoad();
}

async function toggleHtmlLightboxFullscreen() {
  const target = els.htmlLightbox;
  if (!document.fullscreenElement) {
    if (target.requestFullscreen) await target.requestFullscreen();
    else alert('La pantalla completa no está disponible en este navegador.');
  } else if (document.exitFullscreen) {
    await document.exitFullscreen();
  }
}

async function closeHtmlLightbox() {
  if (document.fullscreenElement === els.htmlLightbox) {
    try { await document.exitFullscreen(); } catch (e) {}
  }
  els.htmlLightbox.classList.remove('open');
  els.htmlLightbox.setAttribute('aria-hidden', 'true');
  state.htmlLbDragging = false;
  els.htmlLbStage.classList.remove('dragging');
}

function pdfViewerSrc(file) {
  const src = fileSrc(file);
  return src + (src.includes('#') ? '' : '#view=FitH&toolbar=1&navpanes=0');
}

function openPdfLightbox(file) {
  if (!file || file.ext !== '.pdf') return;
  closeLightbox();
  closeHtmlLightbox().catch(() => {});
  els.pdfLbTitle.textContent = file.title || 'Póster PDF';
  els.pdfLbFrame.src = pdfViewerSrc(file);
  els.pdfLightbox.classList.add('open');
  els.pdfLightbox.setAttribute('aria-hidden', 'false');
}

async function togglePdfLightboxFullscreen() {
  const target = els.pdfLightbox;
  if (!document.fullscreenElement) {
    if (target.requestFullscreen) await target.requestFullscreen();
    else alert('La pantalla completa no está disponible en este navegador.');
  } else if (document.exitFullscreen) {
    await document.exitFullscreen();
  }
}

async function closePdfLightbox() {
  if (document.fullscreenElement === els.pdfLightbox) {
    try { await document.exitFullscreen(); } catch (e) {}
  }
  els.pdfLightbox.classList.remove('open');
  els.pdfLightbox.setAttribute('aria-hidden', 'true');
  els.pdfLbFrame.removeAttribute('src');
}

function clearDropTargets() {
  document.querySelectorAll('.folder-label.drop-target').forEach(el => el.classList.remove('drop-target'));
  document.querySelectorAll('.file-label.dragging, .result-item.dragging').forEach(el => el.classList.remove('dragging'));
}

function thumbMarkup(node) {
  if (node.ext === '.pdf') return '<span class="file-thumb-placeholder">📄</span>';
  if (isHtmlExt(node.ext)) return '<span class="file-thumb-placeholder">🌐</span>';
  return '<img class="file-thumb" src="' + escapeHtml(fileSrc(node)) + '" alt="">';
}

function createNode(node) {
  if (node.type === 'file') {
    if (!matchesAudienceFilter(node)) return null;
    const wrap = document.createElement('div');
    wrap.className = 'file';
    const btn = document.createElement('button');
    btn.className = 'file-label';
    btn.dataset.path = node.path || node.id;
    btn.dataset.id = node.id;
    btn.draggable = true;
    btn.title = 'Arrastra este póster sobre una carpeta para moverlo';
    btn.innerHTML = thumbMarkup(node) + '<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(node.title) + '</span>';
    btn.addEventListener('click', () => showFile(node));
    btn.addEventListener('dragstart', e => {
      state.draggedItem = { id: node.id, type: 'file' };
      btn.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', node.id);
    });
    btn.addEventListener('dragend', () => { state.draggedItem = null; clearDropTargets(); });
    wrap.appendChild(btn);
    return wrap;
  }

  const wrap = document.createElement('div');
  wrap.className = 'folder';
  const label = document.createElement('button');
  label.className = 'folder-label';
  label.dataset.id = node.id;
  label.draggable = node.title !== 'Temas';
  const visibleCount = countFiles(node, true);
  const count = node.title === 'Temas' ? '' : '<span class="badge">' + visibleCount + '</span>';
  label.innerHTML = '<span class="caret">▸</span><span>📁</span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(node.title) + '</span>' + count;
  const children = document.createElement('div');
  children.className = 'folder-children';
  label.addEventListener('click', () => {
    wrap.classList.toggle('open');
    label.querySelector('.caret').textContent = wrap.classList.contains('open') ? '▾' : '▸';
    setSelection(node.id, 'folder');
  });
  label.addEventListener('dragstart', e => {
    if (node.title === 'Temas') return;
    state.draggedItem = { id: node.id, type: 'folder' };
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', node.id);
  });
  label.addEventListener('dragover', e => {
    if (!state.draggedItem) return;
    if (state.draggedItem.type === 'folder' && state.draggedItem.id === node.id) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    label.classList.add('drop-target');
    wrap.classList.add('open');
    label.querySelector('.caret').textContent = '▾';
  });
  label.addEventListener('dragleave', e => {
    if (!label.contains(e.relatedTarget)) label.classList.remove('drop-target');
  });
  label.addEventListener('drop', e => {
    e.preventDefault();
    label.classList.remove('drop-target');
    if (!state.draggedItem) return;
    if (state.draggedItem.type === 'file') moveFileToFolder(state.draggedItem.id, node.id, true);
    if (state.draggedItem.type === 'folder') moveFolderToFolder(state.draggedItem.id, node.id, true);
    state.draggedItem = null;
    clearDropTargets();
  });
  (node.children || []).forEach(child => {
    const childEl = createNode(child);
    if (childEl) children.appendChild(childEl);
  });
  wrap.appendChild(label);
  wrap.appendChild(children);
  return wrap;
}

function renderTree() {
  countFiles(state.tree);
  rebuildMetadata(state.tree);
  ensureAudience(state.tree);
  els.tree.innerHTML = '';
  (state.tree.children || []).forEach(child => {
    const childEl = createNode(child);
    if (childEl) els.tree.appendChild(childEl);
  });
  updateStats();
  updateAudienceButtons();
  if (state.currentFile) openParentsByFilePath(state.currentFile.path || state.currentFile.id);
  if (state.currentPath) setActive(state.currentPath);
  if (state.selectedId) setSelection(state.selectedId, state.selectedType);
}

function expandAllFolders() {
  document.querySelectorAll('.tree .folder').forEach(folder => folder.classList.add('open'));
  document.querySelectorAll('.tree .folder .caret').forEach(caret => { caret.textContent = '▾'; });
}

function collapseAllFolders() {
  document.querySelectorAll('.tree .folder.open').forEach(folder => folder.classList.remove('open'));
  document.querySelectorAll('.tree .folder .caret').forEach(caret => { caret.textContent = '▸'; });
}

function renderMoveTargets() {
  const previousPoster = els.moveTargetSelect.value;
  const previousFolder = els.moveFolderTargetSelect.value;
  const folders = listAllFolders();
  const baseOption = '<option value="">Selecciona carpeta destino</option>';
  els.moveTargetSelect.innerHTML = baseOption;
  els.moveFolderTargetSelect.innerHTML = baseOption;
  folders.forEach(folder => {
    const opt1 = document.createElement('option');
    opt1.value = folder.id;
    opt1.textContent = folder.label;
    els.moveTargetSelect.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = folder.id;
    opt2.textContent = folder.label;
    els.moveFolderTargetSelect.appendChild(opt2);
  });
  if (folders.some(f => f.id === previousPoster)) els.moveTargetSelect.value = previousPoster;
  if (folders.some(f => f.id === previousFolder)) els.moveFolderTargetSelect.value = previousFolder;
}

function renderSearch(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) {
    els.results.style.display = 'none';
    els.tree.style.display = 'block';
    els.results.innerHTML = '';
    return;
  }
  const matches = flattenVisible(state.tree).filter(f => (f.title + ' ' + f.breadcrumb + ' ' + (f.specialty || '') + ' ' + fileAudienceLabel(f)).toLowerCase().includes(q)).slice(0, 100);
  els.tree.style.display = 'none';
  els.results.style.display = 'block';
  if (!matches.length) {
    els.results.innerHTML = '<div class="empty">Sin resultados</div>';
    return;
  }
  els.results.innerHTML = '';
  matches.forEach(file => {
    const btn = document.createElement('button');
    btn.className = 'result-item';
    btn.dataset.path = file.path || file.id;
    btn.dataset.id = file.id;
    btn.draggable = true;
    btn.title = 'Arrastra este póster sobre una carpeta para moverlo';
    btn.innerHTML = thumbMarkup(file) + '<span style="min-width:0;overflow:hidden;"><strong style="display:block;font-size:13px;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(file.title) + '</strong><small style="color:var(--muted);display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(file.breadcrumb) + '</small></span>';
    btn.addEventListener('click', () => showFile(file));
    btn.addEventListener('dragstart', e => {
      state.draggedItem = { id: file.id, type: 'file' };
      btn.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', file.id);
    });
    btn.addEventListener('dragend', () => { state.draggedItem = null; clearDropTargets(); });
    els.results.appendChild(btn);
  });
  if (state.currentPath) setActive(state.currentPath);
}

function updateAudienceButtons() {
  document.querySelectorAll('.audience-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.audience === state.audienceFilter);
  });
}

function setAudienceFilter(audience) {
  if (!isValidAudience(audience) || audience === state.audienceFilter) return;
  state.audienceFilter = audience;
  updateAudienceButtons();
  renderTree();
  renderSearch(els.search.value);
  if (els.protocolosBtn && els.protocolosBtn.classList.contains('active')) {
    showProtocolos();
    return;
  }
  if (state.currentFile && !matchesAudienceFilter(state.currentFile)) {
    showHome();
  }
}

function updateStats() {
  const files = flattenVisible(state.tree);
  els.statFiles.textContent = files.length + ' pósteres (' + audienceLabel(state.audienceFilter) + ')';
  els.statAreas.textContent = listRootAreas().length + ' áreas';
  let saveText = 'Biblioteca base';
  if (state.lastSavedMode === 'saved_file') saveText = 'Guardada en archivo';
  else if (state.lastSavedMode === 'imported') saveText = 'Importada';
  else if (state.lastSavedMode === 'autosaved') saveText = 'Autoguardado local';
  else if (state.lastSavedMode === 'session_only') saveText = 'Solo en sesión';
  els.saveState.textContent = saveText;
  els.saveState.classList.toggle('saved-ok', saveText !== 'Biblioteca base' && saveText !== 'Solo en sesión');
  renderMoveTargets();
}

function updateInfoVisibility() {
  els.infoLine.style.display = state.infoVisible ? 'flex' : 'none';
  els.infoHiddenNote.style.display = state.infoVisible ? 'none' : 'block';
  els.toggleInfoBtn.textContent = state.infoVisible ? 'Ocultar info' : 'Mostrar info';
}

function showSavedFeedback(message = '✔ Biblioteca guardada') {
  els.savedFeedback.textContent = message;
  els.savedFeedback.classList.add('visible');
  setTimeout(() => els.savedFeedback.classList.remove('visible'), 2800);
}

function pickTargetFolder() {
  if (!state.selectedId) return null;
  const found = findNodeAndParentById(state.selectedId);
  if (!found.node) return null;
  if (found.node.type === 'folder') return found.node;
  return found.parent && found.parent.type === 'folder' ? found.parent : null;
}

async function readFilesAsUploads(fileList) {
  const accepted = [];
  const selectedAudience = els.newPosterAudienceSelect && els.newPosterAudienceSelect.value;
  const audience = isSharedAudience(selectedAudience) || isValidAudience(selectedAudience)
    ? (isSharedAudience(selectedAudience) ? 'todos' : selectedAudience)
    : DEFAULT_AUDIENCE;
  for (const file of fileList) {
    const ext = extFromName(file.name);
    if (!VALID_EXTS.includes(ext)) continue;
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    accepted.push({
      id: uuid('u'),
      type: 'file',
      title: file.name.replace(/\.[^.]+$/, ''),
      ext,
      source: 'upload',
      dataUrl,
      audience
    });
  }
  return accepted;
}

function buildPortableSnapshot() {
  normalizeTreePaths(state.tree);
  return { kind: 'dashboard_medicina_biblioteca', version: 2, exportedAt: new Date().toISOString(), tree: state.tree };
}

function downloadText(filename, text, type = 'application/json') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function saveLibraryFile() {
  const snapshot = buildPortableSnapshot();
  const payload = 'window.BIBLIOTECA_DATA = ' + JSON.stringify(snapshot, null, 2) + ';\n';
  downloadText('biblioteca.js', payload, 'text/javascript');
  downloadText('biblioteca_guardada.json', JSON.stringify(snapshot, null, 2));
  state.lastSavedMode = 'saved_file';
  updateStats();
  showSavedFeedback('✔ Biblioteca guardada en biblioteca.js y JSON');
  alert('Se han descargado dos archivos: biblioteca.js y biblioteca_guardada.json. Conserva al menos uno de ellos para no perder cambios.');
}

function exportBackup() {
  downloadText('biblioteca_backup.json', JSON.stringify(buildPortableSnapshot(), null, 2));
  showSavedFeedback('✔ Copia JSON exportada');
}

function parseImportedLibrary(text) {
  const trimmed = text.replace(/^﻿/, '').trim();
  if (trimmed.startsWith('window.BIBLIOTECA_DATA')) {
    const eq = trimmed.indexOf('=');
    const content = trimmed.slice(eq + 1).replace(/;\s*$/, '');
    return JSON.parse(content);
  }
  const parsed = JSON.parse(trimmed);
  if (parsed && parsed.tree && parsed.tree.type === 'folder') return parsed;
  if (parsed && parsed.type === 'folder') return { tree: parsed };
  if (parsed && parsed.data && parsed.data.tree && parsed.data.tree.type === 'folder') return parsed.data;
  return parsed;
}

function addRootFolder() {
  const name = prompt('Nombre de la nueva carpeta principal');
  if (!name || !name.trim()) return;
  const folder = { id: uuid('f'), type: 'folder', title: name.trim(), children: [] };
  state.tree.children.push(folder);
  renderTree();
  setSelection(folder.id, 'folder');
  saveLocalState();
}

function addSubfolder() {
  const folder = pickTargetFolder();
  if (!folder) { alert('Selecciona una carpeta o un póster dentro de una carpeta.'); return; }
  const name = prompt('Nombre de la nueva subcarpeta');
  if (!name || !name.trim()) return;
  const child = { id: uuid('f'), type: 'folder', title: name.trim(), children: [] };
  folder.children.push(child);
  renderTree();
  setSelection(child.id, 'folder');
  saveLocalState();
}

function renameFolder() {
  if (!state.selectedId) { alert('Selecciona una carpeta.'); return; }
  const found = findNodeAndParentById(state.selectedId);
  if (!found.node || found.node.type !== 'folder') { alert('La selección actual no es una carpeta.'); return; }
  if (found.node.id === state.tree.id) { alert('La raíz no se renombra.'); return; }
  const name = prompt('Nuevo nombre de carpeta', found.node.title || '');
  if (!name || !name.trim()) return;
  found.node.title = name.trim();
  rebuildMetadata(state.tree);
  renderTree();
  renderSearch(els.search.value);
  saveLocalState();
}

function deleteFolder() {
  if (!state.selectedId) { alert('Selecciona una carpeta.'); return; }
  const found = findNodeAndParentById(state.selectedId);
  if (!found.node || found.node.type !== 'folder') { alert('La selección actual no es una carpeta.'); return; }
  if (found.node.id === state.tree.id) { alert('No se puede eliminar la raíz.'); return; }
  if (!found.parent) return;
  if (!confirm('¿Eliminar carpeta "' + found.node.title + '" y todo su contenido?')) return;
  found.parent.children = found.parent.children.filter(c => c.id !== found.node.id);
  state.selectedId = null;
  state.selectedType = null;
  renderTree();
  renderSearch(els.search.value);
  saveLocalState();
  const fallback = firstFile();
  if (fallback) showFile(fallback);
  else showHome();
}

function renamePoster() {
  if (!state.selectedId) { alert('Selecciona un póster.'); return; }
  const found = findNodeAndParentById(state.selectedId);
  if (!found.node || found.node.type !== 'file') { alert('La selección actual no es un póster.'); return; }
  const name = prompt('Nuevo nombre del póster', found.node.title || '');
  if (!name || !name.trim()) return;
  found.node.title = name.trim();
  rebuildMetadata(state.tree);
  renderTree();
  renderSearch(els.search.value);
  saveLocalState();
  if (state.currentFile && state.currentFile.id === found.node.id) showFile(found.node);
}

function deletePoster() {
  if (!state.selectedId) { alert('Selecciona un póster.'); return; }
  const found = findNodeAndParentById(state.selectedId);
  if (!found.node || found.node.type !== 'file' || !found.parent) { alert('La selección actual no es un póster.'); return; }
  if (!confirm('¿Eliminar póster "' + found.node.title + '"?')) return;
  found.parent.children = found.parent.children.filter(c => c.id !== found.node.id);
  state.selectedId = null;
  state.selectedType = null;
  const wasCurrent = state.currentFile && state.currentFile.id === found.node.id;
  renderTree();
  renderSearch(els.search.value);
  saveLocalState();
  if (wasCurrent) {
    const fallback = firstFile();
    if (fallback) showFile(fallback);
    else showHome();
  }
}

async function addFilesToFolder(files) {
  const folder = pickTargetFolder();
  if (!folder) { alert('Selecciona la carpeta de destino.'); return; }
  const uploads = await readFilesAsUploads(files);
  if (!uploads.length) { alert('No se han seleccionado archivos válidos.'); return; }
  folder.children.push(...uploads);
  rebuildMetadata(state.tree);
  const audience = getAudience(uploads[0]);
  if (audience !== state.audienceFilter) state.audienceFilter = audience;
  renderTree();
  renderSearch(els.search.value);
  saveLocalState();
  showFile(uploads[0]);
}

function moveFileToFolder(fileId, targetId, silent = false) {
  const source = findNodeAndParentById(fileId);
  if (!source.node || source.node.type !== 'file' || !source.parent) { if (!silent) alert('Selecciona primero un póster.'); return false; }
  if (!targetId) { if (!silent) alert('Selecciona la carpeta de destino.'); return false; }
  if (source.parent.id === targetId) { if (!silent) alert('Ese póster ya está en la carpeta de destino.'); return false; }
  const target = findNodeAndParentById(targetId);
  if (!target.node || target.node.type !== 'folder') { if (!silent) alert('Carpeta de destino no válida.'); return false; }
  source.parent.children = source.parent.children.filter(c => c.id !== source.node.id);
  target.node.children.push(source.node);
  rebuildMetadata(state.tree);
  renderTree();
  renderSearch(els.search.value);
  saveLocalState();
  showFile(source.node);
  return true;
}

function isDescendantFolder(sourceFolderId, targetFolderId) {
  const source = findNodeAndParentById(sourceFolderId).node;
  if (!source || source.type !== 'folder') return false;
  function walk(node) {
    if (node.id === targetFolderId) return true;
    if (node.type !== 'folder') return false;
    return (node.children || []).some(child => walk(child));
  }
  return (source.children || []).some(child => walk(child));
}

function moveFolderToFolder(folderId, targetId, silent = false) {
  const source = findNodeAndParentById(folderId);
  if (!source.node || source.node.type !== 'folder' || !source.parent) { if (!silent) alert('Selecciona primero una carpeta o subcarpeta.'); return false; }
  if (source.node.id === state.tree.id) { if (!silent) alert('La carpeta raíz no se puede mover.'); return false; }
  if (!targetId) { if (!silent) alert('Selecciona la carpeta de destino.'); return false; }
  if (folderId === targetId) { if (!silent) alert('No puedes mover una carpeta dentro de sí misma.'); return false; }
  if (isDescendantFolder(folderId, targetId)) { if (!silent) alert('No puedes mover una carpeta dentro de una de sus subcarpetas.'); return false; }
  if (source.parent.id === targetId) { if (!silent) alert('Esa carpeta ya está dentro del destino seleccionado.'); return false; }
  const target = findNodeAndParentById(targetId);
  if (!target.node || target.node.type !== 'folder') { if (!silent) alert('Carpeta de destino no válida.'); return false; }
  source.parent.children = source.parent.children.filter(c => c.id !== source.node.id);
  target.node.children.push(source.node);
  rebuildMetadata(state.tree);
  renderTree();
  renderSearch(els.search.value);
  saveLocalState();
  setSelection(source.node.id, 'folder');
  return true;
}

function moveSelectedPoster() {
  if (!state.selectedId) { alert('Selecciona un póster.'); return; }
  moveFileToFolder(state.selectedId, els.moveTargetSelect.value, false);
}

function moveSelectedFolder() {
  if (!state.selectedId) { alert('Selecciona una carpeta o subcarpeta.'); return; }
  const found = findNodeAndParentById(state.selectedId);
  if (!found.node || found.node.type !== 'folder') { alert('La selección actual no es una carpeta.'); return; }
  moveFolderToFolder(state.selectedId, els.moveFolderTargetSelect.value, false);
}

async function loadLibraryFromFile(file) {
  if (!file) return;
  try {
    const text = await file.text();
    const data = parseImportedLibrary(text);
    const importedTree = data.tree || data;
    if (!importedTree || importedTree.type !== 'folder') { alert('Archivo de biblioteca no válido o incompatible.'); return; }
    normalizeTreePaths(importedTree);
    ensureAudience(importedTree);
    state.tree = importedTree;
    rebuildMetadata(state.tree);
    renderTree();
    renderSearch('');
    const first = firstFile();
    if (first) showFile(first);
    const savedResult = await persistState(state.tree);
    state.lastSavedMode = savedResult.saved ? 'imported' : 'session_only';
    updateStats();
    if (savedResult.saved) {
      showSavedFeedback('✔ Biblioteca importada correctamente');
      alert('Biblioteca importada correctamente.');
    } else {
      showSavedFeedback('✔ Importada para esta sesión');
      alert('Biblioteca importada para esta sesión, pero no se pudo guardar localmente por tamaño. Usa Guardar biblioteca para conservarla.');
    }
  } catch (error) {
    console.error(error);
    alert('No se pudo importar este archivo. Prueba con el JSON exportado desde una versión anterior del dashboard o con biblioteca.js.');
  }
}

async function clearPersistedState() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  try { await idbDelete('treeState'); } catch (e) {}
}

async function restoreBaseLibrary() {
  if (!confirm('¿Restaurar la biblioteca base cargada en este paquete?')) return;
  state.tree = clone((window.BIBLIOTECA_DATA && window.BIBLIOTECA_DATA.tree) || LIB.tree);
  normalizeTreePaths(state.tree);
  ensureAudience(state.tree);
  state.currentFile = null;
  state.currentPath = null;
  state.selectedId = null;
  state.selectedType = null;
  state.loadedFromSaved = false;
  state.lastSavedMode = 'base';
  await clearPersistedState();
  renderTree();
  renderSearch('');
  showHome();
}

function initEvents() {
  document.querySelectorAll('details.sidebar-edit, details.menu-tree').forEach(details => {
    details.open = false;
  });
  els.search.addEventListener('input', e => renderSearch(e.target.value));
  if (els.homeBtn) els.homeBtn.addEventListener('click', () => {
    collapseAllFolders();
    showHome();
  });
  els.expandAllBtn.addEventListener('click', expandAllFolders);
  els.collapseAllBtn.addEventListener('click', collapseAllFolders);
  if (els.calculadorasBtn) els.calculadorasBtn.addEventListener('click', showCalculadoras);
  if (els.protocolosBtn) els.protocolosBtn.addEventListener('click', showProtocolos);
  if (els.dutydoctorBtn) els.dutydoctorBtn.addEventListener('click', openDutyDoctor);
  document.querySelectorAll('.audience-btn').forEach(btn => {
    btn.addEventListener('click', () => setAudienceFilter(btn.dataset.audience));
  });
  els.addRootFolderBtn.addEventListener('click', addRootFolder);
  els.addSubfolderBtn.addEventListener('click', addSubfolder);
  els.moveFolderBtn.addEventListener('click', moveSelectedFolder);
  els.renameFolderBtn.addEventListener('click', renameFolder);
  els.deleteFolderBtn.addEventListener('click', deleteFolder);
  els.addFilesBtn.addEventListener('click', () => els.filePicker.click());
  els.filePicker.addEventListener('change', async e => { await addFilesToFolder(e.target.files); e.target.value = ''; });
  els.renamePosterBtn.addEventListener('click', renamePoster);
  els.deletePosterBtn.addEventListener('click', deletePoster);
  els.movePosterBtn.addEventListener('click', moveSelectedPoster);
  els.saveLibraryBtn.addEventListener('click', saveLibraryFile);
  els.loadLibraryBtn.addEventListener('click', () => els.importPicker.click());
  els.exportBtn.addEventListener('click', exportBackup);
  els.importPicker.addEventListener('change', async e => { await loadLibraryFromFile(e.target.files[0]); e.target.value = ''; });
  els.restoreBtn.addEventListener('click', () => { restoreBaseLibrary().catch(() => alert('No se pudo restaurar la biblioteca base.')); });
  els.toggleInfoBtn.addEventListener('click', () => { state.infoVisible = !state.infoVisible; updateInfoVisibility(); });
  document.querySelectorAll('.menu-tree').forEach(details => details.addEventListener('toggle', () => {
    const hint = details.querySelector('.summary-right');
    if (hint) hint.textContent = details.open ? 'colapsar' : 'expandir';
  }));
  els.lightboxClose.addEventListener('click', closeLightbox);
  els.lightbox.addEventListener('click', e => { if (e.target === els.lightbox) closeLightbox(); });
  els.lbPrev.addEventListener('click', () => lightboxShowAt(state.lightboxIndex - 1));
  els.lbNext.addEventListener('click', () => lightboxShowAt(state.lightboxIndex + 1));
  els.lbFullscreen.addEventListener('click', () => {
    toggleFullscreenLightbox().catch(() => alert('No se pudo activar la pantalla completa.'));
  });
  els.lightboxImage.addEventListener('load', () => {
    fitLightboxToWidth();
  });
  els.lbZoomIn.addEventListener('click', () => {
    state.lightboxScale = Math.min(6, state.lightboxScale + 0.2);
    applyLightboxTransform();
  });
  els.lbZoomOut.addEventListener('click', () => {
    state.lightboxScale = Math.max(0.4, state.lightboxScale - 0.2);
    if (state.lightboxScale <= 1) {
      state.lightboxPanX = 0;
      state.lightboxPanY = 0;
    }
    applyLightboxTransform();
  });
  els.lbReset.addEventListener('click', resetLightboxView);
  els.lightboxImage.addEventListener('wheel', e => {
    e.preventDefault();
    state.lightboxScale = Math.max(0.4, Math.min(4, state.lightboxScale + (e.deltaY < 0 ? 0.12 : -0.12)));
    if (state.lightboxScale <= 1) {
      state.lightboxPanX = 0;
      state.lightboxPanY = 0;
    }
    applyLightboxTransform();
  }, { passive: false });
  els.lightboxImage.addEventListener('pointerdown', e => {
    if (state.lightboxScale <= 1) return;
    e.preventDefault();
    state.lightboxDragging = true;
    state.lightboxDragStartX = e.clientX;
    state.lightboxDragStartY = e.clientY;
    state.lightboxStartPanX = state.lightboxPanX;
    state.lightboxStartPanY = state.lightboxPanY;
    const wrap = getLightboxWrap();
    if (wrap) wrap.classList.add('dragging');
  });
  window.addEventListener('pointermove', e => {
    if (!state.lightboxDragging) return;
    state.lightboxPanX = state.lightboxStartPanX + (e.clientX - state.lightboxDragStartX);
    state.lightboxPanY = state.lightboxStartPanY + (e.clientY - state.lightboxDragStartY);
    applyLightboxTransform();
  });
  window.addEventListener('pointerup', stopLightboxDrag);
  window.addEventListener('pointercancel', stopLightboxDrag);

  els.htmlLbClose.addEventListener('click', () => { closeHtmlLightbox().catch(() => {}); });
  els.htmlLbZoomIn.addEventListener('click', () => setHtmlLbScale(state.htmlLbScale * 1.25));
  els.htmlLbZoomOut.addEventListener('click', () => setHtmlLbScale(state.htmlLbScale / 1.25));
  els.htmlLbFit.addEventListener('click', fitHtmlLightbox);
  els.htmlLbFullscreen.addEventListener('click', () => {
    toggleHtmlLightboxFullscreen().catch(() => alert('No se pudo activar la pantalla completa.'));
  });
  els.pdfLbClose.addEventListener('click', () => { closePdfLightbox().catch(() => {}); });
  els.pdfLbFullscreen.addEventListener('click', () => {
    togglePdfLightboxFullscreen().catch(() => alert('No se pudo activar la pantalla completa.'));
  });
  els.htmlLbStage.addEventListener('wheel', e => {
    if (!els.htmlLightbox.classList.contains('open')) return;
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    setHtmlLbScale(state.htmlLbScale * factor);
  }, { passive: false });
  els.htmlLbStage.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    e.preventDefault();
    state.htmlLbDragging = true;
    state.htmlLbDragStartX = e.clientX;
    state.htmlLbDragStartY = e.clientY;
    state.htmlLbScrollLeft = els.htmlLbStage.scrollLeft;
    state.htmlLbScrollTop = els.htmlLbStage.scrollTop;
    els.htmlLbStage.classList.add('dragging');
    try { els.htmlLbStage.setPointerCapture(e.pointerId); } catch (err) {}
  });
  els.htmlLbStage.addEventListener('pointermove', e => {
    if (!state.htmlLbDragging) return;
    e.preventDefault();
    els.htmlLbStage.scrollLeft = state.htmlLbScrollLeft - (e.clientX - state.htmlLbDragStartX);
    els.htmlLbStage.scrollTop = state.htmlLbScrollTop - (e.clientY - state.htmlLbDragStartY);
  });
  els.htmlLbStage.addEventListener('pointerup', e => {
    state.htmlLbDragging = false;
    els.htmlLbStage.classList.remove('dragging');
    try { els.htmlLbStage.releasePointerCapture(e.pointerId); } catch (err) {}
  });
  els.htmlLbStage.addEventListener('pointercancel', () => {
    state.htmlLbDragging = false;
    els.htmlLbStage.classList.remove('dragging');
  });
  document.addEventListener('fullscreenchange', () => {
    if (els.htmlLightbox.classList.contains('open')) {
      setTimeout(fitHtmlLightbox, 120);
    }
    if (els.lightbox.classList.contains('open')) {
      setTimeout(fitLightboxToWidth, 120);
    }
  });
  window.addEventListener('resize', () => {
    if (document.getElementById('viewerHtmlFrame')) fitHtmlPreview();
    if (els.htmlLightbox.classList.contains('open')) fitHtmlLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (els.pdfLightbox.classList.contains('open')) closePdfLightbox().catch(() => {});
      else if (els.htmlLightbox.classList.contains('open')) closeHtmlLightbox().catch(() => {});
      else closeLightbox();
      return;
    }
    if (els.pdfLightbox.classList.contains('open')) {
      if (e.key.toLowerCase() === 'f') togglePdfLightboxFullscreen().catch(() => {});
      return;
    }
    if (els.htmlLightbox.classList.contains('open')) {
      if (e.key.toLowerCase() === 'f') {
        toggleHtmlLightboxFullscreen().catch(() => {});
        return;
      }
      if (e.key === '+' || e.key === '=') setHtmlLbScale(state.htmlLbScale * 1.25);
      if (e.key === '-') setHtmlLbScale(state.htmlLbScale / 1.25);
      if (e.key.toLowerCase() === '0') fitHtmlLightbox();
      if (e.key === 'ArrowDown') els.htmlLbStage.scrollTop += 80;
      if (e.key === 'ArrowUp') els.htmlLbStage.scrollTop -= 80;
      if (e.key === 'ArrowRight') els.htmlLbStage.scrollLeft += 80;
      if (e.key === 'ArrowLeft') els.htmlLbStage.scrollLeft -= 80;
      return;
    }
    if (!els.lightbox.classList.contains('open')) return;
    if (e.key.toLowerCase() === 'f') {
      toggleFullscreenLightbox().catch(() => {});
      return;
    }
    if (e.key === 'ArrowLeft') lightboxShowAt(state.lightboxIndex - 1);
    if (e.key === 'ArrowRight') lightboxShowAt(state.lightboxIndex + 1);
    if (e.key === '+' || e.key === '=') {
      state.lightboxScale = Math.min(4, state.lightboxScale + 0.2);
      applyLightboxTransform();
    }
    if (e.key === '-') {
      state.lightboxScale = Math.max(0.4, state.lightboxScale - 0.2);
      if (state.lightboxScale <= 1) {
        state.lightboxPanX = 0;
        state.lightboxPanY = 0;
      }
      applyLightboxTransform();
    }
  });
  document.addEventListener('dragover', e => { if (state.draggedItem) e.preventDefault(); });
  document.addEventListener('drop', e => { if (state.draggedItem && !e.target.closest('.folder-label')) clearDropTargets(); });
}

async function loadState() {
  let saved = null;
  try { saved = await idbGet('treeState'); } catch (e) {}
  if (!saved) {
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch (e) { saved = null; }
  }
  if (saved && saved.type === 'folder') {
    normalizeTreePaths(saved);
    ensureAudience(saved);
    state.tree = saved;
    state.loadedFromSaved = true;
    state.lastSavedMode = 'autosaved';
  } else {
    state.tree = clone((window.BIBLIOTECA_DATA && window.BIBLIOTECA_DATA.tree) || LIB.tree);
    normalizeTreePaths(state.tree);
    ensureAudience(state.tree);
    state.loadedFromSaved = false;
    state.lastSavedMode = 'base';
  }
  rebuildMetadata(state.tree);
  updateAudienceButtons();
  renderTree();
  showHome();
}

initEvents();
updateInfoVisibility();
loadState().catch(err => {
  console.error(err);
  state.tree = clone((window.BIBLIOTECA_DATA && window.BIBLIOTECA_DATA.tree) || LIB.tree);
  normalizeTreePaths(state.tree);
  rebuildMetadata(state.tree);
  renderTree();
  showHome();
});
