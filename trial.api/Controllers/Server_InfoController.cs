using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using trial.api.Data;

namespace trial.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class Server_InfoController : ControllerBase
    {
        private readonly db_context _context;

        public Server_InfoController(db_context context)
        {
            _context = context;
        }

        // GET: api/Server_Info
        [HttpGet]
        public IEnumerable<server> GetServer_Info()
        {
            return _context.servers;
        }

        // GET: api/Server_Info/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetServer_Info([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Server_Info = await _context.servers.FindAsync(id);

            if (Server_Info == null)
            {
                return NotFound();
            }

            return Ok(Server_Info);
        }

        // PUT: api/Server_Info/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServer_Info([FromRoute] int id, [FromBody] server Server_Info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Server_Info.Server_ID)
            {
                return BadRequest();
            }

            _context.Entry(Server_Info).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Server_InfoExists(id))
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

        // POST: api/Server_Info
        [HttpPost]
        public async Task<IActionResult> PostServer_Info([FromBody] server Server_Info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.servers.Add(Server_Info);
           // await _context.SaveChangesAsync();
            _context.SaveChanges();

            return CreatedAtAction("GetServer_Info", new { id = Server_Info.Server_ID}, Server_Info);
            //return Ok(Server_Info);
        }

        // DELETE: api/Server_Info/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServer_Info([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Server_Info = await _context.servers.FindAsync(id);
            if (Server_Info == null)
            {
                return NotFound();
            }

            _context.servers.Remove(Server_Info);
            // await _context.SaveChangesAsync();
            _context.SaveChanges();
            return Ok(Server_Info);
        }

        private bool Server_InfoExists(int id)
        {
            return _context.servers.Any(e => e.Server_ID == id);
        }
    }
}