rtb.onReady(() => {
  const completeIcon = `
  <circle cx="12" cy="12" r="8" fill="#8fd14f" fill-rule="evenodd" stroke="#0ca789" stroke-width="2.5"/>
  <circle cx="12" cy="12" r="10" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2.5"/>`

  rtb.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'ᴀᴄᴏʀɴ: Set selected as complete',
        svgIcon: completeIcon,
        positionPriority: 2,
        onClick: completeSelected
      }
    }
  })
})


async function completeSelected() {
  // gets the selected widgets on the board, returns an array
  let selection = await rtb.board.selection.get()

  // validate that we can proceed with the selected item
  if (!validateSelection(selection)) return

  let root = selection[0]

  rtb.board.widgets.shapes.update(root.id, { style: { 
    backgroundColor: completeGreen,
    borderColor: smallGreen,
    borderWidth: 16
  }})
}

const uncertainRed = "#f24726"
const incompleteYellow = "#fac710"
const completeGreen = "#8fd14f"
const smallGreen = "#0ca789"
const timeTeal = "#12cdd4"

function validateSelection(selection) {
  // validate only one selection
  if (selection.length > 1) {
    rtb.showNotification('You must only have one node selected')
    return false
  } else if (selection.length === 0) {
    rtb.showNotification('You must have at least one node selected')
    return false
  } else if (selection[0].type !== "SHAPE") {
    rtb.showNotification('The selected element must be a node')
    return false
  } else {
    return true
  }
}