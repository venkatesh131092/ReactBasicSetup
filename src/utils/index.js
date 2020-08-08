import { isArray } from "util";

export const toCamelCase = text => {
  if (text && typeof text === "string") {
    const arr = text.split("_");
    let modifiedStr = "";
    arr.forEach((eachWord, i) => {
      if (i === 0) {
        modifiedStr += eachWord.toLowerCase();
      } else {
        modifiedStr =
          modifiedStr +
          eachWord[0].toUpperCase() +
          eachWord.substr(1).toLowerCase();
      }
    });
    return modifiedStr;
  }
};

function localStorageConfigs(prefix) {
  return {
    set: (key, value) =>
      localStorage.setItem(`${prefix}_${key}`, JSON.stringify(value)),
    get: key => {
      const value = localStorage.getItem(`${prefix}_${key}`);
      if (value) {
        try {
          return JSON.parse(value);
        } catch (err) {
          return value;
        }
      }
    },
    remove: key => localStorage.removeItem(`${prefix}_${key}`),
    clear: () => localStorage.clear()
  };
}
export const ls = localStorageConfigs("myapp");

export const setAccessToken = token => {
  ls.set("accessToken", token);
};
export const getAccessToken = () =>
  // set how you want to get accessToken
  ls.get("accessToken");

export const getNested = (path, source, defaultValue) => {
  let value = source;
  try {
    path.split(/[.[\]]/).forEach(key => key && (value = value[key]));
  } catch (err) {
    console.log(`error while parsing ${path}`);
    value = defaultValue;
  }
  return value;
};

export const diffPlease = (path, prevSource, newSource) => {
  const successPath = isArray(path) ? path[0] : path;
  const cbParamPath = isArray(path) ? path[1] : null;
  const hasChanged =
    getNested(successPath, prevSource) !== getNested(successPath, newSource);
  const isSuccess = getNested(successPath, newSource);
  let value;
  if (cbParamPath) {
    value = getNested(cbParamPath, newSource);
  }
  return {
    isSuccess(callback) {
      if (hasChanged && isSuccess) callback(value);
      return {
        isFailed(callback) {
          if (hasChanged && !isSuccess) callback(value);
        }
      };
    }
  };
};

export const getNestedPro = (source, defaultValue) => (stringsArr, ...fns) => {
  const isTaggedTemplageLiteral = fns.length > 0;
  let actualValue = source;
  if (isTaggedTemplageLiteral) {
    try {
      stringsArr.forEach((stringPath, i) => {
        actualValue = getNested(stringPath, actualValue, defaultValue);
        if (fns[i]) {
          actualValue = fns[i](actualValue);
        }
      });
    } catch (err) {
      console.log(
        `error while parsing nested path,probably in function you provided`
      );
      actualValue = defaultValue;
    }
  } else {
    actualValue = getNested(stringsArr, source, defaultValue);
  }

  return actualValue;
};
