using Microsoft.AspNetCore.Mvc;
using TwitterClone_backend_.Models;
using TwitterClone_backend_.Models.DataAccess;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TwitterClone_backend_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAppDbContext _appDbContext;
        // GET: api/<UserController>

        public UserController(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        [HttpPost("LoginUser")]
        public IActionResult LoginUser([FromBody] User user)
        {
            var token = _appDbContext.IsUserPresent(user.Email, user.Password);
            if (token == "") token = "invalid";
            return Ok(token);
        }
        // GET api/<UserController>/5
        [HttpGet("GetUser{id}")]
        public User GetUser(int id)
        {
            return _appDbContext.GetUser(id);
        }

        // POST api/<UserController>
        [HttpPost("RegisterUser")]
        public bool Register([FromBody] User user)
        {
            return _appDbContext.InsertUser(user);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
