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

export function removeMultipleSpace(text){
  return text.replace( /\s\s+/g, ' ' );
}

export function formatName(name){
  return toTitleCase(removeMultipleSpace(name.trim()));
}