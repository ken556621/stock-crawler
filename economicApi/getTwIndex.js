const axios = require("axios");


const fetchTwIndex = async () => {
    const res = await axios.get(`https://data.gov.tw/qc_download/dq_download_json.php?nid=13228&md5_url=7f7a62ecf322c57321d51cf863e2e035`);

    const cleanData = (data) => {
        const result = data.map(item => {
            Object.keys(item).map(ele => {
                item[ele] = item[ele].replace(/[a-zA-Z]/g, "").trim()
            })

            return item
        })

        // console.log(result)
    }

    cleanData(res.data)

    return res.data
};

module.exports = fetchTwIndex;