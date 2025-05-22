export default function domain(path?: string) {
  // return 'https://admin.printout.solutions/api'
  return `https://admin.printout.solutions/${path || ''}`
}
