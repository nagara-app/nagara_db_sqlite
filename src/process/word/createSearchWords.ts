import {JMdictEntr} from '../../type/jmdict';
import {toArray, toArrayOrUndefined} from '../../utils';

export default (jmEntry: JMdictEntr): string[] | undefined => {
  const {r_ele, k_ele} = jmEntry;

  const searchWords: Set<string> = new Set();

  const jmReles = toArray(r_ele);
  const jmKeles = toArrayOrUndefined(k_ele);

  const searchJmReles = jmReles.filter(element =>
    toArrayOrUndefined(element.re_inf)?.includes('sk')
  );

  const searchJmKeles = jmKeles?.filter(element =>
    toArrayOrUndefined(element.ke_inf)?.includes('sK')
  );

  searchJmReles.forEach(element => searchWords.add(element.reb));
  searchJmKeles?.forEach(element => searchWords.add(element.keb));

  if (searchWords.size > 0) {
    return [...searchWords];
  } else {
    return;
  }
};
