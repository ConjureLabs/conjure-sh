const visit = require('unist-util-visit')

module.exports = function attacher({ include, exclude } = {}) {
  const visitor = node => {
    const { lang } = node

    if (
      !lang ||
      include && !include.includes(lang) ||
      exclude && exclude.includes(lang)
    ) {
      return
    }

    node.value = node.value.replace(/^\s{2,}/mg, found => {
      const count = (found.length - (found.length % 2)) * 2 // 2 --> 4, 4 --> 8 (and stripping any extra single space)
      return ' '.repeat(count)
    })
  }

  return ast => visit(ast, 'code', visitor)
}
