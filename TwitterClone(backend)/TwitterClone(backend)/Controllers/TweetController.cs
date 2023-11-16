using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TwitterClone_backend_.Context;
using TwitterClone_backend_.ViewModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TwitterClone_backend_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TweetController : ControllerBase
    {
        private readonly TwitterContext _appDbContext;

        public TweetController(TwitterContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        [HttpGet("GetTweets")]
        public async Task<List<Tweet>> GetTweets()
        {
            return await _appDbContext.Tweets.ToListAsync();
        }

        //GET api/<TweetController>/5
        [HttpGet("GetTweet/{id}")]
        public async Task<ActionResult<Tweet>> Get(int id)
        {
            var tweet = await _appDbContext.Tweets.FindAsync(id);
            if (tweet == null)
            {
                return NotFound();
            }
            return tweet;
        }

        //// POST api/<TweetController>
        [HttpPost("UploadTweet")]
        public async Task<ActionResult<bool>> Post([FromBody] TweetViewModel tweet)
        {
            var tw = new Tweet
            {
                Likes = tweet.Likes,
                UserId = tweet.UserId,
                Content = tweet.Content,
                CreatedAt = DateTime.Now.ToString(),
                Image = tweet.Image,
            };


            await _appDbContext.AddAsync(tw);
            await _appDbContext.SaveChangesAsync();

            return true;
        }

        // PUT api/<TweetController>/5
        [HttpPost("LikeTweet/{id}/{isLiked}")]
        public async Task<bool> LikeTweet(int id, bool isLiked)
        {
            var tweet = await _appDbContext.Tweets.FirstOrDefaultAsync(t => t.Id == id);

            if (tweet != null)
            {
                if (!isLiked) tweet.Likes++;

                else tweet.Likes--;

                await _appDbContext.SaveChangesAsync();
                return true;
            }

            return false;
        }

        // DELETE api/<TweetController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
