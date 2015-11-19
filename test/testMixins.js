import { Find } from 'legit-tests/middleware';

export function findContainer(elClassName) {
  Find.call(this, 'div');
  let element = this.elements.div.map(function(x) {return x.className; }).indexOf(elClassName);
  this.elements = { container: this.elements.div[element] };
}
