const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie');

router.get('/', (req, res) => {
  const promise = Movie.find({ });

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:movie_id', (req, res, next) => {
   const promise = Movie.findById(req.params.movie_id);

   promise.then((movie) => {

       if(!movie)
           next({message: 'The film was not found!!', code: 99});

      res.json(movie)
   }).catch((err) => {
       res.json(err);
   });
});

router.put('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body);

    promise.then((movie) => {

        if(!movie)
            next({message: 'The film was not found!!', code: 99});

        res.json(movie)
    }).catch((err) => {
        res.json(err);
    });
});


router.post('/', (req, res, next) => {
  const {title, imdbScore, category, country, year} = req.body;

  const movie = new Movie({
    title: title,
    imdbScore: imdbScore,
    category: category,
    country: country,
    year: year
  });


  // Veri Kaydetme 1.Yontem Start
/*
  movie.save((err, data) => {

    if(err)
      res.json(err);
    else
      res.json(data);

  });
*/
  // Veri Kaydetme 1.Yontem End


  // Veri Kaydetme 2.Yontem Start
  const promise = movie.save();
  promise.then((data) => {
    res.json({data});
  }).catch((err) => {
    res.json({err});
  });
  // Veri Kaydetme 2.Yontem End

});

module.exports = router;
