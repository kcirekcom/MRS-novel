'use strict';

module.exports = function(){
  return function(chapters, searchTerm) {
    let fuzzyRegex = generateFuzzyRegex(searchTerm);
    return chapters.filter(chapter => {
      return fuzzyRegex.test(chapter.title.toUpperCase());
    });
  };
};

function generateFuzzyRegex(input) {
  if(!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
