import { emojify } from 'react-emojione';

const options = {
  styles: {
    backgroundImage: 'url(//cdnjs.cloudflare.com/ajax/libs/emojione/1.5.2/assets/sprites/emojione.sprites.png)' // eslint-disable-line max-len
  }
};

export default function (txt, customOptions) {
  return emojify(txt, customOptions ? { ...options, ...customOptions } : options);
}
