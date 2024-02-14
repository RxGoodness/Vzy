export const toHours = (time_shorthand: string) => {
  let time_suffixes: { [char: string]: number } = {
    h: 1,
    d: 24,
    w: 168,
    m: 730, //or 720?
  };
  let time_unit = time_shorthand[time_shorthand.length - 1];

  let multiplier = time_shorthand.slice(0, time_shorthand.length - 1);
  let unit_value_in_hour: number = time_suffixes[`${time_unit}`];
  if (!unit_value_in_hour) return { message: "unknown unit" };
  let value = Number(multiplier) * unit_value_in_hour;
  if (!value) return { message: "bad input" };
  return { value };
};
