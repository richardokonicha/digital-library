
const obj = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
    },
}

export default async (req, res) => {
    const response = await fetch('https://api.airtable.com/v0/app89hVUuXaclfNRh/materials?maxRecords=10&view=Grid%20view', obj)
        .then(function (res) {
            return res.json();
        })
        .then(function (resJson) {
            return resJson;
        })
    res.status(200).json({ response });
};

