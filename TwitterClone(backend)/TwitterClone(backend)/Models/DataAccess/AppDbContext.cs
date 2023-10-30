using System.Data.Common;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Plugins;
using Microsoft.CodeAnalysis.Elfie.Diagnostics;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;

namespace TwitterClone_backend_.Models.DataAccess
{
    public class AppDbContext : IAppDbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _dbconnection;

        public AppDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _dbconnection = _configuration["ConnectionStrings:DB"];
        }

        public Tweet GetTweet(int id)
        {
            var tweet = new Tweet();
            using SqlConnection connection = new(_dbconnection);

            SqlCommand cmd = new()
            {
                Connection = connection
            };

            connection.Open();

            string query = "select * from tweet where id="+id+";";
            cmd.CommandText = query;
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                tweet.Id = (int)reader["Id"];
                tweet.Content = (string)reader["Content"];
                tweet.Likes = (int)reader["Likes"];
                tweet.UserId = (int)reader["UserId"];
            }
            return tweet;
        }

        public List<Tweet> GetTweets()
        {
            var tweets = new List<Tweet>();
            using SqlConnection connection = new(_dbconnection);

            SqlCommand cmd = new()
            {
                Connection=connection
            };

            connection.Open();

            string query = "select * from tweet;";
            cmd.CommandText = query;    
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                var tweet = new Tweet()
                {
                    Id = (int)reader["Id"],
                    Content = (string)reader["Content"],
                    Likes = (int)reader["Likes"],
                    UserId = (int)reader["UserId"],
                };
                tweets.Add(tweet);
            }
            return tweets;

        }

        public User GetUser(int id)
        {
            var user = new User();
            using SqlConnection connection = new(_dbconnection);

            SqlCommand cmd = new()
            {
                Connection = connection
            };

            connection.Open();

            string query = "select * from [User] where id=" + id + ";";
            cmd.CommandText = query;
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                user.Id = (int)reader["Id"];
                user.FirstName = (string)reader["FirstName"];
                user.LastName = (string)reader["LastName"];
                user.DOB = (string)reader["DOB"];
                user.Email = (string)reader["Email"];
                user.Password= (string)reader["Password"];
                user.UserName= (string)reader["UserName"];
            }
            return user;
        }

        public bool LikeTweet(int id)
        {
            using SqlConnection conn = new(_dbconnection);
            SqlCommand cmd = new()
            {
                Connection = conn,
            };
            conn.Open();

            string query = "update Tweet set Likes=Likes+1 where Id=" + id + ";";
            cmd.CommandText = query;
            int rowsAffected = cmd.ExecuteNonQuery();

            if (rowsAffected > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }





        public bool UploadTweet(Tweet tweet)
        {
            using SqlConnection connection = new(_dbconnection);
            connection.Open();
            SqlCommand sqlCommand = new()
            {
                Connection = connection
            };

            string query = "insert into Tweet (Content, Likes, UserId) values(@Content,@Likes,@UserId);";
            sqlCommand.CommandText = query;
            sqlCommand.Parameters.Add("@Content", SqlDbType.VarChar).Value = tweet.Content;
            sqlCommand.Parameters.Add("@Likes", SqlDbType.Int).Value = 0;
            sqlCommand.Parameters.Add("@UserId", SqlDbType.VarChar).Value = tweet.UserId;

            int value = (int)sqlCommand.ExecuteNonQuery();

            return value>0;
        }

        public bool InsertUser(User user)
        {
            using (SqlConnection connection = new SqlConnection(_dbconnection))
            {
                connection.Open();
                using (SqlCommand sqlCommand = new SqlCommand())
                {
                    sqlCommand.Connection = connection;

                    string query = "INSERT INTO [User] (FirstName, LastName, DOB, Email, Password, UserName) VALUES (@FirstName, @LastName, @DOB, @Email, @Password, @UserName);";
                    sqlCommand.CommandText = query;
                    sqlCommand.Parameters.Add("@FirstName", SqlDbType.VarChar).Value = user.FirstName;
                    sqlCommand.Parameters.Add("@LastName", SqlDbType.VarChar).Value = user.LastName;
                    sqlCommand.Parameters.Add("@DOB", SqlDbType.VarChar).Value = user.DOB;
                    sqlCommand.Parameters.Add("@Email", SqlDbType.VarChar).Value = user.Email;
                    sqlCommand.Parameters.Add("@Password", SqlDbType.VarChar).Value = user.Password;
                    sqlCommand.Parameters.Add("@UserName", SqlDbType.VarChar).Value = user.UserName;

                    int rowsAffected = sqlCommand.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
            }
        }

        public string IsUserPresent(string email, string password)
        {
            User user = new();
            using SqlConnection conn = new(_dbconnection);
            SqlCommand command = new()
            {
                Connection = conn,
            };
            conn.Open();

            string query = "SELECT COUNT(*) FROM [User] WHERE Email='" + email + "' AND Password='" + password+ "';";
            command.CommandText = query;
            int count = (int)command.ExecuteScalar();
            if (count == 0)
            {
                conn.Close();
                return "";
            }

            query = "select * from [User] where Email='" + email + "'and Password='" + password + "';";
            command.CommandText = query;

            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                user.Id = (int)reader["Id"];
                user.FirstName = (string)reader["FirstName"];
                user.LastName = (string)reader["LastName"];
                user.Email = (string)reader["Email"];
                user.Password = (string)reader["Password"];
                user.UserName = (string)reader["UserName"];
                user.DOB = (string)reader["DOB"];
            }
            string key = "PFZNBnnnlOGSNbynKqZfxX0tZzjz8zfG";
            string duration = "60";
            var symmetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]{
                new Claim("id", user.Id.ToString()),
                new Claim("firstName", user.FirstName),
                new Claim("lastName", user.LastName.ToString()),
                new Claim("email", user.Email),
                new Claim("password", user.Password),
                new Claim("userName", user.UserName),
                new Claim("dob", user.DOB),

            };

            var jwtToken = new JwtSecurityToken(
                issuer: "localhost",
                audience: "localhost",
                claims: claims,
                expires: DateTime.Now.AddMinutes(int.Parse(duration)),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }

       

        public bool RemoveTweet(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateTweet(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateUser(User user)
        {
            throw new NotImplementedException();
        }
    }
}
