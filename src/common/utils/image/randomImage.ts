const randomImage = () => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Math.floor(
    Math.random() * 99 + 1
  )}.png`;
};

export default randomImage;
