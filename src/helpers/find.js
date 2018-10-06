import wordlist from '../constant/wordlist'

export default find = (query, lengt = 2, cb) => {
  const q = query.substr(query.length > lengt ? query.length - lengt : 0, lengt)
  const patt = new RegExp(`\\w${q}\\b`);
  const result = wordlist.filter(e => patt.test(e))
  cb(result)
}