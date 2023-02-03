// 1    => #001
// 11   => #011
// 111  => #111
export function formatID(id: string | number) {
  return "#" + id.toString().padStart(3, "0");
}