function merge(left, right) {
  const arr = [];

  while (left.length > 0 && right.length > 0) {
    const minArr = left[0] < right[0] ? left : right;
    const val = minArr.shift();

    arr.push(val);
  }

  return arr.concat(left, right);
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}
