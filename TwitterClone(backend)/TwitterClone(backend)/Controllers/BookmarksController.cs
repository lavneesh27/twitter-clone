using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TwitterClone_backend_.Context;

namespace TwitterClone_backend_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarksController : ControllerBase
    {
        private readonly TwitterContext _context;

        public BookmarksController(TwitterContext context)
        {
            _context = context;
        }

        // GET: api/Bookmarks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bookmark>>> GetBookmarks()
        {
          if (_context.Bookmarks == null)
          {
              return NotFound();
          }
            return await _context.Bookmarks.ToListAsync();
        }

        // GET: api/Bookmarks/5
        [HttpGet("GetBookmark/{userId}")]
        public ActionResult<IEnumerable<Bookmark>> GetBookmark(int userId)
        {
          if (_context.Bookmarks == null)
          {
              return NotFound();
          }
            IEnumerable<Bookmark> bookmarks = _context.Bookmarks.Where(_ => _.UserId == userId);

            if (bookmarks == null)
            {
                return NotFound();
            }

            return Ok(bookmarks);
        }

        // PUT: api/Bookmarks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookmark(int id, Bookmark bookmark)
        {
            if (id != bookmark.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookmark).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookmarkExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Bookmarks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("AddBookmark")]
        public async Task<ActionResult<bool>> PostBookmark([FromBody] Bookmark bookmark)
        {
          if (_context.Bookmarks == null)
          {
              return Problem("Entity set 'TwitterContext.Bookmarks'  is null.");
          }

            var bm = new Bookmark
            {
                UserId = bookmark.UserId,
                TweetId = bookmark.TweetId,
            };
            _context.Bookmarks.Add(bm);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookmarkExists(bookmark.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return true;
        }

        // DELETE: api/Bookmarks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookmark(int id)
        {
            if (_context.Bookmarks == null)
            {
                return NotFound();
            }
            var bookmark = await _context.Bookmarks.FindAsync(id);
            if (bookmark == null)
            {
                return NotFound();
            }

            _context.Bookmarks.Remove(bookmark);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookmarkExists(int id)
        {
            return (_context.Bookmarks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
