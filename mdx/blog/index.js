// this file is needed until https://github.com/zeit/next.js/issues/3775 is resolved

import WhyConjure from './why-conjure.md'
import ConjureOpenSourced from './conjure-open-sourced.md'

import WhyConjure__Short from './why-conjure.short.md'
import ConjureOpenSourced__Short from './conjure-open-sourced.short.md'

export default {
  'why-conjure': WhyConjure,
  'conjure-open-sourced': ConjureOpenSourced
}

export const shortPosts = {
  'why-conjure': WhyConjure__Short,
  'conjure-open-sourced': ConjureOpenSourced__Short
}
