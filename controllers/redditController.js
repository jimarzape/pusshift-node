const db = require('../config/db');

module.exports.getSubmission = async (body) => {

    const fetch = require('node-fetch');
    let subreddit = body.subreddit
    let limit = body.limit ? body.limit : 10
    let url = `https://www.reddit.com/r/${subreddit}.json?limit=${limit}`;
    let settings = { method: "Get" };

    return Promise.resolve(fetch(url, settings))
        .then(res => res.json())
        .then(async (json) => {
            // return json.data.children[0]
            let children = json.data.children
            let return_data = []
            for(const child of children)
            {
                let temp = []
                const existPost = await db('submission')
                                        .where('reddit_id', child.data.id)
                                        .then(([reddit]) => {
                                            temp = reddit
                                        })
                                        
                if(temp)
                {
                    temp.subreddit = child.data.subreddit;
                    temp.title = child.data.title;
                    temp.link = child.data.url;
                    temp.ups = child.data.ups;
                    temp.downs = child.data.downs;
                    
                    const updatePost = await db('submission')
                                            .where('reddit_id', child.data.id)
                                            .update({
                                                subreddit : child.data.subreddit,
                                                title : child.data.title,
                                                link : child.data.url,
                                                ups : child.data.ups,
                                                downs : child.data.downs
                                            }).then(result => {
                                                
                                            })
                    
                }
                else{
                    temp = {
                        subreddit : child.data.subreddit,
                        reddit_id : child.data.id,
                        title : child.data.title,
                        link : child.data.url,
                        ups : child.data.ups,
                        downs : child.data.downs,
                        favorite : false
                    }
                    const createPost = await db('submission')
                                            .insert(temp)
                                            
                }
                
                return_data.push(temp)
            }
           
            return return_data;
        })

}

module.exports.toggleFavorite = async(body) => {
    
    const updatePost = await db('submission')
                    .where('reddit_id', body.id)
                    .update({
                        favorite : body.favorite
                    })

    return ({ status: 'success', message: 'User created successfully' });
}