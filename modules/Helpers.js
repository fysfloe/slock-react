export function withLeadingZero(num) {
  return (num < 10 ? "0" : "") + num
}
