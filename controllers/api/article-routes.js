const router = require('express').Router();
const {Article, User, Comments } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


router.post('/upload', (req, res) => {
 
  (async() => {

    
  console.log('before start');
  
    await Article.create({
      title: req.body.postTitle,
      post_content: req.body.postContent,
      user_id: req.session.user_id,
    });
    
    Article.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'created_at',
        'post_content',
      ],
      include: [
        {
          model: Comments,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username', 'twitter', 'github']
          }
        },
        {
          model: User,
          attributes: ['username', 'twitter', 'github']
        }
      ]
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });

      console.log('after start');
    })();
  });


  // get all users
  router.get('/', (req, res) => {
      console.log('======================');
    Article.findAll({
          attributes: [
              'id',
              'title',
              'created_at',
              'post_content',
          ],
        order: [['created_at', 'DESC']],
        include: [
          // Comment model here -- attached username to comment
          {
            model: Comments,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username', 'twitter', 'github']
            }
          },
          {
            model: User,
            attributes: ['username', 'twitter', 'github']
          },
        ]
      })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

    router.get('/:id', (req, res) => {
      Article.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'title',
          'created_at',
          'post_content',
        ],
        include: [
          // include the Comment model here:
          {
            model: User,
            attributes: ['username', 'twitter', 'github']
          },
          {
            model: Comments,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username', 'twitter', 'github']
            }
          }
        ]
      })
        .then(dbPostData => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
          res.json(dbPostData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
    });
  });

router.post('/', withAuth, (req, res) => {
   Article.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put('/:id', withAuth, (req, res) => {
    Article.update({
        title: req.body.title,
        post_content: req.body.post_content
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', withAuth, (req, res) => {
   Article.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;