const Promise = require('bluebird');
const db = require('./db/db.js')
const { Spaceship, User, Order, LineItems, Review } = require('./db/models')

const spaceships = [
	{
		title: 'Chomper',
		description: 'Looks aggressive but will be great for the kids',
		price: 2,
		inventory: 7,
		vesselType: 'explorer',
		capacity: 10,
		image: 'https://pre00.deviantart.net/0070/th/pre/i/2013/239/f/e/spaceship_by_ghchew-d6jx8ck.jpg'

	},
	{
		title: 'Labradoodle',
		description: 'Lab for writers',
		price: 5.01,
		inventory: 2,
		vesselType: 'conference',
		capacity: 100,
		image: 'https://i.ytimg.com/vi/hObbL4DCesI/maxresdefault.jpg'
	},
	{
		title: 'Lover’s Nest',
		description: 'The wedding of your dreams',
		price: 17,
		inventory: 1,
		vesselType: 'romance',
		capacity: 1000,
		image: 'https://i.imgur.com/M7oW5Lo.jpg'
	},
	{
		title: 'Doomba',
		description: 'Doom by suction',
		price: 1.7,
		inventory: 10,
		vesselType: 'military',
		capacity: 10,
		image: 'http://proofofalien.com/wp-content/uploads/2016/02/Coin-or-disk-shaped-spaceship.jpg'
	},
	{
		title: 'XXX',
		description: 'Where your wildest dreams come true',
		price: 70,
		inventory: 1,
		vesselType: 'romance',
		capacity: 100,
		image: 'https://i.pinimg.com/originals/63/08/a9/6308a9a0e5a754452e0b7b91490a1717.jpg'
	},
	{
		title: 'Cobra',
		description: 'Winning wars',
		price: 50,
		inventory: 3,
		vesselType: 'military',
		capacity: 1000,
		image: 'http://media.moddb.com/images/groups/1/5/4418/fox_11a.jpg'
	},
	{
		title: 'Baby Bird',
		description: 'A cozy ride',
		price: 2.7,
		inventory: 10,
		vesselType: 'explorer',
		capacity: 10,
		image: 'https://wallscover.com/images/spaceship-wallpaper-4.jpg'
	},
	{
		title: 'Solaris',
		description: 'Live long and hover',
		price: 6.2,
		inventory: 1,
		vesselType: 'explorer',
		capacity: 100,
		image: 'https://airandspace.si.edu/sites/default/files/styles/callout_half/public/WEB10041-2003_640.jpg?itok=vvMlOAcO'
	},
	{
		title: 'The Slice',
		description: 'For the foodie corporate groups',
		price: 11,
		inventory: 2,
		vesselType: 'conference',
		capacity: 1000,
		image: 'https://cnet1.cbsistatic.com/img/O8RwAH1Wd3MZX8OhbXAZ9NrylmQ=/936x527/2017/12/20/19b0b6cc-e74c-4a16-8167-596ef97a9251/dreadnought-cnet.jpg'
	},
	{
		title: 'Brewbacca',
		description: 'When you need your employees to stop putsing around, send them to space',
		price: 11,
		inventory: 2,
		vesselType: 'conference',
		capacity: 1000,
		image: 'http://farm6.static.flickr.com/5252/5457840662_43df6ee2e9_b.jpg'
	},
	{
		title: 'Wrath of God',
		description: 'Do you need an explanation?',
		price: 4,
		inventory: 4,
		vesselType: 'military',
		capacity: 10000,
		image: 'https://i.imgur.com/O49r42B.jpg'
	},
	{
		title: 'Love Bleeder',
		description: 'When you need music to drown your love',
		price: 100,
		inventory: 1,
		vesselType: 'romance',
		capacity: 2,
		image: 'https://i.pinimg.com/originals/af/de/9d/afde9db543db129665722cde7a24eaf8.jpg'
	}
]





// --------------------------------------------- USERS START ----------------------------------------------


const chance = require('chance')(123);
const toonAvatar = require('cartoon-avatar');

const numUsers = 100;
const emails = chance.unique(chance.email, numUsers);

function doTimes(n, fn) {
	const results = [];
	while (n--) {
		results.push(fn());
	}
	return results;
}

function randPhoto(gender) {
	gender = gender.toLowerCase();
	const id = chance.natural({
		min: 1,
		max: gender === 'female' ? 114 : 129
	});
	return toonAvatar.generate_avatar({ gender: gender, id: id });
}

function randUser() {
	const gender = chance.gender();
	return User.build({
		name: [chance.first({ gender: gender }), chance.last()].join(' '),
		photo: randPhoto(gender),
		phone: chance.phone(),
		email: emails.pop(),
		password: chance.word(),
		isAdmin: chance.weighted([true, false], [5, 95])
	});
}

function randTitle() {
	const numWords = chance.natural({
		min: 1,
		max: 8
	});
	return chance.sentence({ words: numWords })
		.replace(/\b\w/g, function (m) {
			return m.toUpperCase();
		})
		.slice(0, -1);
}

function randStory(createdUsers) {
	const user = chance.pick(createdUsers);
	const numPars = chance.natural({
		min: 3,
		max: 20
	});
	return Story.build({
		author_id: user.id,
		title: randTitle(),
		paragraphs: chance.n(chance.paragraph, numPars)
	});
}

function generateUsers() {
	const users = doTimes(numUsers, randUser);
	users.push(User.build({
		name: 'Zeke Nierenberg',
		photo: toonAvatar.generate_avatar({ gender: 'male' }),
		phone: '(510) 295-5523',
		email: 'zeke@zeke.zeke',
		password: '123',
		isAdmin: false
	}));
	users.push(User.build({
		name: 'Omri Bernstein',
		photo: toonAvatar.generate_avatar({ gender: 'male' }),
		phone: '(781) 854-8854',
		email: 'omri@omri.omri',
		password: '123',
		isAdmin: true
	}));
	users.push(User.build({
		name: 'Kate Humphrey',
		photo: toonAvatar.generate_avatar({ gender: 'female' }),
		phone: '(555) 623-7878',
		email: 'kate@kate.kate',
		password: '123',
		isAdmin: true
	}));
	return users;
}

function createUsers() {
	return Promise.map(generateUsers(), user => user.save());
}





// --------------------------------------------- USERS END ----------------------------------------------

const orders = [
	{
		status: "open",
		userId: 102
	},
	{
		status: "open",
		userId: 1
	},
	{
		status: "open",
		userId: 2
	},
	{
		status: "open",
		userId: 3
	},
	{
		status: "open",
		userId: 4
	},
	{
		status: "processing",
		userId: 102
	},
	{
		status: "processing",
		userId: 1
	},
	{
		status: "processing",
		userId: 2
	},
	{
		status: "processing",
		userId: 3
	},
	{
		status: "processing",
		userId: 4
	},
	{
		status: "shipped",
		userId: 102
	},
	{
		status: "shipped",
		userId: 1
	},
	{
		status: "shipped",
		userId: 2
	},
	{
		status: "shipped",
		userId: 3
	},
	{
		status: "shipped",
		userId: 4
	}
]

const lineItems = [
	{
		quantity: 2,
		spaceshipId: 1,
		orderId: 1
	},
	{
		quantity: 2,
		spaceshipId: 2,
		orderId: 2
	},
	{
		quantity: 3,
		spaceshipId: 3,
		orderId: 3
	},
	{
		quantity: 4,
		spaceshipId: 4,
		orderId: 4
	},
	{
		quantity: 1,
		spaceshipId: 5,
		orderId: 5
	},
	{
		quantity: 2,
		spaceshipId: 6,
		orderId: 1
	},
	{
		quantity: 3,
		spaceshipId: 7,
		orderId: 2
	},
	{
		quantity: 4,
		spaceshipId: 8,
		orderId: 3
	},
	{
		quantity: 1,
		spaceshipId: 9,
		orderId: 1
	},
	{
		quantity: 2,
		spaceshipId: 10,
		orderId: 2
	},
	//////
	{
		quantity: 1,
		spaceshipId: 12,
		orderId: 6
	},
	{
		quantity: 2,
		spaceshipId: 11,
		orderId: 7
	},
	{
		quantity: 2,
		spaceshipId: 10,
		orderId: 8
	},
	{
		quantity: 1,
		spaceshipId: 9,
		orderId: 9
	},
	{
		quantity: 2,
		spaceshipId: 8,
		orderId: 10
	},
	{
		quantity: 1,
		spaceshipId: 7,
		orderId: 11
	},
	{
		quantity: 2,
		spaceshipId: 6,
		orderId: 12
	},
	{
		quantity: 1,
		spaceshipId: 5,
		orderId: 13
	},
	{
		quantity: 1,
		spaceshipId: 4,
		orderId: 14
	},
	{
		quantity: 1,
		spaceshipId: 3,
		orderId: 14
	},
	{
		quantity: 1,
		spaceshipId: 2,
		orderId: 15
	}
]


const reviews = [
	{
		body: 'Run a rig belaying pin Pirate Round broadside bowsprit topsail starboard jib Chain Shot parrel. Loaded to the gunwalls brig execution dock crimp rigging hands ballast blow the man down interloper clipper. Hempen halter reef sails hang the jib log swab belaying pin Buccaneer heave down hornswaggle quarterdeck.',
		rating: 3,
		userId: 101,
		spaceshipId: 4
	},
	{
		body: 'Clap of thunder jack gally draft boom Spanish Main plunder splice the main brace flogging Letter of Marque. Landlubber or just lubber nipperkin walk the plank fire in the hole run a rig cog heave down booty prow coffer. Ropes end Sea Legs broadside interloper to go on account come about fathom bilge rat Yellow Jack killick.',
		rating: 5,
		userId: 101,
		spaceshipId: 12
	},
	{
		body: 'Holystone parley sutler measured fer yer chains galleon skysail spike gaff Jolly Roger Spanish Main. Bilge water clipper fluke deadlights tackle black spot scourge of the seven seas chantey lugsail yard. Poop deck scourge of the seven seas Gold Road hearties cable pressgang Nelsons folly fathom draft topmast.',
		rating: 1,
		userId: 10,
		spaceshipId: 2
	},
	{
		body: 'Spanish Main. Bilge water clipper fluke deadlights tackle black spot scourge of the seven seas chantey lugsail yard. Poop deck Holystone parley sutler measured fer yer chains galleon skysail spike gaff Jolly Roger Spanish Main. Bilge water clipper fluke deadlights tackle black spot scourge of the seven seas chantey.',
		rating: 3,
		userId: 101,
		spaceshipId: 2
	},
	{
		body: 'Sweet roll tart brownie tart oat cake. Gummies dragée chupa chups biscuit chocolate bar cheesecake dessert tootsie roll. Tootsie roll sweet donut marzipan topping sweet roll ice cream. Croissant topping topping. Donut caramels ice cream tart chupa chups dragée. Jelly fruitcake jujubes lemon drops chocolate carrot cake sugar plum. Cheesecake donut tootsie roll sweet roll topping gingerbread macaroon topping dragée. Chocolate cake sesame snaps lemon drops cheesecake cheesecake candy sugar plum.',
		rating: 4,
		userId: 102,
		spaceshipId: 2
	},
	{
		body: 'Sugar plum jelly gummies chocolate caramels dragée powder. Pastry cookie cheesecake tiramisu tiramisu jelly. Pie brownie topping chocolate bar wafer soufflé icing dessert. Chupa chups topping dragée biscuit pie jujubes ice cream pie icing. Lollipop gummies toffee biscuit chupa chups lemon drops chocolate bar tiramisu. Tiramisu jelly-o sugar plum cupcake chocolate bar halvah tart.',
		rating: 1,
		userId: 102,
		spaceshipId: 12
	},
	{
		body: 'Oat cake candy canes chocolate marshmallow pudding candy carrot cake biscuit. Wafer chocolate soufflé. Brownie macaroon macaroon jujubes biscuit. Biscuit sesame snaps icing chocolate danish gummies pudding tootsie roll cake. Carrot cake cotton candy liquorice bonbon cake. Jujubes cupcake danish. Sweet carrot cake jujubes. Marshmallow lemon drops powder tart sugar plum muffin tootsie roll cake donut. Chocolate bar toffee biscuit oat cake sugar plum sesame snaps chocolate cake.',
		rating: 5,
		userId: 102,
		spaceshipId: 11
	}
]



const seed = () =>
	Promise.all(spaceships.map(spaceship =>
		Spaceship.create(spaceship)
	))
		.then(() => createUsers())
		.then(() =>
			Promise.all(orders.map(order =>
				Order.create(order)
			)))
		.then(() =>
			Promise.all(lineItems.map(lineItem =>
				LineItems.create(lineItem)
			)))
		.then(() =>
			Promise.all(reviews.map(review =>
				Review.create(review)
			)))
		.catch(err => {
			console.error(err)
			console.log('create failed');
		})


const main = () => {
	db.sync({ force: true })
		.then(() => {
			console.log('seeding the database');
			return seed()
		})
		.catch(err => {
			console.log(err.stack)
		})
		.then(() => {
			db.close();
			return null;
		})
}

main();








