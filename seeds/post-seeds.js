const { Post } = require('../models');

const postData = [
    {
        title: "First Post",
        post_content: "This is my first post.",
        user_id: 3
    },
    {
        title: "Second Post",
        post_content: "I am the second post on this page.",
        user_id: 1
    },
    {
        title: "Third Post",
        post_content: "I am the third post on this page.",
        user_id: 2

    },
    {
        title: "Fourth Post",
        post_content: "I am the fourth post on this page.",
        user_id: 5
    },
    {
        title: "Fith",
        post_content: "I am the fith post on this page.",
        user_id: 4
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;