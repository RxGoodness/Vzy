export default (value: number, dp = 2) =>
  Math.round((Number(value) + Number.EPSILON) * Math.pow(10, Number(dp)));
