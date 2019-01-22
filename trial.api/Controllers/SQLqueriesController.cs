using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using trial.api.Data;
using static Microsoft.AspNetCore.Hosting.Internal.HostingApplication;


namespace trial.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]

    public class SQLqueriesController : ControllerBase
    {
        private readonly db_context _context;

        public SQLqueriesController(db_context context)
        {
            _context = context;
        }

        // GET: api/SQLqueries
        [HttpGet]
        public IEnumerable<SQLquery> GetSQLquery()
        {
            return _context.SQLquery;
        }

        // GET: api/SQLqueries/query
        [HttpGet("{Query}")]
        public List<string> GetSQLquery([FromRoute] string Query)
        {
            List<string> errorlist;
            List<string> res = new List<string>();
            if((errorlist=SqlParser.Parse(Query)) == null)
            {
                res.Add("Valid");
                return res;
            }
            return errorlist;
           
        }

        // PUT: api/SQLqueries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSQLquery([FromRoute] int id, [FromBody] SQLquery sQLquery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sQLquery.Query_ID)
            {
                return BadRequest();
            }

            _context.Entry(sQLquery).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SQLqueryExists(id))
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

        // POST: api/SQLqueries
        [HttpPost]
        public async Task<IActionResult> PostSQLquery([FromBody] SQLquery sQLquery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.SQLquery.Add(sQLquery);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSQLquery", new { id = sQLquery.Query_ID }, sQLquery);
        }

        // DELETE: api/SQLqueries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSQLquery([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sQLquery = await _context.SQLquery.FindAsync(id);
            if (sQLquery == null)
            {
                return NotFound();
            }

            _context.SQLquery.Remove(sQLquery);
            await _context.SaveChangesAsync();

            return Ok(sQLquery);
        }

        private bool SQLqueryExists(int id)
        {
            return _context.SQLquery.Any(e => e.Query_ID == id);
        }
    }
}