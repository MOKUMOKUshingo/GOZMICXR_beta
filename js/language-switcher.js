(function () {
  const LANG_KEY = 'cozmixSpaceLang';
  const supported = ['en', 'ja'];

  const pageText = {
    en: {
      title: 'GOZMIX Space',
      tagline: 'simple and effective design',
      nav: ['Introduction', 'Gallery', 'Testimonials', 'About', 'Contact'],
      close: 'return home',
      introTitle: 'Introducing COZMIX Space',
      intro: [
        'This CSS template is 100% free provided by <a rel="nofollow" href="https://gozmix.com/page/1" target="_parent">GOZMIX</a> website. You can use this template for any purpose. You can apply this as a CMS theme or a custom website builder template.',
        'You can support our website by contributing <a rel="nofollow" href="http://paypal.me/gozmix" target="_parent">a little via <strong>PayPal</strong></a> or spreading a word about GOZMIX to your friends. If you have any question, feel free to send us a message.',
        '<strong>Credit</strong> goes to Pexels for the video banner and images used in this template. Some images are taken from Unsplash. Both Pexels and Unsplash are great websites for free photos.',
        'You are not allowed to re-distribute this template as a downloadable ZIP file on any template collection website.',
        'Top right corner is a return home with an icon that will close this pop-up page.',
        'Next Page will bring you to the gallery page directly without going back to main menu.'
      ],
      nextPage: 'Next Page',
      galleryTitle: 'Gallery',
      filters: ['All', 'Portraits', 'Nature', 'Animals', 'Buildings'],
      galleryDesc: [
        'Different icons are used for different categories. There are 4 or more pages of photos in this gallery. Each thumbnail has a nice hover effect.',
        'Proin lacus enim, finibus sed magna a, molestie lacinia est. Maecenas id dolor lorem. Donec sodales ex velit.'
      ],
      captions: {
        "Chico's main fear was missing the morning bus.": "Chico's main fear was missing the morning bus.",
        'GOZMIX is the best website for free css templates.': 'GOZMIX is the best website for free css templates.',
        'GOZMIX is the best free css website templates.': 'GOZMIX is the best free css website templates.',
        'GOZMIX is the best free website for html css templates.': 'GOZMIX is the best free website for html css templates.'
      },
      testimonialsTitle: 'Testimonials',
      testimonials: [
        'COZMIX Space is free website template from <a rel="nofollow" href="https://gozmix.com" class="tm-color-primary">GOZMIX</a> website. You are allowed to use it for commercial purpose. You can convert this template as a CMS theme or a custom website builder template.',
        'You may support us by telling your friends about our GOZMIX site. Feel free to contact us if you have anything to ask.',
        'You can make a little contribution via <a rel="nofollow" href="http://paypal.me/gozmix" target="_parent"><strong>PayPal</strong></a> or saying about GOZMIX to your friends. Duis egestas lorem eu nisi finibus, sit amet elementum lacus pretium.',
        'In tempor felis vitae nulla feugiat aliquam. Vivamus vitae congue mi. Sed maximus velit vestibulum nisl condimentum hendrerit.',
        '"Suspendisse eu mollis diam, at ullamcorper diam. Ut sit amet arcu metus. Nullam mattis eros eget." by <span class="tm-color-primary">George, Chief Editor</span>',
        '"Quisque et lorem accumsan, sollicitudin dolor vel, facilisis eros. Donec aliquet felis in mollis egestas." by <span class="tm-color-primary">Mary, CEO of Web</span>',
        'Duis sapien diam, eleifend eget vehicula sed, convallis sit amet elit. Aenean condimentum vulputate porta.',
        'Mauris accumsan erat ante, id sagittis felis gravida vitae. Sed iaculis tincidunt neque, a molestie magna vehicula at.',
        'Phasellus ornare magna nec nulla pharetra, nec tristique elit lobortis.'
      ],
      aboutTitle: 'About COZMIX Space',
      about: [
        'Suspendisse sit amet pellentesque nunc. Vivamus fringilla tellus finibus lacus blandit, siet amet aliquet augue sagittis. Duis nec auctor felis, nec ornare ex. In non ante ligula.',
        'Curabitur non augue dignissim est pulvibar lobortis. Nunc vulputate, mi vel cursus mollis, justo mauris rutrum dui, id egestas ante ligula id nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        'You are NOT allowed to re-distribute this template ZIP file on any website that <span class="tm-color-primary">collects and reposts</span> free templates from many different websites.',
        'Pellentesque vitae ipsum vel risus molestie cursus nec quis lectus. Duis egestas lorem eu nisi finibus, sit amet elementum lacus pretium. In tempor felis vitae nulla feugiat aliquam.',
        'If you need a working HTML contact form, please visit our <a rel="nofollow" href="https://gozmix.com/contact" target="_parent">contact page</a>.'
      ],
      contactTitle: 'Contact Us',
      contactButton: 'Contact Us',
      form: {
        name: 'Full Name',
        email: 'Email',
        subject: 'Subject',
        sales: 'Sales & Marketing',
        creative: 'Creative Design',
        uiux: 'UI / UX',
        message: 'Message',
        send: 'Send it now'
      },
      footer: ['Copyright © 2020 Your Company', 'Web Designed by '],
      open3d: 'Open the three.js 3D scene'
    },
    ja: {
      title: 'GOZMIX Space - 日本語対応サイト',
      tagline: 'シンプルで効果的なデザイン',
      nav: ['紹介', 'ギャラリー', 'お客様の声', 'このサイトについて', 'お問い合わせ'],
      close: 'ホームに戻る',
      introTitle: 'COZMIX Space の紹介',
      intro: [
        'このWebサイトは、海の雰囲気を活かした静的HTMLテンプレートをベースにしています。写真ギャラリー、動画バナー、ポップアップページを組み合わせて、軽く見やすいサイトとして使えます。',
        '現在は、元のデザインを残しながら、写真クリックでthree.jsの3D空間へ移動できるように拡張しています。PC、スマホ、VR、ARで楽しめる入り口として使えます。',
        '<strong>素材について：</strong>トップページの動画、ギャラリー写真、3D空間内の海動画は、それぞれ別々に管理できます。トップ動画を差し替えても、three.js内の海動画はそのまま残せます。',
        'このページでは、元のCOZMIX Spaceの雰囲気を保ちながら、日本語と英語を切り替えられるようにしています。',
        '右上の閉じるアイコンを押すと、このポップアップページを閉じてホームに戻ります。',
        '「次のページ」を押すと、メニューに戻らずギャラリーページへ直接移動します。'
      ],
      nextPage: '次のページ',
      galleryTitle: 'ギャラリー',
      filters: ['すべて', '人物', '自然', '動物', '建物'],
      galleryDesc: [
        'カテゴリごとに違うアイコンを使っています。写真は複数ページに分かれて表示され、各サムネイルにはホバー演出があります。',
        '「Chico」の説明文が付いた写真をクリックすると、three.jsの3D / VR / AR空間へ移動します。'
      ],
      captions: {
        "Chico's main fear was missing the morning bus.": 'Chicoは朝のバスに乗り遅れることを一番恐れていた。クリックで3D空間へ移動します。',
        'GOZMIX is the best website for free css templates.': '無料CSSテンプレートの紹介写真です。',
        'GOZMIX is the best free css website templates.': '無料Webテンプレート用のギャラリー素材です。',
        'GOZMIX is the best free website for html css templates.': 'HTML/CSSテンプレート用のギャラリー素材です。'
      },
      testimonialsTitle: 'お客様の声',
      testimonials: [
        'COZMIX Spaceは、海の映像と写真ギャラリーを中心にしたWebサイトです。元の静的テンプレートを活かしつつ、3Dページへの入口としても使えるように拡張しています。',
        'スマホではタップ操作、PCではクリック操作でギャラリーを開けます。写真から3D空間へ移動する導線も自然に組み込んでいます。',
        'トップページの動画は病院サンプル動画に差し替え、three.js空間内では元の海動画を表示するように分離しています。',
        'VR対応端末では、ENTER VRから空間に入り、コントローラーで移動やテレポートができます。',
        '「写真ギャラリーから3D空間へ移動する導線が、サイト全体の雰囲気と合っている。」 by <span class="tm-color-primary">George, Chief Editor</span>',
        '「スマホ、PC、VR、ARを同じサイト内で扱える点が面白い。」 by <span class="tm-color-primary">Mary, CEO of Web</span>',
        'ARモードでは、現実空間に小さなCOZMIX Spaceギャラリーを置くことを想定しています。',
        'WebXRは端末やブラウザによって対応状況が変わるため、HTTPS環境で確認するのがおすすめです。',
        'このページは、英語と日本語を切り替えながら閲覧できます。'
      ],
      aboutTitle: 'COZMIX Space について',
      about: [
        'このサイトは、元のCOZMIX Spaceテンプレートの構造を保ちながら、three.jsによる3D空間を追加した拡張版です。',
        '写真ギャラリー、動画バナー、ポップアップUI、スマホ対応の表示をそのまま活かし、3D / VR / ARへの入口を加えています。',
        'トップページの動画は <span class="tm-color-primary">video/Title1-1_web.mp4</span> を参照し、three.js側では元の海動画 <span class="tm-color-primary">video/projectmovie1.mp4</span> を使い続けます。',
        'スマホではタッチ操作、PCではキーボードとドラッグ、VRではWebXR、ARではhit-testを使った配置を想定しています。',
        '問い合わせフォームは見た目だけのサンプルです。実際に送信するには、サーバー側の送信処理を追加してください。'
      ],
      contactTitle: 'お問い合わせ',
      contactButton: 'お問い合わせ',
      form: {
        name: 'お名前',
        email: 'メールアドレス',
        subject: '件名',
        sales: '販売・マーケティング',
        creative: 'クリエイティブデザイン',
        uiux: 'UI / UX',
        message: 'メッセージ',
        send: '送信する'
      },
      footer: ['Copyright © 2020 Your Company', 'Webデザイン：'],
      open3d: 'three.js 3D空間を開く'
    }
  };

  function normalizeLang(value) {
    return supported.includes(value) ? value : 'en';
  }

  function initialLang() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (supported.includes(fromUrl)) {
      localStorage.setItem(LANG_KEY, fromUrl);
      return fromUrl;
    }
    const saved = localStorage.getItem(LANG_KEY);
    if (supported.includes(saved)) return saved;
    return (navigator.language || '').toLowerCase().startsWith('ja') ? 'ja' : 'en';
  }

  function setDirectText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  function setHTML(selector, html) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  }

  function setLinkTextKeepIcon(el, text) {
    if (!el) return;
    const icon = el.querySelector('i');
    el.textContent = text + ' ';
    if (icon) el.appendChild(icon);
  }

  function setAllCloseLinks(text) {
    document.querySelectorAll('.tm-close-popup').forEach((link) => setLinkTextKeepIcon(link, text));
  }

  function ensureSwitcher(lang) {
    let switcher = document.querySelector('.tm-language-switcher');
    if (!switcher) {
      switcher = document.createElement('div');
      switcher.className = 'tm-language-switcher';
      switcher.setAttribute('aria-label', 'Language switcher');
      switcher.innerHTML = '<button type="button" class="tm-lang-button" data-lang="en">EN</button><button type="button" class="tm-lang-button" data-lang="ja">日本語</button>';
      document.body.appendChild(switcher);
      switcher.addEventListener('click', (event) => {
        const button = event.target.closest('[data-lang]');
        if (!button) return;
        applyLanguage(normalizeLang(button.dataset.lang), true);
      });
    }
    switcher.querySelectorAll('[data-lang]').forEach((button) => {
      button.classList.toggle('active', button.dataset.lang === lang);
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });
  }

  function setNavigation(t) {
    document.querySelectorAll('.tm-main-nav .tm-nav-link').forEach((link, i) => setLinkTextKeepIcon(link, t.nav[i] || link.textContent.trim()));
    document.querySelectorAll('.tm-gallery-link').forEach((link, i) => setLinkTextKeepIcon(link, t.filters[i] || link.textContent.trim()));
  }

  function setGalleryCaptions(t) {
    document.querySelectorAll('.tm-gallery-container figcaption p').forEach((p) => {
      const raw = p.dataset.originalCaption || p.textContent.replace(/\s+/g, ' ').trim();
      p.dataset.originalCaption = raw;
      if (t.captions[raw]) p.textContent = t.captions[raw];
    });
  }

  function setPlaceholders(t) {
    const form = t.form;
    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    const message = document.querySelector('textarea[name="message"]');
    const options = document.querySelectorAll('#contact-select option');
    if (name) name.placeholder = form.name;
    if (email) email.placeholder = form.email;
    if (message) message.placeholder = form.message;
    if (options[0]) options[0].textContent = form.subject;
    if (options[1]) options[1].textContent = form.sales;
    if (options[2]) options[2].textContent = form.creative;
    if (options[3]) options[3].textContent = form.uiux;
    setDirectText('#contact-form button[type="submit"]', form.send);
  }

  function applyLanguage(lang, save) {
    const t = pageText[normalizeLang(lang)];
    document.documentElement.lang = lang;
    document.body.classList.toggle('tm-lang-ja', lang === 'ja');
    document.body.classList.toggle('tm-lang-en', lang === 'en');
    document.title = t.title;
    ensureSwitcher(lang);
    if (save) localStorage.setItem(LANG_KEY, lang);

    setDirectText('.tm-tagline', t.tagline);
    setNavigation(t);
    setAllCloseLinks(t.close);

    setDirectText('#intro .tm-page-title', t.introTitle);
    setHTML('#intro .tm-intro-col-l p:nth-of-type(1)', t.intro[0]);
    setHTML('#intro .tm-intro-col-l p:nth-of-type(2)', t.intro[1]);
    setHTML('#intro .tm-intro-col-l p:nth-of-type(3)', t.intro[2]);
    setHTML('#intro .tm-col-6:nth-of-type(2) p:nth-of-type(1)', t.intro[3]);
    setHTML('#intro .tm-col-6:nth-of-type(2) p:nth-of-type(2)', t.intro[4]);
    setHTML('#intro .tm-col-6:nth-of-type(2) p:nth-of-type(3)', t.intro[5]);
    setDirectText('#intro .tm-btn-next', t.nextPage);

    setDirectText('#gallery .tm-page-title', t.galleryTitle);
    setHTML('#gallery .tm-gallery-right-inner p:nth-of-type(1)', t.galleryDesc[0]);
    setHTML('#gallery .tm-gallery-right-inner p:nth-of-type(2)', t.galleryDesc[1]);
    setGalleryCaptions(t);

    setDirectText('#testimonials .tm-page-title', t.testimonialsTitle);
    setHTML('#testimonials .tm-testimonial-col:nth-of-type(1) p:nth-of-type(1)', t.testimonials[0]);
    setHTML('#testimonials .tm-testimonial-col:nth-of-type(1) em', t.testimonials[1]);
    setHTML('#testimonials .tm-testimonial-col:nth-of-type(1) p:nth-of-type(2)', t.testimonials[2]);
    setHTML('#testimonials .tm-testimonial-col:nth-of-type(1) p:nth-of-type(3)', t.testimonials[3]);
    setHTML('#testimonials blockquote:nth-of-type(1) p', t.testimonials[4]);
    setHTML('#testimonials blockquote:nth-of-type(2) p', t.testimonials[5]);
    setDirectText('#testimonials .tm-btn-contact', t.contactButton);
    setHTML('#testimonials .tm-testimonial-col:nth-of-type(3) p:nth-of-type(1)', t.testimonials[6]);
    setHTML('#testimonials .tm-testimonial-col:nth-of-type(3) p:nth-of-type(2)', t.testimonials[7]);
    setHTML('#testimonials .tm-testimonial-col:nth-of-type(3) p:nth-of-type(3)', t.testimonials[8]);

    setDirectText('#about .tm-page-title', t.aboutTitle);
    setHTML('#about .tm-about-left p:nth-of-type(1)', t.about[0]);
    setHTML('#about .tm-about-left p:nth-of-type(2)', t.about[1]);
    setHTML('#about .tm-about-col:nth-of-type(2) p:nth-of-type(1)', t.about[2]);
    setHTML('#about .tm-about-col:nth-of-type(2) p:nth-of-type(2)', t.about[3]);
    setHTML('#about .tm-about-col:nth-of-type(2) p:nth-of-type(3)', t.about[4]);
    setDirectText('#about .tm-btn-contact', t.contactButton);

    setDirectText('#contact .tm-page-title', t.contactTitle);
    setPlaceholders(t);

    const footerSpans = document.querySelectorAll('.tm-footer span');
    if (footerSpans[0]) footerSpans[0].textContent = t.footer[0];
    if (footerSpans[1]) {
      const link = footerSpans[1].querySelector('a');
      footerSpans[1].textContent = t.footer[1];
      if (link) footerSpans[1].appendChild(link);
    }

    document.querySelectorAll('figure.tm-three-entry').forEach((figure) => {
      figure.setAttribute('aria-label', t.open3d);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(initialLang(), false);
  });
})();
