function getDates(str) {
  const cond = /\s|\n/;
  if (str.length > 0) {
    const arr = str
      .split(cond)
      .map((it) => +new Date(it))
      .filter((it) => typeof it === "number" && it)
      .sort()
      .map((it) => new Date(it).toLocaleDateString())
      .join(", ");
    return arr;
  } else {
    return "";
  }
}

module.exports = { getDates }