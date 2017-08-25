import {h} from 'preact';
import numToWord from '../../../Lib/numtoword'
import monthToWord from '../../../Lib/monthtoword'

function KtpResult(props) {

  let DataKtp = props.dataKTP;
  let templateSource = {
    nik: DataKtp.nik,
    fullName: DataKtp.fullName,
    bornPlace: DataKtp.bornPlace,
    bornDate: DataKtp.bornDate,
    sex: DataKtp.sex,
    streetAddress: DataKtp.streetAddress,
    rt: DataKtp.rt,
    rw: DataKtp.rw,
    kelurahanType: DataKtp.kelurahanType,
    kelurahanName: DataKtp.kelurahanName,
    kecamatan: DataKtp.kecamatan,
    cityType: DataKtp.cityType,
    cityName: DataKtp.cityName,
    martialStatus: DataKtp.martialStatus,
    occupation: DataKtp.occupation,
  }

  const fullNameUpperCase = templateSource.fullName.toUpperCase();
  const personTitle = getTitle(templateSource.sex, templateSource.martialStatus);
  const bornDataArray = (templateSource.bornDate).split('-').map(key => parseInt(key, 10));
  const bornDateW = numToWord(bornDataArray[0]);
  const bornMonthW = monthToWord(bornDataArray[1]);
  const bornYearW = numToWord(bornDataArray[2]);

  const bornDateWord = (bornDateW+" "+bornMonthW+" "+bornYearW);
  const cityTypeAndName = templateSource.cityType+ +templateSource.cityName;

  const notarisLocation = (notarisLocation, peopleLocation) => {
    if(notarisLocation !== peopleLocation) {
      return (
        <span>{" (Untuk sementara berada di Kabupaten Bandung)."}</span>
      )
    }
  }

  return (
    <div className="lh-copy courier ttc" key={templateSource.nik}>
    <p>
      {`${personTitle} ${fullNameUpperCase}, lahir di ${templateSource.bornPlace} pada tanggal ${templateSource.bornDate} (${bornDateWord}), ${templateSource.occupation}, Warga Negara Indonesia. Pemegang Kartu Tanda Penduduk dengan Nomor Induk Kependudukan (NIK) ${templateSource.nik}. Bertempat tinggal di ${templateSource.cityType} ${templateSource.cityName}, ${templateSource.streetAddress}, Rukun Tetangga ${templateSource.rt}, Rukun Warga ${templateSource.rw}, ${templateSource.kelurahanType} ${templateSource.kelurahanName}, Kecamatan  ${templateSource.kecamatan}`}
      {notarisLocation('bandung', templateSource.cityName)}
    </p>
  </div>
  )
}

function getTitle(sex, martialStatus) {
  if (sex === 'male') {
    return 'Tuan'
  } else if (sex === 'female' && martialStatus === 'single') {
    return 'Nona'
  }
  return 'Nyonya'
}

export default KtpResult
