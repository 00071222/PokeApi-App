export const colorToBgClass: Record<string, string> = {
  red: "bg-red-200",
  blue: "bg-blue-200",
  green: "bg-green-200",
  yellow: "bg-yellow-200",
  purple: "bg-purple-200",
  pink: "bg-pink-200",
  brown: "bg-amber-200",
  gray: "bg-gray-200",
  black: "bg-zinc-300",
  white: "bg-slate-100",
};

export function getBgClassByColor(color: string) {
  return colorToBgClass[color] ?? "bg-slate-100";
}
