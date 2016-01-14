import Autolink from 'autolinker';

export default function convertMedia(html, height, onlyvideo, autoplay, isAct, start) {
  let replacement;
  let htmlReplace;
  let pattern1 = /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)(?:[\w\-\_\/]*)?\/([0-9]+)/;
  let pattern2 = /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\??[\w\-\_=&;]*?v=|\.be\/)([\w\-\_]*)?([\w\?‌​=&;#]*)?/; // eslint-disable-line max-len
  let pattern3 = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/;
  let pattern4 = /(?:https?:\/\/)?(?:www\.)?(?:prezi\.com)\/?([^/]+)\/?(.+)/;

  if (pattern1.test(html)) {
    replacement = '<iframe width="100%" height="' + (height || 320) +
      '" src="//player.vimeo.com/video/$1?autoplay=' + (autoplay || '0') +
      '&portrait=0&title=0&byline=0&badge=0" +' +
      'frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>';
    htmlReplace = html.replace(pattern1, replacement);
  } else if (pattern2.test(html)) {
    replacement = '<iframe ' + (isAct ? 'id="act_player"' : '') +
      ' width="100%" height="' + (height || 320) +
      '" src="//www.youtube.com/embed/$1?autohide=1&controls=2&modestbranding=1&rel=0&showinfo=1&playsinline=1&autoplay=' + // eslint-disable-line max-len
      (autoplay || '0') + (start ? '&start=' + start : '') + (isAct ? '&enablejsapi=1' : '') +
      '" frameBorder="0" allowFullScreen></iframe>';
    htmlReplace = html.replace(pattern2, replacement);
  } else if (typeof onlyvideo === 'undefined') {
    if (pattern4.test(html)) {
      replacement = '<iframe width="100%" height="' + (height || 320) +
        '" src="//prezi.com/player/?oid=$1&explorable=0&controls=1&autoplay=1" ' +
        'frameBorder="0" allowFullScreen></iframe>';
      htmlReplace = html.replace(pattern4, replacement);
    } else if (pattern3.test(html)) {
      htmlReplace = '<img class="mimg" src="' + encodeURI(html) + '" />';
    }
    else htmlReplace = Autolink.link(html);
  }
  else htmlReplace = Autolink.link(html);

  return htmlReplace;
}
