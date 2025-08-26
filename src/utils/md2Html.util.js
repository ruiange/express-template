// npm install markdown-it highlight.js

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const md2HtmlUtil = async (markdown) => {
  if (!markdown) return '';

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
        } catch (_) {}
      }
      return `<div class="code-window"><pre class="hljs"><code class="language-css">${md.utils.escapeHtml(str)}</code></pre></div>`;
    },
  });

  return md.render(markdown);
};

export default md2HtmlUtil;
