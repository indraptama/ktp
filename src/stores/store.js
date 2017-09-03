import { observable, computed } from 'mobx'

const addID = (obj,key,val) => {
  const newObj = {...obj}
  newObj[key] = val
  return newObj
}



class KTP {
  @observable _idx
  @observable ktpData

  constructor(value) {
    this._idx = Date.now()
    this.ktpData = addID(value,'_index',this._idx);
  }


}


class KtpStore {
  @observable KTPS = [];

  // add New Data
  addNewKtp(value) {
    this.KTPS.push(new KTP(value));
  }

  // update Data
  updateKtp(value) {
    const urut = this.KTPS.findIndex( i => i._idx === value._index);
    this.KTPS[urut].ktpData = value;
  }

  // Delete Data
  deleteKtp(value) {
    const urut = this.KTPS.findIndex( i => i._idx === value);
    this.KTPS.splice(urut, 1);
  }
}


export default new KtpStore;
