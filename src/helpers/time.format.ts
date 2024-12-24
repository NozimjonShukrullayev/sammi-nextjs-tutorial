export const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const time = Math.ceil(noOfWords / wordsPerMinute);
  return `${time} min read`;
};
