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

function sortData(data) {
  return Object.keys(data)
    .sort((a, b) => b - a)
    .reduce((acc, rec) => {
      return { ...acc, [rec]: data[rec] };
    }, {});
}

module.exports = { getDates, sortData }