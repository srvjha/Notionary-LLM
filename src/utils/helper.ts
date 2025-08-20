export const isMarkdown = (text: string) => {
  const mdRegex = /[#*_`~]/; // covers headings, bold, italic, code, strike
  return mdRegex.test(text);
}