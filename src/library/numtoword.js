// Function for convert number to Indonesian Word
function numToWord(s) {
    const th = ['', 'ribu', 'juta', 'milyar', 'triliun'];
    const dg = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan'];
    const tn = ['sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas'];
    const tw = ['dua puluh', 'tiga puluh', 'empat puluh', 'lima puluh', 'enam puluh', 'tujuh puluh', 'delapan puluh', 'sembilan puluh'];

    s = s.toString();
    s = s.replace(/[, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';

    // handle koma
    let x = s.indexOf(',');
    if (x === -1) x = s.length;
    if (x > 15) return 'nomor terlalu besar';

    let n = s.split('');
    let str = '';
    let sk = 0;

    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 === 2) {
            if (n[i] === '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] !== 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }

        } else if (n[i] !== 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 === 0) str += 'ratus ';
            sk = 1;
        }

        if ((x - i) % 3 === 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    if (x !== s.length) {
        var y = s.length;
        str += 'koma';
        for (var j = x + 1; j < y; j++) str += dg[n[j]] + ' ';
    }
    return str.replace(/\s+/g, ' ').replace("satu ratus", "seratus").replace("satu ribu", "seribu").replace("satu puluh", "sepuluh");
};

module.exports = numToWord;
