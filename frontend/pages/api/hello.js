// var Airtable = require('airtable');
// var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app89hVUuXaclfNRh');

// base('mdl').find('rec5Unjnn8v0ayvf2', function(err, record) {
//     if (err) { console.error(err); return; }
//     console.log('Retrieved', record.id);
// });


const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app89hVUuXaclfNRh');


export default async (req, res) => {

  const response = await base('materials').find('rec5Unjnn8v0ayvf2')

  res.status(200).json({ response });
};