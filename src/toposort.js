const toposort = (collection, sorted = [], length = -1) => {
  const withDeps = [];
  const keys = [];

  // Pass 1: Remove any items without dependencies and add them to sorted list
  collection.forEach((item) => {
    if (item[1].length === 0) {
      sorted.push(item[0]);
    } else {
      withDeps.push(item);
      keys.push(item[0]);
    }
  });

  if (keys.length === 0) {
    return { error: null, sorted };
  }

  if (keys.length === length) {
    return { error: 'Cyclic collection' };
  }

  // Pass 2: Remove any values that are not in the list of keys; and repeat
  withDeps.forEach(([k, dependencies]) => {
    dependencies.forEach((dep, index) => {
      if (!keys.includes(dep)) {
        dependencies.splice(index, 1);
      }
    });
  });
  return toposort(withDeps, sorted, withDeps.length);
};

export default toposort;
