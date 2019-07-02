//const cool = require('cool-ascii-faces')
const express = require('express')
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/calcPost', getRate)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
app.use(express.static('public'))

/*
Core Functions for the Postage Calculations
*/
function getRate(req, res) {

	console.log("getting postage");

	var weight = req.query.weight;
	var mailType = req.query.mailType;

	var price = calculateRate(weight, mailType);

	params = {
		weight: weight,
		mailType: mailType,
		price: price,
	}

	res.render('pages/displayRate', params);
}

function calculateRate(weight, mailType) {
	console.log("calculating postage");

	switch(mailType) {
		case "stamped":
			console.log("postage: stamped");
			return 0.49 + (Number(weight) - 1) * 0.21;
			break;
		case "metered":
			console.log("postage: metered");
			return 0.46 + (Number(weight) - 1) * 0.21;
			break;
		case "largeEvn":
			console.log("postage: largeEnv");
			return 0.98 + (Number(weight) - 1) * 0.21;
			break;
		case "parcel":
			console.log("postage: parcel");
			if (Number(weight) >= 4) {
				return 2.67 + (Number(weight) - 4) * 0.18;
			}
			else {
				return 2.67;
			} 
			break;
		default:
			console.log("postage default");
	}
}