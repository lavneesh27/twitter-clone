using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TwitterClone_backend_.Context;
using TwitterClone_backend_.ViewModel;
using static System.Net.Mime.MediaTypeNames;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TwitterClone_backend_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TwitterContext _appDbContext;
        // GET: api/<UserController>

        public UserController(TwitterContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet("GetUsers")]
        public async Task<List<User>> GetTweets()
        {
            return await _appDbContext.Users.ToListAsync();
        }
        [HttpPost("LoginUser")]
        public async Task<ActionResult<string>> LoginUser([FromBody] UserViewModel user)
        {
            var res = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email && u.Password == user.Password);

            if (res == null)
            {
                return NotFound();
            }
            string key = "PFZNBnnnlOGSNbynKqZfxX0tZzjz8zfG";
            string duration = "60";
            var symmetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]{
                new Claim("id", res.Id.ToString()),
                new Claim("firstName", res.FirstName),
                new Claim("lastName", res.LastName.ToString()),
                new Claim("email", res.Email),
                new Claim("password", res.Password),
                new Claim("userName", res.UserName),
                new Claim("dob", res.Dob),
                new Claim("image", res.Image.ToString()),
                new Claim("createdAt", DateTime.Now.ToString())
            };

            var jwtToken = new JwtSecurityToken(
                issuer: "localhost",
                audience: "localhost",
                claims: claims,
                expires: DateTime.Now.AddMinutes(int.Parse(duration)),
                signingCredentials: credentials
                );
            string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            return Ok(token);
        }
        // GET api/<UserController>/5
        [HttpGet("GetUser/{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _appDbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // POST api/<UserController>
        [HttpPost("RegisterUser")]
        public async Task<ActionResult<bool>> Register([FromBody] UserViewModel user)
        {
            var userInfo = new User();
            userInfo.Email = user.Email;
            userInfo.Password = user.Password;
            userInfo.FirstName = user.FirstName;
            userInfo.LastName = user.LastName;
            userInfo.Dob = user.Dob;
            userInfo.UserName = user.UserName;
            userInfo.Image = user.Image;
            userInfo.CreatedAt = DateTime.Now.ToString();
            await _appDbContext.AddAsync(userInfo);
            await _appDbContext.SaveChangesAsync();

            return true;
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