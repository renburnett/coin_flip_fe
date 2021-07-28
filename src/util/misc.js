
export const convertMillisecondsToDate = (milliseconds) => {
  if (!milliseconds) {
    return undefined
  }
  const d = new Date(milliseconds).toISOString()
  return d.split('T')[0]
}