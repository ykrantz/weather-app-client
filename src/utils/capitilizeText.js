const capitilizeText = (str) => {
  const splitText = str.split(" ");
  const capitilize = splitText.map(
    (val) => val[0].toUpperCase() + val.slice(1)
  );
  return capitilize.join(" ");
};

export default capitilizeText;
