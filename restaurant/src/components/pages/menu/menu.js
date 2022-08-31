/* eslint-disable indent */

import './menu.scss';
import MenuList from '../../../data/menu.json';

async function createFood(data) {
  const imageFood = await import(`../../../assets/menu/${data.img}`).then(({ default: img }) => img);

  const food = document.createElement('div');
  food.className = 'food';

  const foodImg = new Image();
  foodImg.className = 'food__image';
  foodImg.src = imageFood;
  foodImg.title = data.title;

  const container = document.createElement('div');
  container.className = 'food-container';

  const foodTitle = document.createElement('h3');
  foodTitle.className = 'food__title';
  foodTitle.textContent = data.title;

  const foodDesc = document.createElement('p');
  foodDesc.className = 'food__desc';
  foodDesc.textContent = data.description;

  const foodAuthor = document.createElement('span');
  foodAuthor.className = 'food__author';
  foodAuthor.textContent = 'By ';

  const foodAuthorLink = document.createElement('a');
  foodAuthorLink.className = 'author__link';
  foodAuthorLink.href = data.authorLink;
  foodAuthorLink.target = '_blank';
  foodAuthorLink.rel = 'noopener';
  foodAuthorLink.textContent = data.author;

  food.append(foodImg);
  food.append(container);
  container.append(foodTitle);
  container.append(foodDesc);
  container.append(foodAuthor);
  foodAuthor.append(foodAuthorLink);

  return food;
}

export default function render() {
  const menu = document.createElement('section');
  menu.id = 'menu';

  const menuWrapper = document.createElement('div');
  menuWrapper.className = 'wrapper';

  const menuHeaderEl = document.createElement('header');
  menuHeaderEl.className = 'section__header';

  const headerTitle = document.createElement('h2');
  headerTitle.className = 'section__title';
  headerTitle.textContent = 'our menu';

  const menuList = document.createElement('ul');
  menuList.className = 'menu__list';

  for (let i = 0; i < MenuList.food.length; i += 1) {
    const listItem = document.createElement('li');
    listItem.className = 'list__item';

    createFood(MenuList.food[i]).then((res) => {
      const foodItem = res;

      listItem.append(foodItem);
      menuList.append(listItem);
    });
  }

  const menuCopy = document.createElement('span');
  menuCopy.className = 'menu__copyright';
  menuCopy.textContent = 'The food for the menu was taken from the ';

  const menuCopyLink = document.createElement('a');
  menuCopyLink.className = 'copyright__link';
  menuCopyLink.href = 'https://www.allrecipes.com';
  menuCopyLink.target = '_blank';
  menuCopyLink.rel = 'noopener';
  menuCopyLink.textContent = 'allrecipes';

  menu.append(menuWrapper);
  menuWrapper.append(menuHeaderEl);
  menuWrapper.append(menuList);
  menuWrapper.append(menuCopy);
  menuHeaderEl.append(headerTitle);
  menuCopy.append(menuCopyLink);

  return menu;
}
