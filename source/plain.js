const plain = Arrays => Arrays.reduce((result, curr) => result.concat(Array.isArray(curr) ? plain(curr) : curr), []);
