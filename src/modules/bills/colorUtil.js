// const colors = [
//   '#007ed6',
//   '#8399eb',
//   '#8e6cef',
//   '#9c46d0',
//   '#c758d0',
//   '#e01e84',
//   '#ff0000',
//   '#d1915c',
//   '#ffaf00',
//   '#ffec00',
//   '#d5f30b',
//   '#52d726',
//   '#1baa2f',
//   '#2dcb75',
//   '#26d7ae',
//   '#7cdddd',
//   '#5fb7d4',
//   '#97d9ff'
// ]

export const determineColor = (str) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (let i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}