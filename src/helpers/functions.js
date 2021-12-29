/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function flatten(obj) {
  let arr = [];
  Object.values(obj).forEach((o) => { arr = [...arr, ...o]; });
  return arr;
}

export default flatten;
