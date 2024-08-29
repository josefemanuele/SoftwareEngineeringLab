export function getOrganizations() {
	return organizations;
}

export function getOrganizationById(org_id) {
	let tmp = organizations.filter(org => org.id === org_id);

	return tmp.length === 1 ? tmp[0] : null;
};

export function getEventById(event_id) {
	let tmp = events.filter(event => event.id === event_id);

	if (tmp.length !== 1) {
		return null;
	}

	let event = JSON.parse(JSON.stringify(tmp[0]));
	event.reservations = Math.round(Math.random() * event.capacity);

	return event;
}

export function getEventsOfOrganization(org_id) {
	return events.filter(event => event.organization_id === org_id);
};

export function getReservationById(resv_id) {
	let tmp = reservations.filter(resv => resv.id === resv_id);

	if (tmp.length !== 1) {
		return null;
	}

	let resv = JSON.parse(JSON.stringify(tmp[0]));
	resv.event_data = getEventById(resv.event_id);

	return resv;
}

export function getReservationsOfUser(user_id) {
	let tmp = reservations.filter(resv => resv.user_id === user_id);
	tmp = reservations.map(resv => {
		resv = JSON.parse(JSON.stringify(resv));
		resv.event_data = getEventById(resv.event_id);

		return resv;
	});

	return tmp;
}

export function addReservation(event_id, booking_data, payment_data) {
	let maxId = reservations.reduce((acc, { id }) => Math.max(acc, id), 0) + 1;

	let reservation = {
		id: maxId,
		event_id,
		user_id: 1,
		booking_data,
		payment_data,
	};

	reservations.push(reservation);
}

export function removeReservation(resv_id) {
	reservations = reservations.filter(resv => resv.id !== resv_id);
}

export default {
	getOrganizations,
	getOrganizationById,

	getEventById,
	getEventsOfOrganization,

	getReservationById,
	getReservationsOfUser,
	addReservation,
	removeReservation,
};

let users = [{
	id: 1,
	email: 'johndoe@gmail.com',
	password: 'password',
	name: 'John',
	surname: 'Doe',
}, {
	id: 2,
	email: 'marksmith@gmail.com',
	password: 'password',
	name: 'Mark',
	surname: 'Smith',
}];

let organizations = [{
	id: 1,
	name: 'Melody Events Group',
	category: 'Music Event Management and Production',
	description: 'Melody Events Group is a dynamic event planning organization dedicated to curating a diverse array of live music experiences that celebrate various genres and seasonal festivals',
}, {
	id: 2,
	name: "Harmony Dance Studio",
	category: "Dance School",
	description: "A vibrant dance school offering classes in ballet, hip-hop, and contemporary dance for all ages, with experienced instructors to guide students"
}, {
	id: 3,
	name: "Pet Paws Grooming",
	category: "Pet Grooming Service",
	description: "A full-service pet grooming salon that provides bathing, cutting, and styling services for dogs and cats in a clean, welcoming environment"
}, {
	id: 4,
	name: "Wellness Haven Spa",
	category: "Spa",
	description: "A tranquil spa offering a variety of relaxing treatments, including massages, facials, and body therapies, designed to rejuvenate the mind and body"
}, {
	id: 5,
	name: "ABC Tutoring Center",
	category: "Educational Tutoring",
	description: "A tutoring center providing personalized academic support in subjects ranging from math to science for students of all grade levels"
}, {
	id: 6,
	name: "Fit & Fabulous Yoga Studio",
	category: "Fitness Studio",
	description: "A welcoming yoga studio offering a range of classes from beginner to advanced, focusing on building strength, flexibility, and inner peace"
}, {
	id: 7,
	name: "Elite Driving School",
	category: "Driving School",
	description: "A licensed driving school offering comprehensive instruction for new drivers, including both classroom training and on-road experience"
}, {
	id: 8,
	name: "Creative Minds Art Gallery",
	category: "Art Studio",
	description: "An art studio and gallery offering art classes and workshops for all ages, fostering creativity through various mediums and techniques"
}, {
	id: 9,
	name: "Glowing Skin Dermatology",
	category: "Medical Practice",
	description: "A dermatology clinic providing skin care services, including consultations, treatments, and cosmetic procedures aimed at promoting healthy skin"
}, {
	id: 10,
	name: "Adventure Explorers Outdoor Gear Rentals",
	category: "Outdoor Equipment Rental",
	description: "A rental service for outdoor gear, including camping, hiking, and water sports equipment, perfect for adventure enthusiasts looking to explore nature"
}];

let events = [{
  id: 1,
	organization_id: 1,
  name: "Summer Vibes Festival",
  location: "Central Park, New York City",
  date: "15/07/2024",
  start_time: "1:00",
  end_time: "2:00",
  category: "Festival",
  price: 50,
  description: "Join us for a night filled with sunshine, music, and good vibes featuring top local bands.",
  capacity: 5000
}, {
  id: 2,
	organization_id: 1,
  name: "Rock the Night Away",
  location: "The Forum, Los Angeles",
  date: "20/08/2024",
  start_time: "1:30",
  end_time: "2:00",
  category: "Concert",
  price: 75,
  description: "Experience an electrifying night with your favorite rock band at one of LA's premier venues.",
  capacity: 3000
}, {
  id: 3,
	organization_id: 1,
  name: "Acoustic Under the Stars",
  location: "Riverside Amphitheater, Chicago",
  date: "10/09/2024",
  start_time: "1:00",
  end_time: "2:00",
  category: "Acoustic",
  price: 40,
  description: "Enjoy an intimate acoustic set surrounded by nature's beauty as the sun sets.",
  capacity: 1500
}, {
  id: 4,
	organization_id: 1,
  name: "Fall Fest Music Bash",
  location: "Orchard Park, Denver",
  date: "05/10/2024",
  start_time: "1:00",
  end_time: "2:00",
  category: "Festival",
  price: 35,
  description: "Celebrate the season with music, food trucks, and fun activities for the whole family!",
  capacity: 3500
}, {
  id: 5,
	organization_id: 1,
  name: "Winter Wonderland Concert",
  location: "Snow Dome, Minneapolis",
  date: "15/12/2024",
  start_time: "1:00",
  end_time: "2:00",
  category: "Holiday",
  price: 60,
  description: "Experience the spirit of the holidays with festive music and special guest performances.",
  capacity: 2000
}, {
  id: 6,
	organization_id: 1,
  name: "Spring Awakening Concert",
  location: "Blossom Music Center, Ohio",
  date: "22/04/2025",
  start_time: "1:30",
  end_time: "2:30",
  category: "Concert",
  price: 45,
  description: "Celebrate the arrival of spring with an outdoor concert featuring beloved local artists.",
  capacity: 4000
}, {
  id: 7,
	organization_id: 1,
  name: "Country Jam Night",
  location: "Grand Ole Opry, Nashville",
  date: "18/05/2025",
  start_time: "2:00",
  end_time: "2:30",
  category: "Country",
  price: 80,
  description: "A night filled with country hits and classic favorites from top artists in the genre.",
  capacity: 2000
}, {
  id: 8,
	organization_id: 1,
  name: "Indie Night Out",
  location: "The Echo, Los Angeles",
  date: "30/06/2025",
  start_time: "2:00",
  end_time: ":00",
  category: "Indie",
  price: 30,
  description: "Discover new sounds from up-and-coming indie artists in an eclectic venue.",
  capacity: 800
}, {
  id: 9,
	organization_id: 1,
  name: "Jazz Soiree",
  location: "Blue Note, New York City",
  date: "14/03/2025",
  start_time: "2:00",
  end_time: "2:00",
  category: "Jazz",
  price: 55,
  description: "A night of smooth tunes and improvisational magic from renowned jazz musicians.",
  capacity: 1200
}, {
  id: 10,
	organization_id: 1,
  name: "Classical Evenings",
  location: "Sydney Opera House, Sydney",
  date: "25/08/2025",
  start_time: "1:30",
  end_time: "2:00",
  category: "Classical",
  price: 100,
  description: "Experience a mesmerizing evening with the city's finest orchestra in an iconic setting.",
  capacity: 1800,
}];

let reservations = [{
	id: 1,
	event_id: 1,
	user_id: 1,
	booking_data: {
		participants: 7,
		notes: 'Some notes...',
	},
	payment_data: {}
}];
