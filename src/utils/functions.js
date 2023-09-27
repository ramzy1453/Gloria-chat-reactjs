export function limitter(text, limit = 50) {
  return text?.length > limit ? text?.substring(0, limit) + "..." : text;
}
