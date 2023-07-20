const n = {
  facebook: (t) => `https://www.facebook.com/sharer/sharer.php?u=${t.url}${t.hashtags ? `&hashtag=%23${t.hashtags.split("%2C")[0]}` : ""}`,
  linkedin: (t) => `https://www.linkedin.com/sharing/share-offsite/?url=${t.url}`,
  mastodon: (t) => `https://toot.kytta.dev/?text=${t.title}%0D%0A${t.url}${t.text ? `%0D%0A%0D%0A${t.text}` : ""}${t.via ? `%0D%0A%0D%0A${t.via}` : ""}`,
  messenger: (t) => `https://www.facebook.com/dialog/send?app_id=${t.fbAppId}&link=${t.url}&redirect_uri=${t.url}`,
  odnoklassniki: (t) => `https://connect.ok.ru/offer?url=${t.url}&title=${t.title}${t.media ? `&imageUrl=${t.media}` : ""}`,
  pinterest: (t) => `https://pinterest.com/pin/create/button/?url=${t.url}&description=${t.title}${t.media ? `&media=${t.media}` : ""}`,
  pocket: (t) => `https://getpocket.com/edit.php?url=${t.url}`,
  reddit: (t) => `https://www.reddit.com/submit?title=${t.title}&url=${t.url}`,
  teams: (t) => `https://teams.microsoft.com/share?href=${t.url}${t.text ? `&msgText=${t.text}` : ""}`,
  telegram: (t) => `https://telegram.me/share/url?url=${t.url}${t.text ? `&text=${t.text}` : ""}`,
  twitter: (t) => `https://twitter.com/intent/tweet?url=${t.url}&text=${t.title}${t.via ? `&via=${t.via}` : ""}${t.hashtags ? `&hashtags=${t.hashtags}` : ""}`,
  viber: (t) => `viber://forward?text=${t.title}%0D%0A${t.url}${t.text ? `%0D%0A%0D%0A${t.text}` : ""}`,
  vkontakte: (t) => `https://vk.com/share.php?url=${t.url}&title=${t.title}${t.media ? `&image=${t.media}` : ""}`,
  whatsapp: (t) => `https://wa.me/?text=${t.title}%0D%0A${t.url}${t.text ? `%0D%0A%0D%0A${t.text}` : ""}`
}, h = (t) => () => {
  window.open(t, "_blank", "noopener,noreferrer");
}, p = () => {
  const t = document.querySelectorAll(".shareon");
  for (const a of t)
    for (const e of a.children)
      if (e) {
        const c = e.classList.length;
        for (let o = 0; o < c; o += 1) {
          const r = e.classList.item(o);
          if (r === "copy-url" && e.addEventListener("click", () => {
            const s = e.dataset.url || a.dataset.url || window.location.href;
            navigator.clipboard.writeText(s), e.classList.add("done"), setTimeout(() => {
              e.classList.remove("done");
            }, 1e3);
          }), r === "web-share") {
            const s = {
              title: e.dataset.title || a.dataset.title || document.title,
              text: e.dataset.text || a.dataset.text || "",
              url: e.dataset.url || a.dataset.url || window.location.href
            };
            navigator.canShare && navigator.canShare(s) ? e.addEventListener("click", () => {
              navigator.share(s);
            }) : e.style.display = "none";
          }
          if (Object.prototype.hasOwnProperty.call(n, r)) {
            const s = {
              url: encodeURIComponent(
                e.dataset.url || a.dataset.url || window.location.href
              ),
              title: encodeURIComponent(
                e.dataset.title || a.dataset.title || document.title
              ),
              media: encodeURIComponent(
                e.dataset.media || a.dataset.media || ""
              ),
              text: encodeURIComponent(
                e.dataset.text || a.dataset.text || ""
              ),
              via: encodeURIComponent(
                e.dataset.via || a.dataset.via || ""
              ),
              hashtags: encodeURIComponent(
                e.dataset.hashtags || a.dataset.hashtags || ""
              ),
              fbAppId: encodeURIComponent(
                e.dataset.fbAppId || a.dataset.fbAppId || ""
              )
            }, i = n[r](s);
            e.tagName.toLowerCase() === "a" ? (e.setAttribute("href", i), e.setAttribute("rel", "noopener noreferrer"), e.setAttribute("target", "_blank")) : e.addEventListener("click", h(i));
            break;
          }
        }
      }
}, l = document.currentScript;
l && l.hasAttribute("init") && p();
export {
  p as init
};
