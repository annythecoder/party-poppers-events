document.getElementById("year").textContent = new Date().getFullYear();
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

// ---- Gallery ----
// To add photos: put an optimized .jpg in assets/gallery/ and add a line below.
const galleryItems = [
  {type:"video",src:"assets/gallery/video-01.mp4"},
  {type:"image",src:"assets/gallery/decor-01.jpg"},
  {type:"image",src:"assets/gallery/decor-02.jpg"},
  {type:"image",src:"assets/gallery/decor-03.jpg"},
  {type:"image",src:"assets/gallery/decor-04.jpg"},
  {type:"image",src:"assets/gallery/decor-05.jpg"},
  {type:"image",src:"assets/gallery/decor-06.jpg"},
  {type:"image",src:"assets/gallery/decor-07.jpg"},
  {type:"image",src:"assets/gallery/decor-08.jpg"},
  {type:"image",src:"assets/gallery/decor-09.jpg"},
  {type:"image",src:"assets/gallery/decor-10.jpg"},
  {type:"image",src:"assets/gallery/decor-11.jpg"},
  {type:"image",src:"assets/gallery/decor-12.jpg"},
  {type:"image",src:"assets/gallery/decor-13.jpg"},
  {type:"image",src:"assets/gallery/decor-14.jpg"},
  {type:"image",src:"assets/gallery/decor-15.jpg"},
  {type:"image",src:"assets/gallery/decor-16.jpg"},
  {type:"image",src:"assets/gallery/decor-17.jpg"},
  {type:"image",src:"assets/gallery/decor-18.jpg"},
  {type:"image",src:"assets/gallery/decor-19.jpg"},
  {type:"image",src:"assets/gallery/decor-20.jpg"},
  {type:"image",src:"assets/gallery/decor-21.jpg"},
  {type:"image",src:"assets/gallery/decor-22.jpg"},
  {type:"image",src:"assets/gallery/decor-23.jpg"},
  {type:"image",src:"assets/gallery/decor-24.jpg"},
  {type:"image",src:"assets/gallery/decor-25.jpg"},
  {type:"image",src:"assets/gallery/decor-26.jpg"},
  {type:"image",src:"assets/gallery/decor-27.jpg"},
  {type:"image",src:"assets/gallery/decor-28.jpg"},
  {type:"image",src:"assets/gallery/decor-29.jpg"},
  {type:"image",src:"assets/gallery/decor-30.jpg"},
  {type:"image",src:"assets/gallery/decor-31.jpg"},
  {type:"image",src:"assets/gallery/decor-32.jpg"},
  {type:"image",src:"assets/gallery/decor-33.jpg"},
  {type:"image",src:"assets/gallery/decor-34.jpg"},
  {type:"image",src:"assets/gallery/decor-35.jpg"},
  {type:"image",src:"assets/gallery/decor-36.jpg"},
  {type:"image",src:"assets/gallery/decor-37.jpg"},
  {type:"image",src:"assets/gallery/decor-38.jpg"},
  {type:"image",src:"assets/gallery/decor-39.jpg"},
  {type:"image",src:"assets/gallery/decor-40.jpg"},
  {type:"image",src:"assets/gallery/decor-41.jpg"},
  {type:"image",src:"assets/gallery/decor-42.jpg"},
  {type:"image",src:"assets/gallery/decor-43.jpg"},
  {type:"image",src:"assets/gallery/decor-44.jpg"},
  {type:"image",src:"assets/gallery/decor-45.jpg"},
  {type:"image",src:"assets/gallery/decor-46.jpg"},
  {type:"image",src:"assets/gallery/decor-47.jpg"},
  {type:"image",src:"assets/gallery/decor-48.jpg"},
  {type:"image",src:"assets/gallery/decor-49.jpg"}
];
galleryItems.forEach((it, i) => { it.alt = it.alt || "Balloon decoration by Party Poppers Events, photo " + (i + 1); });

const gGrid = document.getElementById("gallery-grid");
const gMore = document.getElementById("gallery-more");
const BATCH = 12;
let shown = 0;

function renderBatch() {
  const frag = document.createDocumentFragment();
  galleryItems.slice(shown, shown + BATCH).forEach((it, k) => {
    const idx = shown + k;
    const btn = document.createElement("button");
    btn.className = "g-item"; btn.type = "button";
    btn.setAttribute("aria-label", "Open photo " + (idx + 1));
    if (it.type === "video") {
      btn.innerHTML = '<video src="' + it.src + '#t=0.1" muted playsinline preload="metadata"></video><span class="g-play">▶</span>';
    } else {
      btn.innerHTML = '<img src="' + it.src + '" alt="' + it.alt + '" loading="lazy">';
    }
    btn.addEventListener("click", () => openLightbox(idx));
    frag.appendChild(btn);
  });
  gGrid.appendChild(frag);
  shown = Math.min(shown + BATCH, galleryItems.length);
  gMore.parentElement.hidden = shown >= galleryItems.length;
}
gMore.addEventListener("click", renderBatch);
renderBatch();

// ---- Lightbox ----
const lb = document.getElementById("lightbox");
const lbStage = lb.querySelector(".lb-stage");
const lbCount = lb.querySelector(".lb-count");
let cur = 0;

function showItem(i) {
  cur = (i + galleryItems.length) % galleryItems.length;
  const it = galleryItems[cur];
  lbStage.innerHTML = it.type === "video"
    ? '<video src="' + it.src + '" controls autoplay playsinline></video>'
    : '<img src="' + it.src + '" alt="' + it.alt + '">';
  lbCount.textContent = (cur + 1) + " / " + galleryItems.length;
}
function openLightbox(i) { lb.hidden = false; document.body.style.overflow = "hidden"; showItem(i); }
function closeLightbox() { lb.hidden = true; lbStage.innerHTML = ""; document.body.style.overflow = ""; }
lb.querySelector(".lb-close").addEventListener("click", closeLightbox);
lb.querySelector(".lb-prev").addEventListener("click", () => showItem(cur - 1));
lb.querySelector(".lb-next").addEventListener("click", () => showItem(cur + 1));
lb.addEventListener("click", e => { if (e.target === lb || e.target === lbStage) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showItem(cur - 1);
  if (e.key === "ArrowRight") showItem(cur + 1);
});
let tx = 0;
lb.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, {passive:true});
lb.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 50) showItem(cur + (dx < 0 ? 1 : -1));
});
