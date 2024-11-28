import _ from "lodash";

export const arraysAreEqual = (arr1: any[], arr2: any[]) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

export const objectsEqual = (obj1: any, obj2: any): boolean => {
  return _.isEqual(obj1, obj2);
};
