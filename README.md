# QAgentExt website

The website of QAgentExt, served at **https://qagentext.netlify.app**:

| Path | What |
|---|---|
| `/` | The product page |
| `/privacy/` | The privacy policy (the Chrome Web Store listing should link here) |

Static files only, committed as built. Netlify runs no build step: it serves
`public/` as it is (`netlify.toml`). The pages contain no script and load
nothing from another origin.

## Where it came from

Until 2026-10-11 these pages lived on the Shubix site under `/qagentext/`
(`shubix.netlify.app/qagentext/…`). They were copied here and rebased from
`/qagentext/` to the site root, so QAgentExt has a site of its own, as
QExtract does at `qextract.netlify.app`.

Changed on the way:

- Every link and asset path is root-relative (`/assets/…`, `/privacy/`), and
  canonical, Open Graph and structured-data URLs name this site.
- The header names QAgentExt; Shubix is linked from the footer.
- The copy is current for **version 2.2**: the "2.1 preview" labels are gone
  (2.1 shipped), the screenshots and demo say they were captured in 2.1, the
  export answer reflects 2.2 (all seven formats stop on an unsupported step),
  and a section and an FAQ entry describe iOS device runs (preview).
- The privacy policy covers 2.2: what the iOS tab sends to the Appium server
  the user enters, what it stores, and that secrets typed there are never
  stored. Its date is 11 October 2026.
- New: `404.html`, `_headers`, `robots.txt` and `sitemap.xml`.

`public/assets/` is byte-for-byte the Shubix copy: screenshots and the demo
video, captions and thumbnail from the 2.1 release.

## Social card

`public/assets/social-card.png` (1200 × 630) is the link preview for every
page (Open Graph and Twitter tags, with alt text). Its source is
`tools/social-card.html`, built from the site's palette, the extension icon and
the real replay screenshot. To change it, edit the HTML and re-render with
Playwright from the extension repository:

```bash
node tools/render-social-card.cjs D:/Workplace/QAgentExt
```

`tools/` is not published: Netlify serves only `public/`. Social sites cache
previews, so after a change, re-scrape the URL in each site's preview debugger.

## Security headers

`public/_headers` applies one policy to the whole site: its own files only
(`default-src 'self'`), no script (`script-src 'none'`; the JSON-LD blocks in
`index.html` are data and are never executed), no inline styles, never framed.
There is no web app under this origin, so a single `/*` rule is enough.

## Publishing (by the owner)

1. Create a GitHub repository for this folder (for example
   `shubhssks/QAgentExt-site`) and push `main`.
2. In Netlify: Add new site → Import from Git → this repository. Site name
   `qagentext` (for `qagentext.netlify.app`), publish directory `public`, build
   command empty.
3. Open the site and check the product page, `/privacy/`, a missing page (the
   404), and that each response carries its Content-Security-Policy.
4. Only then publish the Shubix change that sends the old addresses here (see
   below); doing it first would send visitors to a site that does not exist.
5. In the Chrome Web Store dashboard, change the listing's website and privacy
   policy links to `https://qagentext.netlify.app/` and
   `https://qagentext.netlify.app/privacy/`.

## The old addresses

The Shubix repository has a branch, `move-qagentext`, that redirects
`/qagentext/` and `/qagentext/privacy/` here with permanent (301) redirects
and points the Shubix home page, 404 page and sitemap at this site. It
deliberately leaves `/qagentext/assets/…` and `/qagentext/style.css` in place,
because the Shubix home page shows QAgentExt's icon and a screenshot from
there, and the Shubix 404 page uses that stylesheet. Merge and push it after
step 3.

The extension itself does not link to the website, so no shipped release
needs to change.

## License

Not open source; see `LICENSE`.
