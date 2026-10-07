// Remove recipes for every Chipped torch variant.
ServerEvents.recipes(event => {
  event.remove({ id: /^chipped:.*torch.*$/ })
  event.remove({ output: /^chipped:.*torch.*$/ })
})
