export const StringUtils = {
  getTopTags: (tagsArray: string[], topN: number) => {
    let allTags = tagsArray
      .flatMap(tags => tags.split(','))
      .filter(tag => !!tag);

    // Count occurrences of each tag
    let tagCounts = allTags.reduce((counts: any, tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
      return counts;
    }, {});

    let sortedTags = Object.entries(tagCounts)
      .sort((a: any[], b: any[]) => b[1] - a[1])
      .map(entry => entry[0]);

    return sortedTags.slice(0, topN);
  },

  splitStringByQuery: (inputStr: string, query: string) => {
    if (!query) {
      return [inputStr];
    }
    const indexes = [...inputStr.matchAll(new RegExp(query, 'gi'))].map(
      value => value.index,
    ) as number[];
    const outputStrArray: string[] = [];
    let fromIndex = 0;

    indexes.forEach(valueIndex => {
      if (!valueIndex) {
        return;
      }
      const strLeft = inputStr.substring(fromIndex, valueIndex);
      if (strLeft) {
        outputStrArray.push(strLeft);
      }

      const strRight = inputStr.substring(
        valueIndex,
        valueIndex + query.length,
      );
      if (strRight) {
        outputStrArray.push(strRight);
      }

      fromIndex = valueIndex + query.length;
    });
    outputStrArray.push(inputStr.substring(fromIndex));

    return outputStrArray;
  },
};
