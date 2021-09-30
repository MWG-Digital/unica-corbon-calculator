function carbonSaved() {
  const totalOnTheEnd = 1341.77
  const finalDate = new Date(2021, 8, 15, 12, 0, 0, 0).getTime()
  const startDate = new Date(2021, 8, 1, 0, 0, 0, 0).getTime()
  const now = new Date().getTime()
  const diffEndFromNow = finalDate - now
  const diffEndStart = finalDate - startDate
  const carbonSavedNow =
    totalOnTheEnd - (totalOnTheEnd / diffEndStart) * diffEndFromNow

  if (carbonSavedNow > totalOnTheEnd) {
    return totalOnTheEnd
  }

  if (carbonSavedNow < 0) {
    return 0
  }

  return Math.round(carbonSavedNow * 1000) / 1000
}

console.log(carbonSaved())
