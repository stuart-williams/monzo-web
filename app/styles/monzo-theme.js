import { createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'
import { indigo } from 'material-ui/styles/colors'
import { monzoDark } from './colours'

export default createMuiTheme({
  palette: createPalette({
    primary: {
      ...indigo,
      '500': monzoDark
    }
  })
})
