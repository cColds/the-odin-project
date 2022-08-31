import './home.scss';

export default function render() {
  const hero = document.createElement('section');
  hero.id = 'hero';

  const heroWrapper = document.createElement('div');
  heroWrapper.className = 'wrapper';

  const heroBanner = document.createElement('div');
  heroBanner.className = 'hero__banner';

  const bannerTitle = document.createElement('h1');
  bannerTitle.className = 'banner__title';
  bannerTitle.textContent = 'restaurant name';

  const bannerDesc = document.createElement('p');
  bannerDesc.className = 'banner__desc';
  bannerDesc.textContent = `
    Congue Leo Eros Interdum Vulputate Dictum Pulvinar Ligula Dictumst Torquent
    In Amet Phasellus Tristique Condimentum Eleifend Mollis Nibh
  `;

  hero.append(heroWrapper);
  heroWrapper.append(heroBanner);
  heroBanner.append(bannerTitle);
  heroBanner.append(bannerDesc);

  return hero;
}
