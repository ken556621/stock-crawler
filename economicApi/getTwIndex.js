const axios = require("axios");


const fetchTwIndex = async () => {
    const res = await axios.get(`https://data.gov.tw/qc_download/dq_download_json.php?nid=13228&md5_url=7f7a62ecf322c57321d51cf863e2e035`);

    return res.data
};

module.exports = fetchTwIndex;