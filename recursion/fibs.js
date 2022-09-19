function fibs(n) {
  const fibArr = [0, 1];

  if (n <= 0) return [];
  if (n < 2) return fibArr.slice(0, n);

  for (let i = 2; i < n; i += 1) {
    const num = fibArr[fibArr.length - 2] + fibArr[fibArr.length - 1];
    fibArr.push(num);
  }

  return fibArr;
}
