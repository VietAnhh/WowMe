var express = require('express');
var router = express.Router();
var requests = require('request');
var qr = require('qr-image');
var fs = require('fs');

var DBurl = "https://cokecola-1c235.firebaseio.com/";

var sampleData = {
  contact: {
    first_name: "Steve",
    last_name: "Jobs",
    location: "San Francisco, California",
    total_connected: 13,
    title: "Founder of Apple",
    biograpghy: '“I have looked in the mirror every morning and asked myself: "If today were the last day of my life, would I want to do what I am about to do today?"',
    age: "56",
    dob: "2/5/1955",
    email: "",
    main_profile_pic_url: "http://www4.pictures.zimbio.com/gi/In+Profile+Steve+Jobs+6_BAkg6ditwl.jpg",
    profile_pic_url: [
      "https://en.wikipedia.org/wiki/Steve_Jobs#/media/File:Steve_Jobs_with_red_shawl_edit2.jpg",
      "http://a5.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE5NDg0MDU0NTIzODQwMDE1.jpg",
      "http://tvoya-dieta.net/uploads/posts/2011-10/thumbs/1319802312_7.jpg"
    ],
    resume_pdf_url: "nopdf.pdf"
  },
  portfolio: [
    {
      name: "Ipad",
      description: "9.7 inch touch screen tablet PC made by Apple . The iPad is basically a netbook without a keyboard. It has a multi-touch LED-backlit 9.7 x 7.5 inch front display and weighs 1.5 pounds, with a battery that lasts up to ten hours.",
      project_pic_url: "https://images-na.ssl-images-amazon.com/images/I/41gtLiEuNdL._AC_UL320_SR252,320_.jpg"
    },
    {
      name: "Macbook Pro",
      description: "The computer's second generation, known as the 'unibody' model, has a more tapered design and a casing made from a single block of aluminum. It debuted in October 2008 as the 15-inch MacBook Pro",
      project_pic_url: "http://cdn.arstechnica.net/wp-content/uploads/2012/11/IMG_8412.jpg"
    },
    {
      name: "iTouch",
      description: "iPod touch is ultrathin and colorful, plays music and video, rules games, runs apps, makes video calls, takes amazing photos, and shoots HD video.",
      project_pic_url: "http://pad1.whstatic.com/images/thumb/a/af/Turn-On-an-iPod-Touch-Step-3.jpg/aid934707-728px-Turn-On-an-iPod-Touch-Step-3.jpg"
    }
  ],
  work: [
    {
      work_place: "Apple",
      position: "CEO",
      position_desc: "Design and sell",
      date_started: "04/01/1976",
      date_left: "Current"
    },
    {
      work_place: "Burger King",
      position: "Cashier",
      position_desc: "Responsible for taking money in the form of cash, check, or credit card from patrons in exchange for food or services. Scans items, provides change, balances drawer, and processes card transactions.",
      date_started: "02/06/1965",
      date_left: "05/12/1965"
    },
    {
      work_place: "McDonald",
      position: "Supervisor",
      position_desc: "Accomplishes staff job results by coaching, counseling, and disciplining employees; planning, monitoring, and appraising job results; conducting training; implementing enforcing systems, policies, and procedures.",
      date_started: "09/06/1968",
      date_left: "12/12/1968"
    },
  ],
  social: {
    github: "https://github.com/Vietanhh",
    facebook: "https://www.facebook.com/AppStore/",
    instagram: "https://www.instagram.com/applemusic/",
    twitter: "https://twitter.com/apple",
    linkedin: "https://www.linkedin.com/in/steve-jobs-142b0918"
  }
};


// var str = "one:apple;two:orange;three:bananna;four:pears";
// var obj = {};
// str.split(';').forEach(function(el) {
//   var x = el.split(':');
//   obj[x[0]] = x[1];
// });
// console.log(obj);
// console.log(str.length);



router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router.get("/meetup", function(req, res, next){

  requests({
    url: "https://api.meetup.com/2/groups.json?key=643e6d4c1554f483922e72b5a6a1b&sign=true&lat=40.5792700&lon=-74.4115400&category_id=34&page=20",
    method: "GET",
    json: true
  }, function(err, response){
    if(err){
      console.log("There was an error");
      console.log(err);
      res.json(err);
    }else{
      console.log(response);
      res.json(response);
    };
  });

});

/* GET users listing. */
router.post('/generate', function(req, res, next) {
  console.log("made it here");
  var data = req.body;
  console.log(data);
  var code = qr.image(data.id, { type: 'png' });
  var output = fs.createWriteStream('img/'+data.id+'.png');
  code.pipe(output);
  res.json("Success from the backend!");
});

// router.put('/generate', multer({dest: './uploads'}), function(req,))


module.exports = router;
