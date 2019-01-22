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
    public class ArchivalreqsController : ControllerBase
    {
        private readonly db_context _context;

        public ArchivalreqsController(db_context context)
        {
            _context = context;
        }

        // GET: api/Archivalreqs
        [HttpGet]
        public IEnumerable<Archivalreq> GetArchivalreq()
        {
            return _context.Archivalreqs;
        }

        // GET: api/Archivalreqs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArchivalreq([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var archivalreq = await _context.Archivalreqs.FindAsync(id);

            if (archivalreq == null)
            {
                return NotFound();
            }

            return Ok(archivalreq);
        }

        // PUT: api/Archivalreqs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArchivalreq([FromRoute] int id, [FromBody] Archivalreq archivalreq)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != archivalreq.Request_ID)
            {
                return BadRequest();
            }

            _context.Entry(archivalreq).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArchivalreqExists(id))
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

        // POST: api/Archivalreqs
        [HttpPost]
        public async Task<IActionResult> PostArchivalreq([FromBody] Archivalreq[] archivalreq)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            for (int i = 0; i < archivalreq.Length; i++)
            {
                _context.Archivalreqs.Add(archivalreq[i]);
            }
            //await _context.SaveChangesAsync();
            _context.SaveChanges();

            return CreatedAtAction("GetArchivalreq", new { id = archivalreq[0].Request_ID }, archivalreq);
        }

        //DELETE: api/Archivalreqs
        [HttpDelete]
        public async Task<IActionResult> DeleteTableArchivalreq([FromBody] Archivalreq[] archivalreq)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            for (int i = 0; i < archivalreq.Length; i++)
            {
                _context.Archivalreqs.Remove(archivalreq[i]);
            }

            //var archivalreq = await _context.Archivalreqs.FindAsync(id);
            //if (archivalreq == null)
            //{
            //    return NotFound();
            //}
            //_context.Archivalreqs.Remove(archivalreq);
            //await _context.SaveChangesAsync();

            _context.SaveChanges();
            return Ok(archivalreq);
        }

        // DELETE: api/Archivalreqs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArchivalreq([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var archivalreq = await _context.Archivalreqs.FindAsync(id);
            if (archivalreq == null)
            {
                return NotFound();
            }

            _context.Archivalreqs.Remove(archivalreq);
            // await _context.SaveChangesAsync();

            _context.SaveChanges();
            return Ok(archivalreq);
        }

        private bool ArchivalreqExists(int id)
        {
            return _context.Archivalreqs.Any(e => e.Request_ID == id);
        }
    }
}