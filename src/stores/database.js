import PouchDB from 'pouchdb';
var db = new PouchDB('ktpPenghadap');


function addToDataBase(value) {

  const dataKtp = {
    _id: value._id,
    nik: value.nik,
    fullName: value.fullName,
    bornPlace: value.bornPlace,
    bornDay: value.bornDay,
    bornMonth: value.bornMonth,
    bornYear: value.bornYear,
    gender: value.gender,
    streetAddress: value.streetAddress,
    rt: value.rt,
    rw: value.rw,
    kelurahanType: value.kelurahanType,
    kelurahanName: value.kelurahanName,
    kecamatan: value.kecamatan,
    cityType: value.cityType,
    cityName: value.cityName,
    martialStatus: value.martialStatus,
    occupation: value.occupation,
  }

  db.put(dataKtp, (err, result) =>{
    if (!err) {
      console.log('is saved');
    }
  })

}


export default addToDataBase;
