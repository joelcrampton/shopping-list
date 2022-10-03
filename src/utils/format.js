export function toTitleCase(text){
  if(text === '') return text;
  const broken = text.split(' ');
  broken.forEach((word, i) => {
    word = word.toLowerCase();
    word = word[0].toUpperCase() + word.substring(1);
    broken[i] = word;
  });
  return broken.join(' ');
}