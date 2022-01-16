const App = require("./app")

App.listen(App.get('port'), () => {
  console.log(`Blog API is listening on port ${App.get('port')}`)
})
