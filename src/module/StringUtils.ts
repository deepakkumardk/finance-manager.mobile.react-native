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
};
