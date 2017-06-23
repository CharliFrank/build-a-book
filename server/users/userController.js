const Q = require('q');
const jwt = require('jwt-simple');
const User = require('./userModel.js');
const path = require('path');

// Promisify a few mongoose methods with the `q` promise library
const findUser = Q.nbind(User.findOne, User);
const createUser = Q.nbind(User.create, User);

module.exports = {
  signin: (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    findUser({ username })
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                const token = jwt.encode(user, 'secret');
                res.status(200).json({ token });
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // check to see if user already exists
    findUser({ username })
      .then(function (user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          return createUser({
            username,
            password,
          });
        }
      })
      .then(function (user) {
        // create token to send back for auth
        const token = jwt.encode(user, 'secret');
        res.status(200).json({ token });
      })
      .fail(function (error) {
        next(error);
      });
  },

  addABook: (req, res, next) => {
    const token = req.headers['x-access-token'];
    const book = req.body.book;

    if (!token) {
      next(new Error('No token'));
    } else {
      const user = jwt.decode(token, 'secret');

      findUser({ username: user.username })
        .then(function (foundUser) {
          if (foundUser) {
            User.update({ _id: foundUser._id }, { $push: { books: book } }, (err) => {
              if (err) {
                console.error(err, 'Error');
              } else {
                res.redirect('/#/build_a_book');
              }
            });
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  },

  getBooks: (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
      next(new Error('No token'));
    } else {
      const user = jwt.decode(token, 'secret');

      findUser({ username: user.username })
        .then(function (foundUser) {
          if (foundUser) {
            User.find({ _id: foundUser._id }, 'username books', (err, person) => {
              if (err) {
                console.error(err, 'ERROR');
              } else {
                res.send(JSON.stringify(person[0].books));
              }
            });
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  },

  deleteBook: (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
      next(new Error('No token'));
    } else {
      const user = jwt.decode(token, 'secret');

      findUser({ username: user.username })
        .then(function (foundUser) {
          if (foundUser) {
            User.find({ _id: foundUser._id }, 'username books', (err, person) => {
              if (err) {
                console.error(err, 'Error');
              } else {
                const newBooks = [];

                person[0].books.forEach((book) => {
                  if (book[0] !== req.query.book) {
                    newBooks.push(book);
                  }
                }, this);
                User.update({ _id: foundUser._id }, { books: newBooks }, (error) => {
                  if (error) {
                    console.error(err, 'Error');
                  } else {
                    res.sendStatus(200);
                  }
                });
              }
            });
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }

//     app.delete('/delete_a_book', () => {
//   const username = req.query.username;
//   const newBooks = [];

//   User.find({ username }, 'username password books', (err, person) => {
//     if (err) {
//       console.error(err, 'ERROR');
//     } else {
//       person[0].books.forEach((book) => {
//         if (book[0] !== req.query.book) {
//           newBooks.push(book);
//         }
//       }, this);
//       User.update({ username }, { books: newBooks }, (error) => {
//         if (error) {
//           console.error(err, 'Error');
//         } else {
//           res.redirect('/#/my_books');
//         }
//       });
//     }
//   });
// });
  },
};
