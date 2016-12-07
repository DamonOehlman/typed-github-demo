// @flow
export class AppUI {
  static appendImage(image: HTMLImageElement) {
    const container = document.querySelector('.imageContainer');
    if (container) {
      const listItem = document.createElement('li');

      listItem.appendChild(image);
      container.appendChild(listItem);
    }
  }
}
