interface Box {
  x: number;
  y: number;
  h: number;
  w: number;
}

/**
 * Return the distance between two points
 * @param  {number} pointX0 - X-coord of first point
 * @param  {number} pointY0 - Y-coord of first point
 * @param  {number} pointX1 - X-coord of second point
 * @param  {number} pointY1 - Y-coord of second point
 * @example
 * // Get the distance between point (0,0) and (3,4)
 * // returns 5
 * getDistance(0, 0, 3, 4)
 */
// export function getDistance(pointX0: number, pointY0: number, pointX1: number, pointY1: number) {
//     return Math.hypot(pointY1 - pointY0, pointX1 - pointX0);
// }

/**
 * @param  {Box} b1
 * @param  {Box} b2
 */
export function getWirePath(b1: Box, b2: Box): string {
  let p1x = b1.x + b1.w;
  let p1y = b1.y + b1.h / 2;
  let p2x = b2.x + b2.w / 2;
  let p2y = b2.y + b2.h;
  console.log(b2);

  switch (quadrant(b1.x, b1.y, b2.x, b2.y)) {
    case 1:
      console.log('1');
      p1x = b1.x;
      p1y = b1.y + b1.h / 2;
      p2x = b2.x + b2.w / 2;
      p2y = b2.y + b2.h;

      break;
    case 2:
      console.log('2');
      p1x = b1.x + b1.w;
      p1y = b1.y + b1.h / 2;
      p2x = b2.x + b2.w / 2;
      p2y = b2.y + b2.h;
      break;
    case 3:
      console.log('3');
      p1x = b1.x;
      p1y = b1.y + b1.h / 2;
      p2x = b2.x + b2.w / 2;
      p2y = b2.y + b2.h;
      break;
    case 4:
      console.log('4');
      p1x = b1.x + b1.w;
      p1y = b1.y + b1.h / 2;
      p2x = b2.x + b2.w / 2;
      p2y = b2.y + b2.h;
      break;
    default:
      console.log('default');
  }

  let [sx, sy, ex, ey, r1, r2, d, bax, bay, eax, eay] = getWire(
    p1x,
    p1y,
    p2x,
    p2y
  );
  const path = `M${sx},${sy} L${bax},${bay} a ${r1},${r2} 90 0 ${d} ${eax},${eay} L${ex},${ey}`;
  // console.log(path);
  return path;
}
/**
 * @param  {number} pointX0 - X-coord of first point
 * @param  {number} pointY0 - Y-coord of first point
 * @param  {number} pointX1 - X-coord of second point
 * @param  {number} pointY1 - Y-coord of second point
 * @returns {number[]} - points for creating a wire shape
 */
export function getWire(
  pointX0: number,
  pointY0: number,
  pointX1: number,
  pointY1: number
): number[] {
  const sx = pointX0;
  const sy = pointY0;
  const ex = pointX1;
  const ey = pointY1;
  const dx = Math.abs(ex - sx);
  const dy = Math.abs(ey - sy);
  let r1: number;

  let bax = ex;
  let bay = ey;
  let d = 0;

  if (dx <= dy) {
    r1 = dx / 2;
  } else {
    r1 = dy / 2;
  }

  let r2: number = r1;
  let eax = r1;
  let eay = r1;

  switch (quadrant(sx, sy, ex, ey)) {
    case 1:
      bax = ex + r1;
      bay = sy;
      eax = -r1;
      eay = -r1;
      d = 1;
      break;
    case 2:
      bax = ex - r1;
      bay = sy;
      eax = r1;
      eay = -r1;
      d = 0;
      break;
    case 3:
      bax = ex + r1;
      bay = sy;
      eax = -r1;
      eay = r1;
      d = 0;
      break;
    case 4:
      bax = ex - r1;
      bay = sy;
      d = 1;
      break;
    default:
      bax = ex + r1;
      bay = sy;
      eax = -r1;
      eay = -r1;
      d = 1;
  }
  return [sx, sy, ex, ey, r1, r2, d, bax, bay, eax, eay];
}

/**
 * Returns the the quadrant (1, 2, 3, 4) the end point is
 * using the starting point as the origin of a grid.
 *
 * @param  {number} sx - X-coord of first point
 * @param  {number} sy - Y-coord of first point
 * @param  {number} ex - X-coord of second point
 * @param  {number} ex - Y-coord of second point
 * @returns {number} the quadrant
 * @example
 * quadrant(50, 50, 40, 40) - returns 1
 * ------------------
 * |   1    |   2   |
 * ---------+--------
 * |   3    |   4   |
 * ------------------
 */
function quadrant(sx: number, sy: number, ex: number, ey: number): number {
  if (ex > sx && ey > sy) return 4;
  else if (ex < sx && ey > sy) return 3;
  else if (ex < sx && ey < sy) return 1;
  else if (ex > sx && ey < sy) return 2;
  else if (ex == 0 && ey > sy) return 3;
  else if (ex == 0 && ey < sy) return 1;
  else if (ey == 0 && ex < sx) return 1;
  else if (ey == 0 && ex > sx) return 3;
  else return 1;
}
