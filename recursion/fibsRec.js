function fibsRec(n, seq = [0, 1]) {
  if (seq.length >= n) return seq.slice(0, n);

  const num = seq[seq.length - 2] + seq[seq.length - 1];
  seq.push(num);

  return fibsRec(n, seq);
}
