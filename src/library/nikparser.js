function nikParser(nik) {
  let result = {};
  const arrayNik = nik.split('').map(key => parseInt(key, 10));
  const cityCode = arrayNik.slice(0,4).join("");
  const kecamatanCode = arrayNik.slice(0,6).join("");
  const bornDate = arrayNik.slice(6,8).join("");
  const bornMonth = arrayNik.slice(8,10).join("");
  const bornYear = arrayNik.slice(10,12).join("");

  const date = parseFloat(bornDate) >= 40 ? parseFloat(bornDate) - 40 : parseFloat(bornDate);
  const dateZero = date.toString().length === 1 ? "0"+(date.toString()) : date.toString();
  const month = parseFloat(bornMonth);
  const year = parseFloat('19'+bornYear);
  const gender = parseInt(bornDate, 10) >= 40 ? 'female' : 'male';

  const dateAll = dateZero+"-"+bornMonth+"-19"+bornYear


  result['cityCode'] = cityCode
  result['kecamatanCode'] = kecamatanCode
  result['bornDate'] = dateAll
  result['bornMonth'] = month
  result['bornYear'] = year
  result['sex'] = gender

  return result
}

export default nikParser;
