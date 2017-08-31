import { computed, observable } from "mobx";


class person {
  @observable id
  constructor() {

  }
}


class KtpStore {
  @observable dataKtp = [];

  addNewKtp(value) {
    const pihak = {...this.dataKtp};
    const noUrut = (Object.keys(pihak).length - 1) + 1;
    // pihak[`${noUrut}`] = value;
    // pihak[value.nik] = value;
    this.dataKtp.push(value)
  }


}


export default new KtpStore;


// @observable dataKtp = {
//   0: {
//     nik: "3204070911850005",
//     gender: "male",
//     fullName: "Indra pratama putra"
//   },
//   1: {
//     nik:"3204070911850005",
//     gender: "female",
//     fullName: "Indra pratama putra"
//   },
// };
