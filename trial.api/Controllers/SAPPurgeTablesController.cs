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
    public class SAPPurgeTablesController : ControllerBase
    {
        private readonly db_context _context;

        public SAPPurgeTablesController(db_context context)
        {

            _context = context;
        }

        // GET: api/SAPPurgeTables
        [HttpGet]
        public IEnumerable<SAPPurgeTable> GetSAPPurgeTables()
        {


            return _context.SAPPurgeTables;
        }

        // GET: api/SAPPurgeTables/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSAPPurgeTable([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var result= from p in _context.SAPPurgeTables
                        group p by p.GroupID into g
                        select new { grpid = g.Key, maxseqid = (from t2 in g select t2.Sequenceid).Max() };

            //var sAPPurgeTable = await _context.SAPPurgeTables.FindAsync(id);

            //if (sAPPurgeTable == null)
            //{
            //    return NotFound();
            //}

            return Ok(result);
        }

        // PUT: api/SAPPurgeTables/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSAPPurgeTable([FromRoute] int id, [FromBody] SAPPurgeTable sAPPurgeTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sAPPurgeTable.TableID)
            {
                return BadRequest();
            }

            _context.Entry(sAPPurgeTable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SAPPurgeTableExists(id))
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

        // POST: api/SAPPurgeTables
        [HttpPost]
        public async Task<IActionResult> PostSAPPurgeTable([FromBody] SAPPurgeTable[] sAPPurgeTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            for (int i = 0; i < sAPPurgeTable.Length; i++)
            {
                _context.SAPPurgeTables.Add(sAPPurgeTable[i]);
            }
           
            //await _context.SaveChangesAsync();
            _context.SaveChanges();
         
            return CreatedAtAction("GetSAPPurgeTable", new { id = sAPPurgeTable[0].TableID }, sAPPurgeTable);

        }

        // DELETE: api/SAPPurgeTables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSAPPurgeTable([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sAPPurgeTable = await _context.SAPPurgeTables.FindAsync(id);
            if (sAPPurgeTable == null)
            {
                return NotFound();
            }

            _context.SAPPurgeTables.Remove(sAPPurgeTable);
            await _context.SaveChangesAsync();

            return Ok(sAPPurgeTable);
        }


        private bool SAPPurgeTableExists(int id)
        {
            return _context.SAPPurgeTables.Any(e => e.TableID == id);
        }
    }
}