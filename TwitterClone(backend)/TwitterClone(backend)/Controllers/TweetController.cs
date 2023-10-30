using Microsoft.AspNetCore.Mvc;
using TwitterClone_backend_.Models;
using TwitterClone_backend_.Models.DataAccess;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TwitterClone_backend_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TweetController : ControllerBase
    {
        private readonly IAppDbContext _appDbContext;

        public TweetController(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        [HttpGet("GetTweets")]
        public List<Tweet> GetTweets()
        {
            return _appDbContext.GetTweets();
        }

        // GET api/<TweetController>/5
        [HttpGet("{id}")]
        public Tweet Get(int id)
        {
            return _appDbContext.GetTweet(id);
        }

        // POST api/<TweetController>
        [HttpPost("UploadTweet")]
        public bool Post([FromBody] Tweet tweet)
        {
            return _appDbContext.UploadTweet(tweet);
        }

        // PUT api/<TweetController>/5
        [HttpPost("LikeTweet/{id}")]
        public bool LikeTweet(int id)
        {
            return _appDbContext.LikeTweet(id);
        }

        // DELETE api/<TweetController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
