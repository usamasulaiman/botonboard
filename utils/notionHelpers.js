import get from 'lodash-es/get';

export const getInfoFromNotionDBList = (list, comma_separated_nodes_array) => {
  return list && list.length ? list.map(item => get(item, comma_separated_nodes_array)) : []
}