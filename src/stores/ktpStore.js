import { computed, observable } from "mobx";


class dataKtp {
  @observable _idx
  @observable nik
  @observable fullName
  @observable bornPlace
  @observable bornDay
  @observable bornMonth
  @observable bornYear
  @observable gender
  @observable streetAddress
  @observable rt
  @observable rw
  @observable kelurahanType
  @observable kelurahanName
  @observable kecamatan
  @observable cityType
  @observable cityName
  @observable martialStatus
  @observable occupation

  constructor(value) {
    _idx = new Date();
  }


}



class KtpStore {
  @observable KTPS = [];

  addNewKtp(value) {
    this.KTPS.push(value);
  }

  // addNewKtp(value) {
  //    const pihak = this.dataKtp;
  //   // const noUrut = (Object.keys(pihak).length - 1) + 1;
  //   const noUrut = new Date().toISOString();
  //   pihak[`${noUrut}`] = value;
  // }

  updateKtp(value) {
    const pihak = this.dataKtp;
    const noUrut = value._index;
    // pihak[`${noUrut}`] = value;
    pihak[`${noUrut}`] = value;
  }
}


export default new KtpStore;
